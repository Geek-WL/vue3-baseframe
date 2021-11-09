import Request from './request'

const BASE_URL = 'http://localhost:4000'
const TIME_OUT = 30000

export default new Request({
  baseURL: BASE_URL || process.env.VUE_APP_BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      console.log('实例的请求拦截')
      return config
    },
    requestInterceptorsCatch(error) {
      console.log('实例的请求错误拦截')
      return error
    },
    responseInterceptors(res) {
      console.log('实例的响应拦截')
      return res
    },
    responseInterceptorsCatch(error) {
      console.log('实例的响应错误拦截')
      return error
    }
  }
})
