import axios from "axios";

const userStore = {
  // 推荐的音乐列表
  musiclistTil(data, cb) {
    console.log("789789" + data, cb);
    // axios.get("/api/v1/restserver/ting", { params: data }).then(res => {
    //   cb && cb(res);
    // });
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
  }
};
export default userStore;
