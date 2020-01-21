<template>
  <div id="app">
    <Audios></Audios>
    <!-- <Ceshizujian /> -->
    <!-- cccdsdd
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="about">About</router-link>
    </div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view /> -->
  </div>
</template>
<script>
import Audios from "@/components/page/audios";
// import Ceshizujian from "@/components/ceshizujian";
export default {
  name: "App",
  data() {
    return {
      search: "search"
      // audiosrc: '',
      // playing: this.$store.state.playing,
      // sdsd: {
      //   a: '1',
      //   b: '2'
      // },
      // dddd: ''
    };
  },
  mounted() {},
  methods: {
    // dsdasdassss () {
    //   this.sdsd.a = '55'
    //   // console.log(this.$store.state.mus)
    //   // if (this.$store.state.playing) {
    //   //   this.$refs.musicy.play()
    //   // } else {
    //   //   this.$refs.musicy.pause()
    //   // }
    //   // console.log('sssssssssssssssssssss')
    //   // console.log()
    //   // this.$refs.musicid.play()
    //   // console.log(this.$store.state.singer)
    // },
    // audiomusic (data) {
    //   // this.audiosrc = data
    // },
    // player () {
    //   // if (!this.istruefalse) return
    //   // console.log(this.isplay)
    //   // this.pleartimes = event.target.currentTime
    //   // this.timeplear = this.times(this.pleartimes)
    //   // this.lefts = (this.pleartimes / this.alltimes) * this.playWidth
    //   // if (this.$refs.musicid.ended) {
    //   //   this.$refs.musicid.pause()
    //   //   this.isplay = true
    //   //   this.isplayersrc = false
    //   //   // this.$emit('pasdgets',this.isplayersrc)
    //   // }
    // },
    // canplays () {
    // }
  },
  computed: {
    // musicta () {
    //   // console.log('ddasdsadasd')
    //   // console.log(this.$store.state.playing)
    //   // this.$refs.musicy.play()
    //   return this.$store.state.singer
    // }
  },
  watch: {
    // 'this.$route.meta.keepAlive': function () {
    //   console.log('[')
    //   console.log(this.$route.meta.keepAlive)
    // }
    // '$store.state.singer': function (val) {
    //   this.dddd = val
    //   console.log('rrr:' + this.$refs.musicy.paused)
    //   if (this.$store.state.mus === 1) {
    //     if (this.$refs.musicy.paused === false) {
    //       this.$refs.musicy.play()
    //     }
    //   }
    // },
    // '$store.state.playing': function (val) {
    //   console.log('ttt:' + this.$refs.musicy.paused)
    //   let _this = this
    //   if (_this.$store.state.playing) {
    //     setTimeout(function () {
    //       _this.$refs.musicy.play()
    //     }, 10)
    //   } else {
    //     this.$refs.musicy.pause()
    //   }
    // }
    // '$store.state.mus': function (val) {
    //   // let _this = this
    //   // this.$refs.musicy.pause()
    //   console.log('/**************:' + val)
    // }
    // sdsd: {
    //   handler (newval, oldval) {
    //     // console.log('修改后' + newval, '修改前' + oldval)
    //     // function接受两个参数
    //   },
    //   deep: true
    // }
    // '$store.state.mus': function (val) {
    //   console.log('////////////////////////////')
    // }
    // '$store.state.mus': {
    //   header (val) {
    //     let _this = this
    //     console.log('*****************************')
    //     console.log(val)
    //     console.log(_this.$store.state.mus.playing)
    //   },
    //   deep: true
    // }
  },
  components: {
    Audios
    // Ceshizujian
  }
};
</script>
<style lang="less"></style>
