##安装使用

```shell
npm install xingti-ui -S
```


##icon 

直接使用类名引入即可！！

目前支持的 icon有 两个xt-icon-jiazai1、xt-icon-jiazai 都是加载的icon

##无限滚动框

组件名： infinite-scroll

引用方法:
```
<infinite-scroll></infinite-scroll>
```

##参数变量:
|变量|类型|描述|默认值|
|:---|:---|:---|:---|
|inttime|nunder|        节流函数的间隔时间 |    默认300|
|timenumder|nunder|     开始滚动的节流函数的间隔时间 |    默认200|
|loading  | boolean  |  打开滚动icon的开关 |    默认为false|
|basetext  |string    | 底部展示的文字    |         默认:"——我是有底线的！！——"|
|load      |function |  滚动到底部触发的方法   | load(): 看例子#1.0.0 |
|stopRolling      |function |  滚动中的方法   | stopRolling(Val): 开始滚动是true  结束滚动为 false |
|reset      |function |  重置组件的方法  | 需要用到组件通讯来实现！！ 列子：1.0.1 |

###例子1.0.0
```
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
      }else{
        this.$nextTick(()=>{
           this.loading = false;
        })
      }
}
```
###列子：1.0.1
```
<div class="reset-box">
    <div @click="resetFun()">切换重置！！</div>
    <infinite-scroll ref="scroll" :loading="loading" @load="load" basetext="这个就是底线">
      <div style="height:30px" v-for="(item,index) in list" :key="index">{{item}}</div>
    </infinite-scroll>
  </div>
.............
methods: {
    resetFun() {
      this.page=0;
      this.$refs.scroll.reset();
    }
  }

```


###注意 

如果想要立即改变状态  请用  this.$nextTick  来修改！！！

同步代码1

