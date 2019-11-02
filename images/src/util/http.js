import axios from "axios";
import QS from "qs";
// 创建axios实例
// x-auth-token

class Http {
  constructor(type = 0) {
    this.type = type;
    this.$axios = axios.create({
      baseURL:
        process.env.NODE_ENV === "production"
          ? "http://localhost:8088"
          : '/api', //process.env.NODE_ENV是node变量，production表示打包，testing表示测试
      timeout: 15000, // 请求超时时间
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      } // 请求头处理
    });
    this.$axios.interceptors.request.use(
      // 请求拦截
      config => {
        // localStorage.setItem("x-auth-token", "token " + "111"); //认证
        // let token = localStorage.getItem("x-auth-token");
        // if (token) {
        //   config.headers.Auth = `${token}`;
        // }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
  }
  get(url, params = {}) {
    // if (this.type == 0) {
    //   params.token =
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkueGhlbWUuY29tXC9hcGlcL3dlY2hhdG9mZmljaWFsXC8xXC9sb2dpbiIsImlhdCI6MTU3MjQyOTI5OCwiZXhwIjoxNTcyNDMyODk4LCJuYmYiOjE1NzI0MjkyOTgsImp0aSI6IjRUYU04VmYxMFV4ODVQa3AiLCJzdWIiOjIsInBydiI6IjQxZGY4ODM0ZjFiOThmNzBlZmE2MGFhZWRlZjQyMzQxMzcwMDY5MGMifQ.iRlyMAC8DQWZTBa53w0dAtbyxkWZHYg_iUkvTnkO-J0#";
    // }
    // sessionStorage.setItem("token", params.token);
    return new Promise((resolve, reject) => {
      this.$axios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }

  post(url, params) {
    return new Promise((resolve, reject) => {
      if (Object.prototype.toString.call(params) === "[object FormData]") {
        // 上传文件格式 FromData
        // params.append("token", sessionStorage.getItem("token"));
        axios
          .post(url, params)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err.data);
          });
      } else {
        //普通 post 发送
        // params.token = sessionStorage.getItem("token");
        QS.stringify(params);
        axios
          .post(url, params)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err.data);
          });
      }
    });
  }
}
export default Http;
