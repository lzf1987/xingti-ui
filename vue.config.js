
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
module.exports = {
    // 修改 src 为 examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    //输出设置
    publicPath: debug ? '/' : './',
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    indexPath: "index.html",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置 配置高于chainWebpack中关于css loader的配置
    transpileDependencies: ['webpack-dev-server/client'],
    // 强制内联CSS
    css: { extract: false },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages/')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false,
        host: 'localhost',
        port: 80,
        https: false,
        hotOnly: true,
        proxy: null, // 设置代理
        disableHostCheck: true,//中断访问开关
        before: app => { }
    }
}