<template>
  <div class="index">
    <div class="topSearch">
      <div class="top">
        <div class="topSearchson">
          <img src="../assets/images/home.png" alt="" />
        </div>
        <div class="topSearchtxt"><span>音乐馆</span></div>
        <div class="topSearchson">
          <img src="../assets/images/add.png" alt="" />
        </div>
      </div>
      <div class="search" @click="sectch">
        <img src="../assets/images/search.png" alt="" />搜索
        <router-view nanm="8989"></router-view>
      </div>
    </div>
    <div class="topsatlist">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in newlist"
            :key="index"
            :ids="item.album_id"
          >
            <img :src="item.album_500_500" />
          </div>
          <!-- <div class="swiper-slide">slider2</div>
        <div class="swiper-slide">slider3</div> -->
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="tittleList">
      <span class="tittleLeft">每日推荐</span>
      <span class="tittleRight" @click="plyermusic('1')">更多 ></span>
    </div>
    <div class="centerlist">
      <div class="leftmusic" @click="plyermusic(musicnew.type)">
        <img :src="musicnew.pic_s444" />
      </div>
      <div class="rightmusic">
        <div
          class="toptittle"
          @click="palys(item.song_id)"
          v-for="(item, index) in newTwomusic"
          :key="index"
          :ids="item.album_id"
        >
          <img :src="item.pic_small" />
          <p class="kiltittle">{{ item.title }}</p>
          <p>{{ item.author }}</p>
        </div>
        <!-- {{musicnew.name}} -->
      </div>
    </div>
    <div class="tittleList">
      <span class="tittleLeft">最美榜单</span>
      <span class="tittleRight" @click="moreball">更多 ></span>
    </div>
    <div class="indexAll">
      <div
        class="listmus"
        v-for="(music, key) in musicall"
        :key="key"
        @click="plyermusic(music.type)"
      >
        <img :src="music.pic_s260 ? music.pic_s260 : music.pic_s192" />
        <div class="details">{{ music.name }}</div>
      </div>
      <!-- <ul>
              <li  class="allli" :class="choes==index? choes:allli" v-for=" (music,key) in musicall" :key="key" @click="plyermusic(music.type)">
              </li>
          </ul> -->
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      datamusic: {
        typeid: "", // 歌曲id
        isplay: false, // 是否播放中
        playing: "", // 进度
        issrc: "" // 歌曲链接
      },
      musicall: [
        // {type: '1', name: '新歌榜', img: ''},
        // {type: '2', name: '热歌榜', img: ''},
        // {type: '11', name: '摇滚榜', img: ''},
        // {type: '12', name: '爵士', img: ''},
        // {type: '16', name: '流行', img: ''},
        // {type: '21', name: '欧美金曲榜', img: ''},
        // {type: '22', name: '经典老歌榜', img: ''},
        // {type: '23', name: '情歌对唱榜', img: ''},
        // {type: '24', name: '影视金曲榜', img: ''},
        // {type: '25', name: '网络歌曲榜', img: ''}
      ],
      data: {
        method: "baidu.ting.billboard.billList",
        type: "",
        size: "1",
        offset: "0"
      },
      newlist: [],
      mySwiper: "",
      musicnew: {}, //  推荐
      newTwomusic: [] // 推荐榜单的两首音乐
    };
  },
  mounted() {
    console.log(this.$store.state.datamusic.isplay);
    this.datamusic.isplay = this.$store.state.datamusic.isplay;
    // this.swipers()
    this.newmusic();
    this.ball();
  },
  methods: {
    swipers() {
      var _this = this;
      _this.mySwiper = new Swiper(".swiper-container", {
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    },
    plyermusic(id) {
      this.$router.push({ name: "ss", params: { type: id } });
      localStorage.setItem("typeid", JSON.stringify(id));
      //   this.$store.commit('twoid', id)
      //   let _this = this
      //   this.data.type = id
    },
    newmusic() {
      let datas = {
        method: "baidu.ting.billboard.billList",
        type: 1,
        size: 3,
        offset: 0
      };
      this.$axios.musiclistTil(datas, res => {
        this.newlist = res.data.song_list;
        this.$nextTick(() => {
          this.swipers();
        });
        // console.log(res)
      });

      // this.$axios.musicnew().then(res => {
      //   var data = res.data.result
      //   // console.log(res.data.result)
      //   // thiress.newlist = data.splice(0, 3)
      // console.log(this.newlist)
      // })
      // var sss = this.$axios.musicnew()
      //
    },
    ball() {
      this.$axios.ball("s", res => {
        this.musicall = res.data.content; // 所有榜单
        this.musicnew = res.data.content.splice(1, 1)[0]; // 新歌榜单
        this.newTwomusic = this.musicnew.content.splice(0, 2); // 新歌榜单两首音乐
        console.log(this.newTwomusic);
        // this.musicall=data.
        // console.log(res.data.result)
        // thiress.newlist = data.splice(0, 3)
        // console.log(data)
        // console.log(res.data)
      });
    },
    palys(dataid) {
      // 播放
      this.$store.commit("isplayer", false);
      var _this = this;
      this.datamusic.typeid = dataid;

      if (this.datamusic.isplay) {
        this.datamusic.isplay = false;
      } else {
        this.datamusic.isplay = true;
      }
      // console.log(this.datamusic)

      this.$store.commit("singerplay", _this.datamusic);
      this.addlist(dataid);
    },
    addlist(id) {
      let addlist = { id: id };
      this.$axios.musicTil(id, res => {
        addlist.album_title = res.data.songinfo.album_title;
        addlist.author = res.data.songinfo.author;
        this.$store.commit("playerlistAdd", addlist);
      });
    },
    sectch() {
      console.log("search");
      this.$router.push({
        name: "search"
      });
    },
    moreball() {
      this.$router.push({
        name: "ball"
      });
    }
  },
  watch: {
    "$store.state.datamusic.isplay": function(val) {
      this.datamusic.isplay = val;
    }
  }
};
</script>
<style scoped>
@import "../../node_modules/swiper/css/swiper.css";
/* @import '../assets/css/swiper.min.css'; */
/* @import 'swiper/dist/css/swiper.css'; */
.index {
  width: 100%;
  position: relative;
}
/* 头部 */
.topSearch {
  width: 100%;
  padding: 0.23rem 0.3rem;
  background: #69d5a4;
  color: #fff;
  box-sizing: border-box;
  /* align-items: center; */
  /* align-content: center; */
}
.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}
.topSearchtxt {
  padding: 0 0.3rem;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 0.42rem;
}
.topSearchson img {
  width: 0.46rem;
  display: block;
}
.search {
  width: calc(100% - 0.5rem);
  margin: auto;
  background: #59b58e;
  height: 0.58rem;
  /* text-align: center; */
  color: #fff;
  font-size: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.search img {
  width: 0.45rem;
  height: 0.45rem;
  display: block;
  margin: 0 0.08rem;
}
/* 轮播swiper  */
.topsatlist {
  width: 100%;
}
.swiper-container {
  width: 100%;
  height: 3rem;
  background: pink;
}
.swiper-container {
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #00ff33; /* 两种都可以 */
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}

/* 推荐 */
.tittleList {
  display: flex;
  padding: 0.2rem;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.tittleLeft {
  font-size: 0.37rem;
  font-weight: 700;
}
.tittleRight {
  font-size: 0.3rem;
  color: #3ad5a4;
}
.centerlist {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
}

.leftmusic {
  width: 4rem;
  height: 2.5rem;
  margin-right: 0.2rem;
}
.leftmusic img {
  width: 100%;
  height: 100%;
  display: block;
}
.rightmusic {
  width: calc(100% - 4.2rem);
  flex-grow: 1;
}
.toptittle {
  width: 100%;
  padding: 0.1rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #f1f1f1;
  margin-bottom: 0.1rem;
  font-size: 0.15rem;
  overflow: hidden;
}
.toptittle p {
  margin: 0;
  padding: 0;
  text-align: left;
}
.toptittle img {
  width: 1rem;
  margin-left: 0.05rem;
  display: block;
  float: right;
}
.toptittle .kiltittle {
  font-weight: 700;
  font-size: 0.28rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.1rem;
}

/* 列表 */
.indexAll {
  width: 100%;
  height: calc(100% - 5rem);
  margin: auto;
  /* display: table; */
  padding: 0 0.2rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.listmus {
  width: 49%;
  height: 3rem;
  float: left;
  font-size: 0.3rem;
  background: #3ad5a4;
  color: #fff;
  border: #eee 1px solid;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 6px;
  border-radius: 12px;
  overflow: hidden;
  display: table;
  position: relative;
}
.listmus img {
  width: 100%;
  display: block;
}

.details {
  width: 100%;
  font-size: 0.35rem;
  text-align: left;
  background: #00000069;
  position: absolute;
  height: 0.8rem;
  bottom: 0;
  text-align: center;
  line-height: 0.8rem;
}
</style>
