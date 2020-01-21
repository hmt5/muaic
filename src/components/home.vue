<template>
  <div class="home" :style="{ height: heights + 'px' }">
    <div @click="record" class=""></div>
    <div class="swiper-container" id="swiper1">
      <div @click="tiao" class="tiao" v-show="juspshow">tiao4</div>
      <div class="swiper-wrapper">
        <div class="swiper-slide home_banner">
          <div class="button" id="buttonDiv">
            <div
              class="buttons"
              id="moveDiv"
              :style="{ left: buttonLeft }"
              @mousedown="down"
              @touchstart="down"
              @mousemove="move"
              @touchmove.prevent="move"
              @mouseup="end"
              @touchend="end"
            ></div>
          </div>
          <div class="center">
            <div
              class="centera"
              :class="[ansur == index ? 'choes' : '', 'postss' + index]"
              :key="index"
              @click="lunbo(index)"
              v-for="(rideo, index) in audios"
            >
              {{ rideo.name }}
            </div>
            <div @click="record" class=""></div>
            <audio
              class="sss"
              id="eventAudio"
              :src="audiosrc"
              ref="ddd"
              @canplay="getDuration"
              @timeupdate="updateTime"
            ></audio>
          </div>
          <div class="progressBar">
            <div
              class="bobutton"
              :class="anting ? 'audioplay' : 'audiostop'"
              @click="bofanzanting"
            ></div>
            <div class="dsad" ref="aad">
              <div class="progress" ref="aaa">
                <div class="aaaheng" ref="aab"></div>
                <div
                  class="aaaqiu"
                  ref="aac"
                  :style="{ left: lefts + 'px' }"
                  @mousedown="audiostart"
                  @touchstart="audiostart"
                  @mousemove="audiomove"
                  @touchmove.prevent="audiomove"
                  @mouseup="audioend"
                  @touchend="audioend"
                ></div>
              </div>
            </div>
            <div class="nn">
              <span>{{ nowTime }}</span
              >/<span>{{ allTime }}</span>
            </div>
            <div
              class="music"
              :class="musicIs ? 'music' : 'musicof'"
              @click="musicopen"
            ></div>
          </div>
        </div>
        <div class="swiper-slide home_banner">
          2
        </div>
        <div class="swiper-slide home_banner">
          3
        </div>
        <div class="swiper-slide home_banner">
          4
        </div>
        <div class="swiper-slide home_banner">
          5
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      flags: false,
      ansur: 0,
      heights: 0,
      mySwiper: "",
      juspshow: false,
      position: { x: 0, y: 0 },

      nx: "",
      // ny: '',
      dx: "",
      // dy: '',
      // xPum: '', yPum: '',
      audiosrc: require("../assets/music/q1.mp3"),
      anting: true,
      nowTime: "0:00",
      allTime: 0,
      widths: "1%",
      timenav: 0,
      timeover: 0,
      touch: {},
      paused: true,
      audios: [
        {
          name: "推广1",
          stt: "postss1",
          src: require("../assets/music/q1.mp3")
        },
        {
          name: "推广2",
          stt: "postss2",
          src: require("../assets/music/sz.mp3")
        },
        {
          name: "推广3",
          stt: "postss3",
          src: require("../assets/music/q1.mp3")
        },
        {
          name: "推广4",
          stt: "postss4",
          src: require("../assets/music/sz.mp3")
        },
        {
          name: "推广5",
          stt: "postss5",
          src: require("../assets/music/q1.mp3")
        }
      ],
      lefts: "0",
      musicIs: true,
      buttonLeft: "0"
    };
  },
  created() {
    this.ferf();
  },
  mounted() {
    this.play();
    // let moveDiv = document.getElementById('moveDiv')
    // let buttonDiv = document.getElementById('buttonDiv')
  },
  methods: {
    play() {
      var _this = this;
      this.mySwiper = new Swiper("#swiper1", {
        autoplay: false,
        direction: "vertical",
        loop: false,
        // autoplay: {
        //     delay: 1000,//1秒切换一次
        //   },
        on: {
          slideChangeTransitionStart: function() {
            _this.buttonLeft = 0;
            // console.log('444:' + this.activeIndex)
            if (this.activeIndex === 0 || this.activeIndex === 3) {
              _this.juspshow = false;
            } else {
              _this.juspshow = true;
            }
          },
          slideChangeTransitionEnd: function() {
            // console.log("555:"+this.activeIndex);
          }
        }
      });
    },
    ferf() {
      this.heights = window.screen.height;
    },
    tiao() {
      var _this = this;
      this.mySwiper.slideTo(3, 1000, false);
      setTimeout(function() {
        _this.juspshow = false;
      }, 1000);
    },
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        // console.log('1')
        touch = event.touches[0];
      } else {
        // console.log('2')
        touch = event;
      }
      this.position.x = touch.clientX; // 手指按下的x坐标
      this.position.y = touch.clientY; // 手指按下Y坐标
      // console.log(moveDiv.offsetLeft)
      // this.dx = moveDiv.offsetLeft
      // this.dy = moveDiv.offsetTop;
    },
    move() {
      var _this = this;
      let buttonwidth =
        document.getElementById("buttonDiv").offsetWidth -
        document.getElementById("moveDiv").offsetWidth;
      //   let widthall = buttonDiv.offsetWidth - moveDiv.offsetWidth
      if (this.flags) {
        var touch;
        if (event.touches) {
          // console.log("3")
          touch = event.touches[0];
        } else {
          // console.log("4")
          touch = event;
        }
        this.nx = touch.clientX - this.position.x; // 手指按下的x坐标
        // this.ny = touch.clientY - this.position.y;//手指按下Y坐标

        // this.xPum = this.dx+this.nx;
        // this.yPum = this.dy+this.yPum;

        // console.log(this.xPum,this.ny)
        // console.log(this.dx)

        // console.log(this.nx)
        // console.log('---------------------------------------------')
        // console.log(this.xPum)
        if (_this.buttonLeft === buttonwidth + "px") {
          return;
        }
        if (this.nx < 0) {
          _this.buttonLeft = 0;
        } else {
          _this.buttonLeft = buttonwidth + "px";
          setTimeout(function() {
            _this.mySwiper.slideTo(3, 1000, false);
          }, 1000);
        }

        // // 阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到touchmove
        // document.addEventListener('touchmove', function () {
        //   event.preventDefault()
        // }, false)
      }
    },
    end() {
      this.flags = false;
    },
    record() {
      if (this.$refs.ddd.paused) {
        /* 如果已经暂停 */
        this.$refs.ddd.play();
        // if(this.audio=="false"){
        //     this.nestip=true
        //     this.timetip()
        // }else{
        //     this.$refs.ddd.play()   //播放
        //     this.play=false
        //     this.rrsd.autoplay.stop();
        // }
      } else {
        this.$refs.ddd.pause(); // 暂停
        this.play = true;
        // this.rrsd.autoplay.start();
      }
    },
    lunbo(index) {
      // var _this=this
      this.anting = true;
      this.ansur = index;
      this.audiosrc = this.audios[index].src;

      // _this.audiosrc=_this.arrItem[activeIndex].src
      // _this.audio=_this.arrItem[activeIndex].name
    },
    // 音频播放暂停按钮
    bofanzanting() {
      // 改变暂停/播放icon
      if (this.$refs.ddd.paused) {
        this.$refs.ddd.play();
        this.anting = false;
      } else {
        this.$refs.ddd.pause();
        this.anting = true;
      }
    },
    getDuration() {
      console.log(this.$refs.ddd.duration);
      this.timenav = this.$refs.ddd.duration;
      let allTime = this.$refs.ddd.duration | 0;

      // var hour = Math.floor (video1.duration / 3600);
      // var other = allTime % 3600;
      // var minute = allTime / 60
      // var second = (other % 60).toFixed (2);
      let minute = (allTime / 60) | 0;
      let num = allTime % 60;
      let len = num.toString().length;
      while (len < 2) {
        num = "0" + num;
        len++;
      }
      let second = num;
      this.allTime = minute + "：" + second; // 总时长
    },

    updateTime(e) {
      // 进度
      this.timeover = e.target.currentTime;
      var interval = e.target.currentTime | 0;
      let munite = (interval / 60) | 0;
      let num = interval % 60;
      let len = num.toString().length;
      while (len < 2) {
        num = "0" + num;
        len++;
      }
      let secenf = num;
      this.nowTime = munite + ":" + secenf;
      // this.widths=(this.timeover/this.timenav)*100+"%"
      this.lefts = Math.min(
        this.$refs.aaa.clientWidth,
        (this.timeover / this.timenav) * this.$refs.aaa.clientWidth
      );
      // this.$refs.aab.style.width=this.lefts+'px'
    },
    audiostart(e) {
      this.touch.initiated = true; // 点击状态
      this.touch.startX = e.touches[0].pageX; // 手指按下据x轴坐标px
      console.log(e.touches[0].pageX);
      this.touch.left = parseInt(this.$refs.aac.style.left); // 现在播放的长度对应的宽度px
      this.paused = this.$refs.ddd.paused;
      this.$refs.ddd.pause();
    },
    audiomove(e) {
      var deltaX = e.touches[0].pageX - this.touch.startX; // 移动的x轴坐标-手指按下据x轴坐标=手指移动的距离
      this.lefts = Math.min(
        this.$refs.aaa.clientWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      // this.$refs.aab.style.width=this.lefts+'px'
    },
    audioend() {
      this.touch.initiated = false;
      const barWidth = this.$refs.aaa.clientWidth; // 播放条的总长度
      const percent = this.lefts / barWidth; // 占据的百分比
      this.timeover = this.timenav * percent; // 当前的播放量时间秒数
      var interval = (this.timenav * percent) | 0;
      let munite = (interval / 60) | 0;
      let num = interval % 60;
      let len = num.toString().length;
      while (len < 2) {
        num = "0" + num;
        len++;
      }
      let secenf = num;
      this.nowTime = munite + ":" + secenf;
      this.$refs.ddd.currentTime = this.timeover;

      if (this.paused) {
        this.$refs.ddd.pause();
      } else {
        this.$refs.ddd.play();
      }
    },
    musicopen() {
      this.$refs.ddd.muted = !this.$refs.ddd.muted;
      this.musicIs = !this.musicIs;
      console.log(this.musicIs);
      //    console.log(this.$refs.ddd.muted)
      //     console.log(!this.$refs.ddd.muted)
    }
  },
  watch: {
    lefts: function(newQuestion, oldQuestion) {
      this.$refs.aab.style.width = newQuestion + "px";
      console.log(newQuestion, oldQuestion);
    }
  }
};
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  font-size: 0.5rem;
}
#swiper1 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#swiper1 .swiper-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
}

