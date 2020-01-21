<template>
  <div class="listss">
    <lastpag></lastpag>
    <div class="paslist">
      <div class="musics" @scroll="handleScroll">
        <div class="musicsList" ref="allmusics">
          <div class="list" v-for="(musicT, index) in musicall" :key="index">
            <div class="listImg">
              <img :src="musicT.album_500_500" alt="x" />
            </div>
            <div class="listtext">
              <p class="nameMusic">{{ musicT.title }}</p>
              <p class="actorMusic">{{ musicT.author }}</p>
            </div>
            <div class="musicpaly" @click="palys(musicT.song_id, index)">
              <img :src="play" alt="112" />
              <!-- <img :src="musicT.plausgr? close:play" alt="112"> -->
            </div>
            <div class="musicshare" @click="addlist(musicT.song_id, index)">
              <img src="../assets/images/addmusic.png" alt="223" />
            </div>
          </div>
          <div v-show="tips" class="loading">{{ tipstxt }}</div>
        </div>
        <!-- <div class="player" v-if="playershow"  style="display:none;">
              <div class="playerlogo" ><img :src="musics.singerpic" alt=""></div>
              <div class="playercenter" @click="musicrouter()">
                  <div class="playertitle">{{musics.musictitle}}</div>
                  <div class="playername">{{musics.singer}}</div>
              </div>
              <img :src="yy?close:play" alt="1" @click="thispaly"  class="playerplay">
              <img src="../assets/images/sheet.png" @click="looklist" alt="2" class="playersheet">
              <div class="mutlist" v-show="islist" @click="falselist">
                  <div class="lists" >
                      <ul v-for="(lists,index) in list" :key="index" @click="choesmusic(lists.id,index)">
                          <li :id="lists.id">{{lists.album_title}}</li>
                          <li>{{lists.author}}</li>
                      </ul>
                  </div>
              </div>

          </div> -->
      </div>
    </div>
    <div
      class="playermusic"
      :class="{ addplayer: ismusiclogoid }"
      :style="{ top: tops, left: lefts }"
    >
      <img src="../assets/images/playermusic.png" />
    </div>
  </div>
