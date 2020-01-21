import Vue from "vue";
import Vuex from "vuex";
import userStore from "./axiosss";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAudio: true, // 全局音乐播放控制条是否显示
    typeid: "0", // 默认id
    // token: token
    singer: "", // 播放歌曲
    playing: false, // 是否播放
    fullScreen: false, // 是否全屏
    playList: [], // 播放列表
    sequenceList: [], // 非顺序播放列表
    mode: 0, // 播放模式（顺序0，循环1，随机2）
    currentIndex: 0, // 当前播放索引
    mus: "",
    gequ: {
      gqid: "", // 歌曲id
      gsid: "", // 音手id
      playing: true, // 是否播放中
      jindu: "", // 进度
      singerpic: "", // 歌手图片
      musictitle: "", // 歌曲名称
      issrc: "",
      singer: "" // 连接地址
    },
    pleartimes: "",
    timemusic: "",
    datamusic: {
      typeid: "", // 歌曲id
      isplay: false, // 是否播放中
      pleartimes: "", // 进度时间
      timemusic: "", // 歌曲总时间
      issrc: "" // 歌曲链接
    },
    listmusic: false,
    thisTimenow: "", // 拖动改变时间
    // 状态
    musicplayer: {
      title: "", // 标题
      src: "", // 连接
      author: "", // 作者
      authorid: "", // 作者
      pic: "" // 封面
      // playing: '0'// 进度
    },
    playerlist: [], // 列表播放
    sxplayer: 2 // 0表示按顺序播放，1表示循环播放,2表示播放单曲
  },
  mutations: {
    sxplayer(state, datamusic) {
      state.sxplayer = datamusic;
    },
    playerlistAdd(state, datamusic) {
      // 音乐列表增加
      // 判断是否有相同音乐了
      var result = state.playerlist.some(item => {
        if (item.id === datamusic.id) {
          return true; // 有相同音乐
        }
      });
      if (result === false) {
        state.playerlist.push(datamusic);
      }
    },
    playerlistdelete(state, ttlist) {
      // 音乐列表删除
      state.playerlist = ttlist;
    },
    singerplay(state, datamusic) {
      state.datamusic = datamusic;
      // console.log('8888888888888' + datamusic.isplay)
      // console.log('歌曲id' + state.datamusic.typeid)
      userStore.musicTil(state.datamusic.typeid, res => {
        // console.log('返回')
        state.musicplayer.title = res.data.songinfo.title;
        state.musicplayer.src = res.data.bitrate.show_link;
        state.musicplayer.author = res.data.songinfo.author;
        state.musicplayer.authorid =
          res.data.songinfo.all_artist_ting_uid || res.data.songinfo.artist_id;
        state.musicplayer.pic = res.data.songinfo.pic_small;
        state.datamusic.isplay = true;
        // console.log('歌手id' + state.musicplayer.authorid)
        // console.log(res.data)
      });

      // httpaxios({
      //   url: '/api/v1/restserver/ting',
      //   method: 'get',
      //   params: {
      //     'method': 'baidu.ting.artist.getInfo',
      //     'tinguid': '55'
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
    },
    isplaynow(state, isplay) {
      state.datamusic.isplay = isplay;
    },
    gequxx(state, gequs) {
      state.gequ.gqid = gequs.gqid;
      state.gequ.singerpic = gequs.singerpic;
      state.gequ.musictitle = gequs.musictitle;
      state.gequ.singer = gequs.singer;
      state.gequ.issrc = gequs.issrc;
    },
    incremt(state, musicall) {
      state.playing = musicall.isplay;
      state.singer = musicall.issrc;
      state.gequ.playing = musicall.isplay;
      state.mus = musicall;
    },
    musicTime(state, timemusic) {
      // 音乐总时间
      state.datamusic.timemusic = timemusic;
      state.timemusic = timemusic;
      // console.log("音乐总时间" + state.datamusic.timemusic);
    },
    playingTime(state, pleartimes) {
      // 正在进行的时间
      state.datamusic.pleartimes = pleartimes;
      state.pleartimes = pleartimes;
      // console.log('正在进行的时间' + state.datamusic.pleartimes)
      // console.log('正在进行的时间' + state.pleartimes)
    },
    thisTime(state, pleartimes) {
      // 拖动改变时间
      state.thisTimenow = pleartimes;
      state.datamusic.pleartimes = pleartimes;
      state.pleartimes = pleartimes;
      // state.pleartimes = pleartimes
      // console.log(state.thisTimenow, state.pleartimes, state.datamusic.pleartimes)
    },
    isplayer(state, isplayer) {
      // 改变播放状态
      state.datamusic.isplay = isplayer;
    },
    nextplay(state, datamusic) {
      console.log(state, datamusic);
      // state.datamusic.pleartimes = pleartimes
      // state.pleartimes = pleartimes
    }
  },
  actions: {},
  getters: {}
});
