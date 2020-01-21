<template>
  <div>
    <audio
      class="audiosd"
      :src="hearing.src"
      ref="musicy"
      @timeupdate="playertime"
      @canplay="canplays"
      @ended="ended"
    ></audio>
    <div class="player" @click="routerpage" v-show="routeName">
      <div class="playerlogo">
        <img
          :src="hearing.pic"
          class="palyering"
          :class="[{ stoping: isplayings }]"
          alt=""
        />
      </div>
      <div class="playercenter">
        <div class="playertitle">{{ hearing.title }}</div>
        <div class="playername">{{ hearing.author }}</div>
      </div>
      <img
        :src="isplay ? stopimg : playimg"
        alt="1"
        class="playerplay"
        @click.stop="isplaying"
      />
      <img
        src="../../assets/images/sheet.png"
        alt="2"
        class="playersheet"
        @click.stop="playersheet"
      />
      <!-- <div class="mutlist" v-show="audiolist" @click="falseshow">
            <div class="lists" >
                <ul v-for="(lists,index) in ttlist" :key="index" @click="choesmusic(lists.id,index)">
                    <li :id="lists.id">{{lists.album_title}}</li>
                    <li>{{lists.author}}</li>
                </ul>
            </div>
        </div> -->
      <musiclist :audiolist="audiolist" @close="close"></musiclist>
    </div>
  </div>
