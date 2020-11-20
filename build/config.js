module.exports = {
  IS_PROD: process.env.NODE_ENV === 'production',
  // 一般情况下不建议使用cdn，毕竟是公网的资源。。。
  cdnOpt: {
    need: false,
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios'
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
      'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
      'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
      'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js',
      'https://cdn.bootcss.com/axios/0.19.2/axios.min.js'
    ]
  }
}