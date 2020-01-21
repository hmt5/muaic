<template>
  <div class="pome">
    <!-- <div style="font-size:0.28rem;">
       {{alltimes}}
      {{$store.state.pleartimes}}
      </div> -->
    <div
      class="pomehome"
      :style="{ background: 'url(' + imgsrc + ') no-repeat' }"
    >
      <div class="zzc"></div>
      <div class="pometittle">
        <div class="pometittleleft" @click="lastpag">
          <img src="../assets/images/paglast.png" alt="返回" />
        </div>
        <div class="pometittlecenter">
          {{ this.$store.state.musicplayer.title }}
          <p>{{ this.$store.state.musicplayer.author }}</p>
        </div>
      </div>
      <!-- <div @click="ppp">{{pleartimes}}</div> -->
      <div class="musicword">
        <div class="pomepaly" v-show="wrapperList">
          <img src="../assets/images/play.png" alt="" />
        </div>

        <div
          :class="['wrapper', wrapperList ? 'wrapperList' : '']"
          ref="lyricList"
        >
          <ul
            class="content"
            @touchstart="wordstart"
            @touchmove="wordmove"
            @touchend="wordend"
          >
            <li
              class="list-item"
              @click="thisPlay(index)"
              :class="{ current: currentLineNum == index }"
              ref="lyricLine"
              :data="index"
              v-for="(line, index) in word.lines"
              :key="index"
            >
              {{ line.txt }}
              <span
                style="font-size='0.2rem'"
                v-show="currentLineNum == index"
                v-if="wrapperList"
                >{{ times(line.time / 1000) }}</span
              >
            </li>
          </ul>
        </div>
        <!-- <div ref="lyricList" class="list-wrapper" pullingUp="sdsds">
                <ul class="list-content">
                    <p v-for="(line,index) in word.lines" :key="index" :class="{'current':currentLineNum===index}"  class="text">{{line.txt}}</p>
                </ul>
              </div> -->
      </div>
      <div class="musicPlayer">
        <div class="musicPlayering">
          <div class="times">{{ timeplear }}</div>
          <div class="palyering" ref="palyer">
            <div class="aaaheng" :style="{ width: widths }"></div>
            <div
              class="qius"
              ref="audioleft"
              :style="{ left: lefts + 'px' }"
              @mousedown="audiostart"
              @touchstart="audiostart"
              @mousemove="audiomove"
              @touchmove.prevent="audiomove"
              @mouseup="audioend"
              @touchend="audioend"
            ></div>
          </div>
          <div class="times">{{ timeall }}</div>
        </div>
        <div class="nowing">
          <div class="ball" @click="issxplay">
            <img src="../assets/images/ball_a.png" alt="" />
            <div class="sxcss" v-show="showsxplay">
              <ul>
                <li
                  v-for="(item, index) in sxplaylist"
                  :class="index == sxplayerid ? 'sxcssff' : ''"
                  :key="index"
                  @click="sxplayer(index)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="bull">
            <img
              src="../assets/images/last.png"
              @click="nextmusic('last')"
              alt=""
            />
            <img
              :src="sssdda ? playerTsrc : playerFsrc"
              @click="isplayer"
              alt=""
            />
            <img
              src="../assets/images/next.png"
              @click="nextmusic('next')"
              alt=""
            />
          </div>
          <div class="ball" @click="playersheet">
            <img src="../assets/images/ball_b.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <musiclist :audiolist="audiolist" @close="close"></musiclist>
  </div>
