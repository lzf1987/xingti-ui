<template>
  <div ref="xtScrollBox" class="xt-infinite-scroll" @scroll="scrollLoad">
    <slot></slot>
    <transition name="xt-fade">
      <div class="xt-base" v-if="loading">
        <i class="xt-icon-jiazai"></i>
      </div>
    </transition>
    <transition name="xt-fade">
      <div class="xt-base-text" v-if="underscore">{{derscoreText}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "infiniteScroll",
  props: ["inttime", "loading", "basetext","timenumder"],
  created() {
    if (this.inttime) {
      this.interval = this.inttime;
    }
    if (this.basetext) {
      this.derscoreText = this.basetext;
    }
    if(this.timenumder){
      this.timenum=this.timenumder
    }
  },
  data() {
    return {
      interval: 300,
      isAjax: false, //是否加载数据
      canRunTime: null, //节流函数的对象
      sHeight: 0, //滚动的高度
      underscore: false, //底部文字的开关
      derscoreText: "——我是有底线的！！——", //底部的文字
      scrollRolling:false,//是否开始滚动！！
      scrollTimer:null,//开始的时间对象
      timenum:200,//滚动的时间值
    };
  },
  watch: {
    loading() {
      if (!this.loading) {
        this.throttle();
      }
    }
  },
  methods: {
    //滚动函数
    scrollLoad() {
      let that=this;
      let scrollDom = this.$refs.xtScrollBox,
        scrollTop = scrollDom.scrollTop,
        offsetHeight = scrollDom.offsetHeight,
        scrollHeight = scrollDom.scrollHeight;
      if (!this.scrollRolling &&scrollTop> 300) {
        this.scrollRolling = true;
        that.$emit("stopRolling", true);
      }
      if (scrollTop> 300) {
        //结束滚动
        clearTimeout(that.scrollTimer);
        that.scrollTimer = setTimeout(() => {
          that.$emit("stopRolling", false);
          that.scrollRolling = false;
        }, that.timenum);
      }

      let scrollButton = scrollTop + offsetHeight == scrollHeight;
      if (scrollButton && !this.loading && !this.isAjax) {
        this.scrollHeight = scrollHeight;
        this.isAjax = true;
        this.$emit("load");
      }
    },
    // 节流函数
    throttle() {
      let that = this;
      that.$nextTick(() => {
        if (that.$refs.xtScrollBox.scrollHeight - that.scrollHeight == 30) {
          clearInterval(that.canRunTime);
          that.underscore = true;
        } else {
          clearInterval(that.canRunTime);
          that.canRunTime = setTimeout(function() {
            that.isAjax = false;
          }, that.interval);
        }
      });
    },
    //重置数据
    reset(){
      this.$refs.xtScrollBox.scrollTop=0
      this.isAjax=false;
      this.underscore=false
    }
  }
};
</script>
<style>
.xt-infinite-scroll {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.xt-base {
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: center;
}
.xt-base-text {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