</template>
<script>
import lastpag from "./page/lastpag";
export default {
  data() {
    return {
      musicall: [], // 音乐列表
      musics: {
        // 播放条
        musictitle: "", // 音乐标头
        musicPlay: "", // 音乐链接
        singerpic: "", // 歌手图片
        singer: "" // 歌手名称
      },
      playershow: true, // 是否已有播放
      datamusic: {
        typeid: "", // 歌曲id
        isplay: false, // 是否播放中
        playing: "", // 进度
        issrc: "" // 歌曲链接
      },
      //   singid: '', // 歌曲的id
      isplayid: 0,
      yy: true,
      close: require("../assets/images/stop.png"),
      play: require("../assets/images/play.png"),
      list: [{ album_title: "种太阳", author: "啦啦啦", id: "" }], // 歌单
      islist: false,
      typeid: "",
      i: 0, // 加载的索引，相当于加载到几个
      // listHeight: '',
      tips: false,
      tipstxt: "加载中...", // 提升内容
      listmusics: 0, // 每一条的高度
      ismusiclogoid: false, // 控制添加音乐的图标
      tops: "0px",
      lefts: "0px"
    };
  },
  mounted() {
    this.listMusic();
    this.asno();
    // window.addEventListener('scroll', this.handleScroll)
    // this.handleScroll()
    // this.musicsAllHeight = this.$refs.musicsAllHeight.offsetHeight
    // this.$nextTick(() => {
    //   console.log(this.$refs.musicsAllHeight)
    //   var y = this.$refs.musicsAllHeight[0].offsetHeight
    //   console.log('+++++yyy' + y)
    // })
  },
  methods: {
    handleScroll() {
      var _this = this;
      _this.tips = true;
      // console.log('总高度' + this.allmusics + '显示器高度' + parseInt(event.target.offsetHeight) + '滚动的高度' + parseInt(event.target.scrollTop))
      // var asdsds = parseInt(event.target.scrollTop) + parseInt(event.target.offsetHeight) - // 滚动到这个高度进行加载
      var top = parseInt(event.target.scrollTop); // 滚动的高度
      var asdsds =
        this.$refs.allmusics.offsetHeight - parseInt(event.target.offsetHeight); // 滚动到这个高度进行加载
      // console.log(top + 'toptop' + asdsds)
      console.log(top, asdsds);
      if (top >= asdsds - 1 && top <= asdsds + 1) {
        console.log("wohuia");
        _this.i = Number(_this.i) + 1;
        let datas = {
          method: "baidu.ting.billboard.billList",
          type: _this.typeid,
          size: 10,
          offset: _this.i * 10
        };
        if (_this.i >= 4) {
          // 拉取加载的歌不超过40条，拉取3次
          console.log("-我已经把压箱底的歌都给你了哦----'");
          this.tipstxt = "----我已经把压箱底的歌都给你了哦----";
          return;
        }
        console.log(datas);
        _this.$axios.musiclistTil(datas, res => {
          // console.log(res)
          let list = res.data.song_list;
          _this.musicall.push(...list);
          this.allmusics = this.$refs.allmusics.offsetHeight;
          _this.tips = false;
        });
      }
    },
    looklist() {
      this.islist = true;
    },
    falselist() {
      this.islist = false;
    },
    choesmusic(id, index) {
      this.islist = false;
      this.musicTil(id);
      console.log(index);
    },
    addlist(id, index) {
      console.log(index);

      // console.log('///////////-------------')
      let addlist = { id: id };
      this.$axios.musicTil(id, res => {
        addlist.album_title = res.data.songinfo.album_title;
        addlist.author = res.data.songinfo.author;
        this.$store.commit("playerlistAdd", addlist);
      });
      // console.log('dsdasdsadasdadasd')
      // console.log(event)
      // console.log(event.clientX)
      // console.log(event.clientY)
      this.tops = event.clientY + "px";
      this.lefts = event.clientX + "px";
      this.ismusiclogoid = true;

      // console.log(this.tops, this.lefts)
      setTimeout(() => {
        // console.log('sd')
        this.tops = "15rem";
        this.right = "1rem";
      }, 1);

      setTimeout(() => {
        this.ismusiclogoid = false;
      }, 2000);
      // if(this.ismusiclogoid){

      // }
    },
    listMusic() {
      let _this = this;
      if (
        this.$route.params.type === "" ||
        this.$route.params.type === undefined
      ) {
        _this.typeid = JSON.parse(localStorage.getItem("typeid"));
        // console.log('//')
      } else {
        _this.typeid = this.$route.params.type;
      }
      //   console.log('99' + _this.typeid)
      let datas = {
        method: "baidu.ting.billboard.billList",
        type: _this.typeid,
        size: 10,
        offset: 0
      };
      //   console.log(datas)

      _this.$axios.musiclistTil(datas, res => {
        let list = res.data.song_list;
        // console.log('[[[[[[[[[[[]]]]]]]]]]]]]]]')
        // console.log(list)
        list.forEach(item => {
          item.plausgr = false;
        });
        _this.musicall = list;

        _this.$nextTick(() => {
          _this.allmusics = _this.$refs.allmusics.offsetHeight;
          _this.listmusics = _this.allmusics / 10;
          console.log(_this.listmusics);
          // _this.listHeight = _this.$refs.musiclist[0].offsetHeight
          // console.log('+++++yyy' + _this.listHeight)
        });
        // console.log('1:', res)
      });

      //
      //   if (_this.$store.state.singer) {
      //     this.playershow = true
      //   }
    },
    asno() {
      // this.$store.state.gequ
      // console.log(this.$store.state.singer)
      // console.log(this.$store.state.gequ.playing)
      this.yy = this.$store.state.gequ.playing;
      this.musics.singerpic = this.$store.state.gequ.singerpic;

      this.musics.singer = this.$store.state.gequ.singer;
      this.musics.musictitle = this.$store.state.gequ.musictitle;
      this.datamusic.issrc = this.$store.state.gequ.issrc;
      //   this.datamusic.issrc = this.$store.state.gequ.playing
      //   this.musics.musicPlay = this.$store.state.gequ.playing

      //    thismusic.playing
      //   thismusic.singerpic
      //   thismusic.musictitle
      //   thismusic.singer =

      //   _this.datamusic.isplay
    },
    palys(typeid, index) {
      let _this = this;
      this.playershow = true; // 设置已有播放歌曲

      if (this.isplayid === index) {
        // 跟现在播放的是不是同一首，isplayid播放的是表中第几条
      } else {
        this.musicall[_this.isplayid].plausgr = false; // 关闭上一首歌曲图标
        this.datamusic.isplay = false; // 播放条中的图标
        this.isplayid = index;
      }
      if (this.datamusic.isplay) {
        this.datamusic.isplay = false;
      } else {
        this.datamusic.isplay = true;
      }

      // this.musicall[index].plausgr = this.datamusic.isplay// 列表中的图标
      this.datamusic.typeid = typeid; // 歌曲id
      _this.yy = _this.datamusic.isplay; // 播放条中的图标
      // 歌曲信息
      console.log(this.datamusic);
      _this.$store.commit("singerplay", this.datamusic);
      this.addlist(typeid); // 添加到曲单
      //   _this.$axios.musicTil(typeid, res => {
      //     _this.musics.singerpic = res.data.songinfo.pic_big// 歌曲封面
      //     _this.musics.singer = res.data.songinfo.author// 歌手名字
      //     _this.musics.musictitle = res.data.songinfo.title// 标题
      //     _this.datamusic.issrc = res.data.bitrate.show_link// 连接地址src
      //     this.$store.commit('incremt', _this.datamusic)

      //     let thismusic = {
      //       gqid: '', // 歌曲id
      //       gsid: '', // 音手id
      //       playing: true, // 是否播放中
      //       jindu: '', // 进度
      //       singerpic: '', // 歌手图片
      //       musictitle: '', // 歌曲名称
      //       issrc: '', // 歌曲连接
      //       singer: ''// 连接地址
      //     }
      //     thismusic.gqid = typeid
      //     thismusic.gsid = _this.musicall[index].ting_uid
      //     thismusic.playing = _this.datamusic.isplay
      //     thismusic.singerpic = res.data.songinfo.pic_big
      //     thismusic.musictitle = res.data.songinfo.title
      //     thismusic.singer = res.data.songinfo.author
      //     thismusic.issrc = _this.musics.musicPlay
      //     this.$store.commit('gequxx', thismusic)
      //   })
    },
    musicTil(id) {
      let _this = this;
      _this.$axios.musicTil(id, res => {
        _this.musics.musicPlay = res.data.bitrate.show_link;
        _this.musics.singerpic = res.data.songinfo.pic_big;
        _this.musics.singer = res.data.songinfo.author; // 歌手
        _this.musics.musictitle = res.data.songinfo.title;
        _this.datamusic.issrc = _this.musics.musicPlay;
        this.$store.commit("incremt", _this.datamusic);

        let thismusic = {
          gqid: "", // 歌曲id
          gsid: "", // 音手id
          playing: true, // 是否播放中
          jindu: "", // 进度
          singerpic: "", // 歌手图片
          musictitle: "", // 歌曲名称
          issrc: "", // 歌曲连接
          singer: "" // 连接地址
        };
        thismusic.gqid = id;
        thismusic.playing = _this.datamusic.isplay;
        thismusic.singerpic = res.data.songinfo.pic_big;
        thismusic.musictitle = res.data.songinfo.title;
        thismusic.singer = res.data.songinfo.author;
        thismusic.issrc = _this.musics.musicPlay;
        this.$store.commit("gequxx", thismusic);
      });
    },
    thispaly() {
      let _this = this;
      if (this.yy) {
        this.datamusic.isplay = false;
        this.yy = false;
      } else {
        this.datamusic.isplay = true;
        this.yy = true;
      }
      // this.musicall[_this.isplayid].plausgr = this.yy
      this.$store.commit("incremt", _this.datamusic);
    },
    musicrouter() {
      let _this = this;
      this.$router.push({
        name: "pome",
        params: { musicid: _this.musicid, singid: _this.singid }
      });
    }
    // sou () {
    //   this.$axios({
    //     url: '/api/v1/restserver/ting',
    //     method: 'get',
    //     params: {
    //       'method': 'baidu.ting.search.catalogSug&query',
    //       'query': '海阔天空'
    //     }
    //   }).then(res => {
    //     // console.log(res)
    //   })
    // },
    // getdata () {
    //   this.$axios.get('/api/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=海阔天空', {})
    //     .then((response) => {
    //       console.log(response.data)
    //     }).catch((response) => {
    //       console.log(response)
    //     })
    // }
  },
  components: {
    lastpag
  },
  watch: {
    // '$store.state.singer': function () {
    //   console.log('43343434:' + this.singid)
    //   if (this.singid !== '') {
    //     this.playershow = true
    //   }
    // }

    "$store.state.datamusic.pleartimes": function(val) {
      console.log(val);
    }
  }
};
</script>
<style>
@import "../styles/ss.css";
</style>
