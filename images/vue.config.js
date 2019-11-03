module.exports = {
    // publicPath: './static',
    outputDir: "dist", // 构建输出目录
    assetsDir: "./static/assets", // 静态资源目录 (js, css, img, fonts)
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: {
      // 配置高于chainWebpack中关于css loader的配置
      // modules: false, // 是否开启支持‘foo.module.css’样式
      extract: false, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
      sourceMap: false, // 是否在构建样式地图，false将提高构建速度
      loaderOptions: {
        // css预设器配置项
        // sass: {
        //   prependData: '@import "@/assets/css/base.scss";' //`@import "@/assets/scss/mixin.scss";`
        // }
      }
    },
  
    parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: {
      // 第三方插件配置
    },
    pwa: {
      // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
      proxy: {
        "/api": {
          target: "http://voidcraft.s.3322.net:269",
          changeOrigin: true,
          pathRewrite: {
            "^/": "/"
          }
        },
        "/apis": {
          target: "http://180.111.91.72:8181",
          changeOrigin: true,
          pathRewrite: {
            "^/apis": "/"
          }
        },
      }
    }
  };
  