.home_banner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.tiao {
  position: fixed;
  top: 2.2rem;
  font-size: 0.2rem;
  right: 0;
  z-index: 5;
}
.button {
  /* display: none; */
  width: 3rem;
  background: pink;
  height: 0.8rem;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
}
.buttons {
  width: 0.8rem;
  height: 0.8rem;
  background: #fff;
  border: 1px solid pink;
  box-sizing: border-box;
}
#moveDiv {
  position: absolute;
  left: 0;
  right: 0;
  transition: all ease 1s;
}
.center {
  width: 100%;
  /* display: none; */
  height: 5rem;
  position: relative;
}
.centera {
  width: 2rem;
  height: 2rem;
  background: #eee;
  font-size: 0.3rem;
  position: absolute;
}
.choes {
  background: pink;
}
.postss0 {
  left: 0;
  top: 0;
}
.postss1 {
  left: 0.2rem;
  top: 2.1rem;
}
.postss2 {
  left: 0;
  right: 0;
  margin: auto;
  top: 3.2rem;
}
.postss3 {
  right: 0.2rem;
  top: 2.1rem;
}
.postss4 {
  right: 0;
  top: 0;
}

/* 音频 */
.progressBar {
  width: 100%;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bobutton {
  width: 0.5rem;
  height: 0.5rem;
  /* position: absolute;
    left: 0; */
}
.audioplay {
  background: url(../assets/images/btn_play.png) no-repeat;
  background-size: 100% 100%;
}
.audiostop {
  background: url(../assets/images/btn_stop.png) no-repeat;
  background-size: 100% 100%;
}

.dsad {
  width: calc(3rem + 6px);
  /* position: relative;
    margin: auto; */
  background: #7f7f7f;
  border-radius: 5px;
  height: 10px;
}
.progress {
  width: 3rem;
  /* margin:20px  auto; */
  height: 10px;
  /* background: #dce0e0 ; */
  position: relative;
}
.aaaheng {
  border-radius: 10px;
  background-color: #ffd332;
  /* animation: animate-positive 1s; */
  height: 4px;
  margin: 3px 0 0 0;
  position: absolute;
  top: 0;
  z-index: 1;
}
.aaaqiu {
  width: 10px;
  margin-left: -4px;
  height: 10px;
  /* background: #669; */
  /* background: radial-gradient(circle closest-side, #ff0000, #00ff00, #ffff00);  */
  background: radial-gradient(circle closest-side, #fed422, #f5d151, #ecd579);
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  z-index: 2;
}
.nn {
  font-size: 0.1rem;
}
.music {
  width: 0.8rem;
  height: 0.8rem;
  background: url(../assets/images/nusic.png) no-repeat;
  background-size: 100% 100%;
}
.musicof {
  position: relative;
}
.musicof::after {
  content: "";
  border: 1px solid black;
  width: 0.5rem;
  transform: rotate(125deg);
  -o-transform: rotate(125deg);
  -moz-transform: rotate(125deg);
  -webkit-transform: rotate(125deg);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 16px;
}
</style>
