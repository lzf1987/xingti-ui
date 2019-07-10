// 导入组件
import infiniteScroll from './src/infinite-scroll'

// 为组件提供 install 安装方法，供按需引入
infiniteScroll.install = function (Vue) {
  Vue.component(infiniteScroll.name, infiniteScroll)
}

// 默认导出组件
export default infiniteScroll