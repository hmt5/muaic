<template>
  <div>
    <!-- <keep-alive> -->
    <div class="seatchHome">
      <div class="seatch">
        <img src="../../assets/images/search.png" alt="" />
        <input
          class="searchs"
          type="text"
          @keyup.enter="musicSearch"
          v-model="searchtext"
          name="搜索"
          id=""
          placeholder="请输入搜索的歌曲/歌手名"
        />
        <span class="searchsButton" @click="musicSearch"
          >|&nbsp;&nbsp;搜索</span
        >
      </div>
    </div>
    <div class="seatchList">
      <ul>
        <li
          class="list"
          v-for="(item, index) in searchlist"
          :key="index"
          @click="playering(item.songid)"
        >
          <img class="musiclogo" :src="item.pic_big" />
          <div class="musictxt">
            <div class="musictittle">{{ item.songname }}</div>
            <div class="musicauthor">{{ item.artistname }}</div>
          </div>
        </li>
        <div class="moust">一共为您搜索{{ dsddasd }}首</div>
        <!-- <li class="seatchListall">vthis.$router</li> -->
      </ul>
    </div>
    <!-- <keep-alive>
        {{dsddasd}}
    </keep-alive> -->
    <!-- </keep-alive> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dsddasd: 0,
      datamusic: {
        typeid: "", // 歌曲id
        isplay: true, // 是否播放中
        playing: "", // 进度
        issrc: "" // 歌曲链接
      },
      musicplayer: {
        title: "", // 标题
        src: "", // 连接
        author: "", // 作者
        authorid: "", // 作者
        pic: "" // 封面
        // playing: '0'// 进度
      },
      searchtext: "",
      searchlist: [] // 搜索到个歌曲
    };
  },

  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    if (from.path === "/index" || from.path === "/") {
      console.log("清");
      // to.meta.keepAlive = false
      to.meta.isBack = false;
    } else {
      console.log("不清");
      to.meta.isBack = true;
      to.meta.keepAlive = true;
    }
    next();
  },
  activated() {
    console.log("this.$route.meta.isBack：" + this.$route.meta.isBack);
    console.log("this.$route.meta.keepAlive" + this.$route.meta.keepAlive);
    if (!this.$route.meta.isBack) {
      // 清空
      this.dsddasd = 0;
      this.searchtext = "";
      this.searchlist = [];

      // console.log('this.$route.meta.isBack' + this.$route.meta.isBack)
      // to.meta.isBack = true
      // console.log()
      // this.handleClear('queryForm')/*清空查询条件 */
    } else {
      // this.$route.meta.isBack = false
      // this.getBorrowList()/*列表重新加载 */
    }
  },
  mounted() {},
  methods: {
    musicSearch() {
      var _this = this;
      this.searchlist = [];
      this.$axios.musicSearch(this.searchtext, res => {
        var i = 0;
        var list = res.data.song;
        var length = res.data.song.length;
        list.forEach(item => {
          _this.$axios.musicTil(item.songid, res => {
            item.pic_big = res.data.songinfo.pic_big;
            i++;
            // console.log(i + 'ssdadadasdasdasd' + length)
            if (i === length) {
              _this.dsddasd = i;
              // console.log(length)
              // console.log(i + 'ssdadadasdasdasd' + length)
              _this.searchlist = list;
              console.log(list);
            }
          });
        });
        // console.log(i + '///' + (length - 1))
        // res.data.song
        // console.log(list)
      });
    },
    playering(id) {
      this.datamusic.typeid = id;
      //   playering
      //   console.log('=======')
      //   console.log(this.datamusic)
      this.$store.commit("singerplay", this.datamusic);
      this.addlist(id);
    },
    addlist(id) {
      // console.log('///////////-------------')
      let addlist = { id: id };
      this.$axios.musicTil(id, res => {
        addlist.album_title = res.data.songinfo.album_title;
        addlist.author = res.data.songinfo.author;
        this.$store.commit("playerlistAdd", addlist);
      });
    }
  },
  watch: {}
};
</script>
<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.seatchHome {
  width: 100%;
  height: 1rem;
  padding: 0.23rem 0.3rem;
  background: #69d5a4;
  box-sizing: border-box;
}
.seatch {
  width: 100%;
  padding: 0 0.2rem;
  display: table;
  margin: auto;
  background: #59b58e;
  height: 0.58rem;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.3rem;
  display: flex;
  align-items: center;
}
.seatch img {
  width: 0.45rem;
  /* display: block; */
}
.searchs {
  /* width: calc(100% - 0.5rem); */
  margin: auto;
  background: #59b58e;
  height: 0.58rem;
  border-radius: 5px;
  border: none;
  padding: 0 0.2rem;
  box-sizing: border-box;
  color: #fff;
  outline: none;
  flex-grow: 1;
}
.searchs::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #c2ede3;
}
.searchs:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #c2ede3;
}
.searchs::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c2ede3;
}
.searchs:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #c2ede3;
}
.searchsButton {
  color: #fff;
}

.seatchList {
  width: 100%;
  position: absolute;
  height: calc(100% - 3rem);
  padding: 0.2rem;
  box-sizing: border-box;
  overflow: auto;
  font-size: 0.28rem;
}
.seatchList ul {
  width: 100%;
}
.list {
  width: 100%;
  overflow: hidden;
  padding: 0.1rem 0;
  border-bottom: 1px solid #ddd;
}
.seatchListall {
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  font-size: 0.28rem;
}
.musiclogo {
  width: 1.5rem;
  margin-right: 0.1rem;
  display: block;
  float: left;
}
.musictxt {
  float: left;
  padding: 0.25rem 0;
  width: calc(100% - 1.8rem);
  text-align: left;
}
.musictittle {
  width: 100%;
  font-size: 0.38rem;
  margin-bottom: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicauthor {
  width: 100%;
  font-size: 0.28rem;
  color: #8a8a8a;
}
.moust {
  color: #949494;
}</style
>>
