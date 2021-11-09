const axios = require('axios')
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class Request {
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isShowLoading = config.isShowLoading || true
    // 当前实例的拦截器
    if (this.interceptors) {
      this.instance.interceptors.request.use(
        this.interceptors.requestInterceptor,
        this.interceptors.requestInterceptorCatch
      )
      this.instance.interceptors.response.use(
        this.interceptors.responseInterceptor,
        this.interceptors.responseInterceptorCatch
      )
    }

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局的请求拦截')
        // 展示loading
        console.log(this.isShowLoading)
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            // background: 'rgba(0, 0, 0, 0.7)',
            body: true
          })
        }

        // const token = ''
        // if (token) {
        //   config.headers!.Authorization = `bearer ${token}`
        // }
        // this.isShowLoading = true // 重置loading
        return config
      },
      (err) => {
        console.log('全局的请求错误拦截')

        // this.isShowLoading = true // 重置loading
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局的响应拦截')
        // 清除loading
        setTimeout(() => {
          this.loading.close()
        }, 500)
        return res.data
      },
      (err) => {
        console.log('全局的响应错误拦截')
        // 清除loading
        setTimeout(() => {
          this.loading.close()
        }, 500)
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 请求级别的拦截器
      if (config.interceptors && config.interceptors.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      console.log(config.isShowLoading, 'request')
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading
      }

      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors && config.interceptors.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          this.isShowLoading = DEFAULT_LOADING // 每次请求完成之后无论此次请求是否成功都应该重置为true
          resolve(res)
        })
        .catch((err) => {
          this.isShowLoading = DEFAULT_LOADING // 每次请求完成之后无论此次请求是否成功都应该重置为true
          reject(err)
        })
    })
  }
}

export default Request