</template>
<script>
import musiclist from "./musiclist";
export default {
  data() {
    return {
      routeName: true,
      isplayings: true, // 唱片是否旋转
      hearing: {
        title: "", // 标题
        src: "", // 连接
        author: "", // 作者
        authorid: "", // 作者id
        pic: require("../../assets/images/music.png") // 封面
      },
      isplay: this.$store.state.datamusic.isplay,
      playimg: require("../../assets/images/play.png"),
      stopimg: require("../../assets/images/stop.png"),
      isplayshow: false,
      audiolist: false,
      datamusic: {
        typeid: "", // 歌曲id
        isplay: false, // 是否播放中
        pleartimes: "", // 进度时间
        timemusic: "", // 歌曲总时间
        issrc: "" // 歌曲链接
      },
      playerlist: [] // 歌曲列表
      // ttlist: [
      //   {album_title: '种太阳', author: '啦啦啦', id: ''}
      // ]
    };
  },
  mounted() {
    // this.lisen()
    // console.log('路由')
    // console.log(this.$route)
    this.hear();
  },
  methods: {
    hear() {
      if (this.$store.state.musicplayer.src === "") {
        console.log("4");
      } else {
        this.hearing = this.$store.state.musicplayer;
      }
      // console.log('==**==')
      // console.log(this.hearing)
      // console.log('==**==')
    },
    isplaying() {
      if (this.$store.state.musicplayer.pic === "") {
        return;
      }
      if (this.isplay) {
        this.isplay = false;
        this.$refs.musicy.pause();
      } else {
        this.isplay = true;
        this.$refs.musicy.play();
      }
      this.$store.commit("isplaynow", this.isplay);
    },

    lisen() {
      if (this.$store.state.singer !== "") {
        this.isplayshow = true;
      }
    },
    playersheet() {
      this.audiolist = true;
      // console.log(this.audiolist)
    },
    close() {
      this.audiolist = false;
    },
    routerpage() {
      // 跳转到音乐播放器
      let _this = this;
      // console.log('8888')
      // console.log(this.$store.state.datamusic)
      this.$router.push({
        name: "pome",
        params: {
          musicid: _this.$store.state.datamusic.typeid,
          singid: _this.hearing.authorid
        }
      });
    },
    playertime() {
      var pleartimes = this.$refs.musicy.currentTime;
      this.$store.commit("playingTime", pleartimes);
    },
    canplays() {
      // 音乐加载完成
      var timemusic = event.target.duration;
      this.$store.commit("isplaynow", this.isplay);
      this.isplay = true;
      this.$refs.musicy.play();
      this.$store.commit("musicTime", timemusic);

      // this.typeid=
      // this.datamusic.isplay=true
      //       this.$store.commit('nextplay', datamusic)

      // console.log('总时间：' + timemusic)
      // this.istruefalse = true
    },
    ended() {
      // console.log('播放结束')
      // console.log(this.$store.state.sxplayer)
      if (this.$store.state.sxplayer === 0) {
        console.log("顺序播放");
        var nextid = "";
        var length = this.$store.state.playerlist.length;
        var idIndex = this.$store.state.playerlist.findIndex(value => {
          return value.id === this.$store.state.datamusic.typeid;
        });
        if (idIndex === length - 1) {
          idIndex = -1;
        }
        // console.log('现在播放得：' + idIndex)
        nextid = this.$store.state.playerlist[idIndex + 1].id;
        var datamusic = {
          typeid: nextid,
          isplay: false,
          // pleartimes: 0,
          // timemusic: 0,
          issrc: ""
        };
        this.$store.commit("singerplay", datamusic);
        // this.$store.commit('isplayer', true)
      } else if (this.$store.state.sxplayer === 1) {
        console.log("循环播放");
        this.$refs.musicy.play();
        this.$store.commit("isplayer", true);
      } else {
        this.$store.commit("isplayer", false);
        console.log("单曲播放");
      }
    }
  },
  computed: {},

  watch: {
    $route: function() {
      console.log("路改变");
      this.routeName = this.$route.name;
      if (this.$route.name === "pome") {
        this.routeName = false;
      } else {
        this.routeName = true;
      }
      // console.log(this.$route.name)
      // console.log(this.routeName)
    },
    "$store.state.datamusic.typeid": function(val) {
      this.hearing = this.$store.state.musicplayer;
      console.log(val);
    },
    "$store.state.datamusic.isplay": function() {
      // console.log('我在改变')
      this.isplay = this.$store.state.datamusic.isplay;
      // console.log('][]]][][][][' + this.$store.state.datamusic.isplay + this.isplay)
      if (this.isplay) {
        this.$refs.musicy.play();
        this.isplayings = false;
        console.log("播放");
      } else {
        this.$refs.musicy.pause();
        this.isplayings = true;
        console.log("停止");
      }
    },
    "$store.state.datamusic.pleartimes": function(val) {
      console.log(val);
      // console.log('--' + val)
      // this.$refs.musicy.currentTime = val//这里被我注释了噢噢噢噢噢噢噢噢哦哦
      // this.ddd = val
    },
    "$store.state.thisTimenow": function(val) {
      console.log("拖动时间：" + val);
      this.$refs.musicy.currentTime = val;
    },
    "$store.state.playerlist": function(val) {
      this.playerlist = this.$store.state.playerlist;
      // console.log('***:' + this.ttlist)
      console.log(val);
    },
    "$store.state.showAudio": function(val) {
      console.log(val);
    }
  },
  components: {
    musiclist
  }
};
</script>
<style scoped>
/* 音乐播放器 */
.audiosd {
  position: absolute;
}
.player {
  /* width: 100%; */
  height: 2rem;
  border-top: 1px solid #ccc;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  position: fixed;
  bottom: 0rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 9;
  max-width: 750px;
  margin: auto;
}
.playerlogo {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.playerlogo img {
  width: 100%;
  height: 100%;
  display: table;
}
.playercenter {
  padding-left: 0.2rem;
  float: left;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: 1;
  flex-flow: 1;
  width: 3.5rem;
  height: 1.6rem;
  /* display: table; */
  text-align: left;
}
.playertitle {
  width: 100%;
  font-size: 0.4rem;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.playername {
  width: 100%;
  font-size: 0.25rem;
  color: #ccc;
}

.playerplay {
  width: 0.9rem;
  display: table;
  float: left;
  margin: 0 0.1rem;
}
.playersheet {
  width: 0.8rem;
  display: table;
  float: left;
  z-index: 10;
}
/* 音乐播放列表 */
/* .mutlist{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 6;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.34);
    transition: all 0.2s;
}
.lists{
        width: 3rem;
    background: #fff;
    border: #eee 1px solid;
    position: absolute;
    font-size: 0.2rem;
    bottom: 1.5rem;
    height: 6rem;
    right: 0.2rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.12rem 0.2rem;
    box-sizing: border-box;
    z-index: 7;
}
.lists ul{
        width: 100%;
    text-align: left;

    border-bottom: 1px #eee dashed;

}
.lists ul li{
    width: 100%;
    overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 0.2rem;
    color: #666;
}
.lists ul li:first-child{
    color:#3ad5a4;
    font-size: 0.27rem;
    padding: 0.08rem 0.2rem;
} */
.active {
  display: none;
}

/* 旋转动画 */
.palyering {
  animation: palyer 4s linear infinite;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
.stoping {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
@keyframes palyer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
