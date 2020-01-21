import axios from "axios";

// // 对请求错误做些什么
// axios.interceptors.request.use(
//   config => config, // 在发送请求之前做些什么
//   error => Promise.reject(error)// 对请求错误做些什么
// )

// // 添加响应拦截器
// axios.interceptors.response.use(
//   res => {
//     console.log('======', res)// 对响应数据做点什么
//     return res
//   },
//   error => {
//     console.log('======', error)// 对响应错误做点什么
//     return Promise.reject(error)
//   }
// )

const http = {
  // 推荐的音乐列表
  musiclistTil(data, cb) {
    axios.get("/api/v1/restserver/ting", { params: data }).then(res => {
      cb && cb(res);
    });
    // axios({
    //   url: '/api/v1/restserver/ting',
    //   method: 'get',
    //   params: data
    // }).then(res => {
    //   cb && cb(res)
    // })
  },
  //   歌手封面获取
  singTil(data, cb) {
    // axios.get('/api/v1/restserver/ting', {params: data}).then(res => {
    //   cb && cb(res)
    // })
    axios({
      url: "/api/v1/restserver/ting",
      method: "get",
      params: {
        method: "baidu.ting.artist.getInfo",
        tinguid: data
      }
    }).then(res => {
      cb && cb(res);
    });
  },
  // 获取音乐
  musicTil(data, cb) {
    axios
      .get("/api/v1/restserver/ting", {
        params: { method: "baidu.ting.song.play", songid: data }
      })
      .then(res => {
        cb && cb(res);
      });
  },
  // 音乐分类
  nusicall(data, cb) {
    axios({
      url: "/api/v1/restserver/ting",
      method: "get",
      params: data
    }).then(res => {
      cb && cb(res);
    });
  },
  musicWord(data, cb) {
    axios
      .get("/api/v1/restserver/ting", {
        params: { method: "baidu.ting.song.lry", songid: data }
      })
      .then(res => {
        cb && cb(res);
      });
  },
  musicSearch(data, cb) {
    axios
      .get("/api/v1/restserver/ting", {
        params: { method: "baidu.ting.search.catalogSug", query: data }
      })
      .then(res => {
        cb && cb(res);
      });
  },
  musicnew() {
    // 友情推荐
    return axios.get("/api/v1/restserver/ting", {
      params: { method: "baidu.ting.adv.showlist", _: "1430215999" }
    });
  },
  ball(data, cb) {
    // 榜单
    axios
      .get("/api/v1/restserver/ting", {
        params: {
          from: "android",
          version: "5.9.0.0",
          channel: "ppzs",
          operator: 0,
          method: "baidu.ting.billboard.billCategory",
          format: "json",
          kflag: "3"
        }
      })
      .then(res => {
        cb && cb(res);
      });
  }

  // http://tingapi.ting.baidu.com/v1/restserver/ting?from=android&version=5.9.0.0&channel=ppzs&operator=0&method=baidu.ting.billboard.billCategory&format=json&kflag=2

  // musicnew (data, cb) {
  //   axios.get('/api/v1/restserver/ting', {params: {'method': 'baidu.ting.adv.showlist', '_': '1430215999'}}).then(res => {
  //     cb && cb(res)
  //   })
  // }
};
export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "$axios", { value: http });
  }
};