</template>
<script>
// /zhelizhel 这里这里20191120=====================================================================
import Lyric from "lyric-parser";
import BScroll from "better-scroll";
import musiclist from "./page/musiclist";
export default {
  data() {
    return {
      title: "", // 歌名
      word: "", // 歌词
      scroll: "",
      currentLineNum: 0, // 第几行歌词
      audiolist: false, // 歌单隐藏
      imgsrc: require("../assets/images/play.png"),
      music: "",
      touchmusic: false, // 手指拖动小球
      timeplear: "00:00", // 播放时间
      timeall: "00:00", // 音乐总共时间
      pleartimes: 0, // 音乐已经播放的时间
      alltimes: "", // 音乐的总时间
      lefts: "0", // 小球左边距
      widths: "", // 进度条的宽度
      player: {
        downx: "0",
        playerx: "0"
      },
      playWidth: "0", // 播放条的长度px
      istruefalse: true,
      isplay: this.$store.state.datamusic.isplay, // 是否正在播放,false是暂停
      sssdda: false, // 控制图标是否正在播放,false是暂停
      playerFsrc: require("../assets/images/playing.png"),
      playerTsrc: require("../assets/images/stoping.png"), // 是否正在播放的图片
      touchword: false, // 手指在拖动歌词
      nowtime: "", // 手指结束拖动的歌词时间
      me: false,
      wrapperList: false, // 控制样式，拉动时
      sxplaylist: ["顺序播放", "单曲循环", "播放单曲"],
      sxplayerid: 2, // 现在的播放循序
      showsxplay: false // 隐藏播放顺序的样式
      // qingfu: false
    };
  },
  created() {
    this.more();
    this.sceoll();
  },
  mounted() {
    this.time();
    this.author(); // 歌手背景
    this.sxplayerid = this.$store.state.sxplayer;
    console.log("[][][][][]" + this.$store.state.sxplayer);
  },
  methods: {
    ppp() {
      // this.author()
      // this.isplay = false
      // this.word.stop()
    },
    wordstart() {
      this.noelistnum = this.currentLineNum;
      // console.log('开始' + this.noelist)
      this.touchword = true;
      this.wrapperList = true;
      // this.$store.commit('isplayer', false)// 先暂停音乐播放
      this.isplay = false;
    },
    wordmove() {
      // let lineEl = this.$refs.lyricLine[this.currentLineNum]// 距离顶部的条数
      // this.scroll.scrollToElement(lineEl, 1000)
      // this.word.seek(this.nowtime * 1000)
    },
    wordend() {
      // console.log('结束')
      // this.touchword = false
      // setTimeout(() => {
      //   this.wrapperList = false
      // }, 1000)
      // if (this.sssdda) {
      //   this.$store.commit('isplayer', true)// 音乐播放
      //   this.isplay = true
      // } else {
      //   this.isplay = false
      // }
    },
    sceoll() {
      var _this = this;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.lyricList, {
          probeType: 3,
          scrollY: true,
          click: true
          // bounce: true,
          // bindToWrapper: false
          // momentumLimitDistance: 15,
          // momentum: true
          // momentumLimitTime: 100,
          // adjustTime: 10
        });

        this.scroll.on("scroll", pos => {
          clearTimeout(this.setinme);
          var scrollY = Math.abs(Math.round(pos.y));
          // console.log(Math.round(scrollY / _this.$refs.lyricLine[0].offsetHeight))
          // var sss = parseInt(scrollY / _this.$refs.lyricLine[0].offsetHeight) + 1
          var sss = Math.round(scrollY / _this.$refs.lyricLine[0].offsetHeight);
          _this.currentLineNum = sss;
          // if (this.sssnum === 1) return
          // _this.nowtime = _this.word.lines[_this.currentLineNum].time / 1000

          // console.log('sssssssssssssssssssssssssssssssssssssssss' + this.currentLineNum)
          // console.log(pos)
          // if (this.qingfu) return
          // if (this.touchword) {
          //   var scrollY = Math.abs(Math.round(pos.y))
          //   // console.log(Math.round(scrollY / _this.$refs.lyricLine[0].offsetHeight))
          //   // var sss = parseInt(scrollY / _this.$refs.lyricLine[0].offsetHeight) + 1
          //   var sss = Math.round(scrollY / _this.$refs.lyricLine[0].offsetHeight)
          //   _this.currentLineNum = sss
          //   _this.nowtime = _this.word.lines[_this.currentLineNum].time / 1000

          //   // let lineEl = this.$refs.lyricLine[this.currentLineNum]// 距离顶部的条数
          //   // this.scroll.scrollToElement(lineEl, 1000)

          //   // _this.$store.commit('thisTime', _this.nowtime)
          //   // console.log(this.currentLineNum * _this.$refs.lyricLine[0].offsetHeight)
          // } else {
          //   console.log('touchwordtouchwordtouchword' + this.touchword)
          // }
        });
        // this.scroll.on('scrollEnd', (pos) => {
        //   let lineEl = this.$refs.lyricLine[this.currentLineNum]// 距离顶部的条数
        //   this.scroll.scrollToElement(lineEl, 1000)
        // })
        this.scroll.on("scrollEnd", pos => {
          // console.log('////////////////////////////////////////////')

          // console.log('滚动结束' + this.isplay + ',' + this.sssdda + '/////' + this.sssnum)
          // console.log('我是轻拂')
          // this.qingfu = true
          console.log(pos);
          var lineEl = this.$refs.lyricLine[this.currentLineNum]; // 距离顶部的条数
          this.scroll.scrollToElement(lineEl, 1000);
          // this.currentLineNum * _this.$refs.lyricLine[0].offsetHeight
          if (this.touchword === false) return; // 正在播放的时候不用回滚
          console.log("手指拖动了歌词");
          this.setinme = setTimeout(() => {
            // console.log('_this.touchword' + _this.touchword)
            // if (this.sssnum === 1) return// 如果是一直处于播放状态就不用回滚
            _this.isplay = true;
            _this.wrapperList = false;
            _this.touchword = false; // 手指停止了歌词
            if (this.sssnum === 1) return;
            console.log(
              _this.noelistnum + "**************" + this.currentLineNum
            );
            var lineEl = this.$refs.lyricLine[_this.noelistnum]; // 距离顶部的条数
            _this.scroll.scrollToElement(lineEl, 1000);
            _this.isplay = _this.sssdda;
            _this.noelistnum = this.currentLineNum;
            console.log(
              _this.noelistnum + "*******22*******" + this.currentLineNum
            );

            // if (this.isplay === false) retur
            // console.log('滚动结束' + this.isplay + ',' + this.sssdda)
            // if (this.sssdda === true) {
            // } else {
            //   clearTimeout(this.setinme)
            //   _this.wrapperList = false
            //   console.log('开始' + this.noelistnum)
            //   var lineEl = this.$refs.lyricLine[this.noelistnum]// 距离顶部的条数
            //   this.scroll.scrollToElement(lineEl, 1000)
            // }
          }, 2000);
        });
      });
    },
    thisPlay(data) {
      // console.log('sddddddddddddddddddddddddddddd' + data)
      var _this = this;
      if (this.currentLineNum === data) {
        _this.nowtime = _this.word.lines[data].time / 1000;
        _this.$store.commit("thisTime", _this.nowtime);
        this.isplay = true;
        this.sssdda = true;
        this.$store.commit("isplayer", this.isplay);
        _this.wrapperList = false;
        // console.log(data)
      } else {
        // console.log('sddddddddddddddddddddddddddddd')
      }
    },
    time() {
      this.alltimes = this.$store.state.datamusic.timemusic; // 音乐时长
      this.timeall = this.times(this.alltimes); // 音乐时长
      this.isplay = this.$store.state.datamusic.isplay; // 是否播放中
      this.sssdda = this.$store.state.datamusic.isplay; // 是否播放中
      this.playWidth = this.$refs.palyer.clientWidth; // 播放条长度
      this.timeplear = this.times(this.$store.state.datamusic.pleartimes); // 已经播放的时间
      this.lefts =
        (this.$store.state.datamusic.pleartimes /
          this.$store.state.datamusic.timemusic) *
        this.playWidth; // 播放条占据的百分比
      // console.log('///////cccccccccccccccccccccc')
      // console.log(this.currentLineNum)
      // var lineEl = _this.$refs.lyricLine[_this.currentLineNum]// 距离顶部的条数
      //           _this.scroll.scrollToElement(lineEl, 1000)
      // console.log(nowleft)
      // console.log('已经播放的时间' + nowleft)
    },
    more() {
      var _this = this;

      // console.log(_this.word)
      if (
        _this.word === "" ||
        _this.word === null ||
        _this.word === undefined
      ) {
        console.log("---------------");

        _this.word = "dddd";
        console.log(_this.word);
      }
      this.$axios.musicWord(_this.$store.state.datamusic.typeid, res => {
        console.log("geci");
        console.log(res);
        _this.$nextTick(() => {
          _this.word = new Lyric(res.data.lrcContent, this.handleLyric);
          // console.log(_this.$store.state.datamusic.pleartimes * 1000)
          var wordIndex = _this.word.lines.findIndex(value => {
            return value.time >= _this.$store.state.datamusic.pleartimes * 1000;
          });
          this.currentLineNum = wordIndex > 1 ? wordIndex - 1 : 0;
          setTimeout(() => {
            _this.scroll.scrollToElement(
              _this.$refs.lyricLine[_this.currentLineNum],
              1000
            );
          }, 100);
          // _this.scroll.scrollToElement(_this.$refs.lyricLine[5], 1000)
        });
        // this.pleartimes = this.$store.state.pleartimes// 播放时长
        // this.word.seek(this.pleartimes * 1000)
      });
    },
    handleLyric({ lineNum, txt }) {
      // 会处于一直被监听
      // console.log(txt)
      // console.log(this.word.lines[0].txt)
      var _this = this;
      if (this.isplay === false) return;
      this.currentLineNum = lineNum;
      let lineEl = this.$refs.lyricLine[lineNum]; // 距离顶部的条数
      _this.scroll.scrollToElement(lineEl, 1000);
      this.playingLyric = txt;
    },
    times(time) {
      // 时间转换
      let interval = time | 0;
      let munite = (interval / 60) | 0;
      let num = interval % 60;
      let len = num.toString().length;
      let lens = munite.toString().length;
      while (len < 2) {
        num = "0" + num;
        len++;
      }
      while (lens < 2) {
        munite = "0" + munite;
        lens++;
      }
      return munite + ":" + num;
    },
    audiostart(e) {
      clearTimeout(this.setinme);
      this.touchmusic = true;
      this.player.downx = e.touches[0].pageX;
      this.player.playerx = parseInt(this.$refs.audioleft.style.left);
      this.$store.commit("isplayer", false); // 先暂停音乐播放
      this.sssdda = this.isplay;
    },
    audiomove(e) {
      // var _this = this
      let delatx = e.touches[0].pageX - this.player.downx;
      let nowleft = Math.min(
        this.playWidth,
        Math.max(this.player.playerx + delatx, 0)
      );
      this.lefts = nowleft;
      let times = (nowleft / this.playWidth) * this.alltimes;
      this.pleartimes = times;
      // this.$store.commit('thisTime', times)
      this.timeplear = this.times(times);
      this.touchmusic = true;
      // _this.word.lines
      // var len = this.word.lines.length
      // console.log('[][][' + times)
      this.isplay = true;
      this.word.seek(times * 1000);
      console.log("1111");
    },
    audioend() {
      this.touchmusic = false;
      this.noelistnum = this.currentLineNum;
      // // console.log('我手指体制')
      // // this.word.stop()
      // if (this.sssdda) {
      //   this.sssdda = true
      //   this.isplay = true
      //   console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
      // } else {
      //   this.isplay = false
      //   this.sssdda = false
      //   console.log('zoufalse')
      //   this.word.stop()
      // }
      this.sssdda = true;
      this.isplay = true;
      this.$store.commit("thisTime", this.pleartimes);
      this.$store.commit("isplayer", this.sssdda); // 返回之前的音乐播放状态
    },
    isplayer() {
      // 播放暂停切换
      // this.noelistnum = this.currentLineNum
      console.log(this.isplay + "]]]]][[[[" + this.sssdda);
      if (this.sssdda) {
        if (this.wrapperList) {
          console.log("4");
        } else {
          this.noelistnum = this.currentLineNum;
        }
        this.word.stop();
        this.isplay = false;
        this.sssdda = false;
        console.log("---我不嫩走了-");
        this.sssnum = 0;
      } else {
        this.isplay = true;
        this.sssdda = true;
        this.sssnum = 1;
      }
      this.$store.commit("isplayer", this.sssdda);
    },
    tiao() {
      this.$router.push({
        name: "audios"
      });
    },
    playersheet() {
      // 歌单显示
      this.audiolist = true;
    },
    close() {
      // 歌单隐藏
      this.audiolist = false;
    },
    nextmusic(data) {
      // 下一首歌曲
      var length = this.$store.state.playerlist.length;
      var idIndex = this.$store.state.playerlist.findIndex(value => {
        return value.id === this.$store.state.datamusic.typeid;
      });
      var nextid = "";
      if (data === "next") {
        if (idIndex >= length - 1) {
          idIndex = length - 2;
        }
        nextid = this.$store.state.playerlist[idIndex + 1].id;
      } else {
        if (idIndex <= 0) {
          idIndex = 1;
        }
        nextid = this.$store.state.playerlist[idIndex - 1].id;
      }
      var datamusic = {
        typeid: nextid,
        isplay: false,
        // pleartimes: 0,
        // timemusic: 0,
        issrc: ""
      };
      this.$store.commit("singerplay", datamusic);
    },
    issxplay() {
      this.showsxplay = !this.showsxplay;
    },
    sxplayer(data) {
      this.sxplayerid = data;
      this.$store.commit("sxplayer", data);
    },
    author() {
      // 获取作者背景图
      var _this = this;
      _this.$axios.singTil(_this.$store.state.musicplayer.authorid, res => {
        console.log("wowowo ");
        this.imgsrc = res.data.avatar_s1000;
        console.log(res.data.avatar_big);
      });
    },
    lastpag() {
      // 返回
      this.$router.go(-1);
    }
  },
  computed: {
    // ddd () {
    //   console.log(this.$store.state.datamusic.pleartimes)
    //   return this.$store.state.datamusic.pleartimes
    // }
  },
  watch: {
    word: function(val) {
      console.log("我是歌词变了" + val);
    },
    currentLineNum: function(newval, onlval) {
      console.log(onlval, newval);
    },
    lefts: function(lefts) {
      this.widths = this.lefts + "px";
      console.log(lefts);
      // console.log('888:' + this.widths)
    },
    "$store.state.timemusic": function(val) {
      // this.hearing = this.$store.state.musicplayer
      this.alltimes = val;
      this.timeall = this.times(val);
    },
    "$store.state.datamusic.typeid": function(val) {
      var _this = this;
      this.isplay = true;
      this.sssdda = true;
      console.log("8888888888888" + this.isplay + this.sssdda + val);
      this.sssnum = 1;
      console.log(this.currentLineNum + "::" + this.noelistnum);
      this.word.stop();
      this.isplay = false;

      this.$axios.musicWord(_this.$store.state.datamusic.typeid, res => {
        _this.$nextTick(() => {
          _this.word = new Lyric(res.data.lrcContent, this.handleLyric);
          this.currentLineNum = 0;
          this.noelistnum = 0;
          _this.scroll.scrollToElement(_this.$refs.lyricLine[0], 1000);
          // _this.word.seek(0)
          this.isplay = true;
        });
      });
      // this.more()
    },
    "$store.state.pleartimes": function(val) {
      // console.log(this.$store.state.pleartimes)
      // console.log(this.alltimes)
      // console.log('/////////////////')

      // 设置小球的进度
      this.pleartimes = val;
      console.log("设置小球的进度" + this.pleartimes);
      console.log(this.isplay);
      this.timeplear = this.times(val);
      this.lefts = (this.pleartimes / this.alltimes) * this.playWidth;

      if (this.pleartimes === this.alltimes) {
        // 时间相等
        console.log("播放结束了///////////////");
        // this.isplay = false
        this.isplay = false; // 控制变化表示已经播放完成

        if (
          this.$store.state.sxplayer === 0 ||
          this.$store.state.sxplayer === 1
        ) {
          this.isplay = true;
          this.word.seek(0);
          // console.log('顺序播放')
          // this.$store.commit('isplayer', true)
          // } else if (this.$store.state.sxplayer == 1) {
          //   console.log('走你')
          //   // this.word.plau()
          //   this.isplay = true
          //   this.word.seek(0)
          //   // this.currentLineNum = 0
          //   // // let lineEl =// 距离顶部的条数
          //   // this.scroll.scrollToElement(this.$refs.lyricLine[0], 1000)
          //   // this.isplay = true
        } else {
          this.currentLineNum = 0;
          this.scroll.scrollToElement(this.$refs.lyricLine[0], 1000);
          console.log("停止了噢噢噢噢");
          this.word.seek(0);
          this.pleartimes = 0;
          this.timeplear = "00:00";
          this.lefts = 0;
          this.sssdda = false;
          this.isplay = false;
        }
      }
      // 设置歌词的进度
      if (this.isplay) {
        console.log("2222");
        if (this.word.seek === undefined) {
          // 歌词还没有加载出来
          console.log("我没有歌词");
          return;
        }
        this.word.seek(this.pleartimes * 1000);
      } else {
        // console.log('99999')
        this.word.stop();
      }
    },
    "$store.state.musicplayer.authorid": function(val) {
      this.author();
      console.log("77777" + val);
    },
    "$store.state.datamusic.isplay": function(val) {
      // this.isplay = val
      console.log("================");
      console.log(val);
    }
  },
  components: {
    musiclist
  }
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
.pome {
  width: 100%;
  height: 100%;
  position: relative;
}
.zzc {
  background: #00000085;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.pomehome {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100% !important;
}
.musicPlayer {
  width: 100%;
  height: 2.2rem;
  padding: 0.2rem 0.1rem;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  display: table;
  z-index: 6;
  background: rgba(19, 19, 19, 0.45098039215686275);
}
.musicPlayering {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: space-between;
  align-items: center;
}
.palyering {
  width: 5.4rem;
  height: 3px;
  background: #eee;
  margin: auto;
  position: relative;
}
.musicword {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  height: calc(100% - 6.5rem);
  overflow: hidden;
  position: absolute;
  top: 1.6rem;
  padding-top: 2.6rem;
  /* background: rgba(128, 198, 255, 0.945); */
}
.aaaheng {
  width: 0;
  height: 3px;
  background: #3ad5a4;
  margin: 0;
}
.qius {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: radial-gradient(circle closest-side, #3ad5a4, #fff, #eee);
  position: absolute;
  top: -4px;
  left: 0;
  z-index: 2;
  margin-left: -3px;
}
.times {
  font-size: 0.28rem;
  display: table;
  color: #fff;
}

.nowing {
  width: 92%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
.sxcss {
  padding: 0.1rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  font-size: 0.3rem;
  z-index: 9;
  color: #adaeb0;
  background: #000000a1;
  bottom: 1.5rem;
  left: 0.2rem;
  border-radius: 0.1rem;
}
.sxcssff {
  color: #fff;
}
.ball {
  width: 0.6rem;
  display: table;
}
.ball img {
  width: 100%;
  display: table;
}
.bull {
  flex-flow: 1;
  display: flex;
  align-items: center;
}
.bull img {
  width: 1rem;
  display: table;
  float: left;
  margin: 0 0.3rem;
}
.wrapper .current {
  color: #19ff8c;
}

/* sdd */
.wrapper {
  width: 100%;
  margin: auto;
  height: 0.52rem;
  line-height: 0.52rem;
  /* overflow: hidden; */
  /* padding-top: 120px; */
  /* background: #ceceff; */
}
.wrapper > ul {
  margin: 0;
  padding: 0;
}
.wrapper > ul > li {
  position: relative;
  z-index: 5;
  height: 0.52rem;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapperList {
  position: relative;
}
.wrapperList::before {
  content: "";
  width: 100%;
  height: 0.52rem;
  background: #fff;
  position: absolute;
  top: 0rem;
  left: 0;
  box-shadow: 0 0 1px black;
  z-index: 0;
  opacity: 0.5;
}
.list-item {
  height: 0.4rem;
  color: #bdbdbd;
}
.pomepaly {
  width: 0.52rem;
  position: absolute;
  left: 0;
}
.pomepaly img {
  position: relative;
  z-index: 99;
  width: 100%;
  display: block;
}

/* 表头 */
.pometittle {
  width: 100%;
  position: relative;
  padding: 0.2rem;
  box-sizing: border-box;
}
.pometittleleft {
  float: left;
  font-size: 0.28rem;
}
.pometittleleft img {
  width: 0.46rem;
  display: block;
}
.pometittlecenter {
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  display: table;
  margin: auto;
}
.pometittlecenter p {
  font-size: 0.3rem;
  margin: 0.1rem 0;
  padding: 0;
}
</style>
