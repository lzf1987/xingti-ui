<template>
  <div class="reset-box">
    <div @click="resetFun()">切换重置！！</div>
    <infinite-scroll ref="scroll" :loading="loading" @load="load" basetext="这个就是底线">
      <div style="height:30px" v-for="(item,index) in list" :key="index">{{item}}</div>
      
    </infinite-scroll>
  </div>
</template>
 <style>
.reset-box {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { setTimeout } from "timers";
export default {
  created() {
    for (var i = 0; i < 30; i++) {
      this.$set(this.list, i, i);
    }
  },
  data() {
    return {
      list: [],
      page: 0,
      loading: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      if (this.page < 3) {
        setTimeout(() => {
          this.page++;
          for (var i = 0; i < 30; i++) {
            this.list.push(i);
          }
          this.loading = false;
        }, 1000);
      } else {
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    },
    resetFun() {
      this.page=0;
      this.$refs.scroll.reset();
    }
  }
};
</script>
