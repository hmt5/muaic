<template>
  <div>
    <div class="mutlist" v-show="audiolist" @click.stop="falseshow">
      <div class="lists">
        <ul
          v-for="(lists, index) in ttlist"
          :key="index"
          @click.stop="choesmusic(lists.id, index)"
        >
          <div class="delete" @click.stop="deletes(lists.id, index)">
            <img src="../../assets/images/delete.png" />
          </div>
          <li :id="lists.id" :class="index == thisplaying ? 'musicplay' : ''">
            {{ lists.album_title }}
          </li>
          <li>{{ lists.author }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   audiolist: false,
      thisplaying: 0, // 高亮的歌曲
      ttlist: [], // 音乐播放列表
      idindex: "",
      datamusic: {
        typeid: "", // 歌曲id
        isplay: false, // 是否播放中
        playing: "", // 进度
        issrc: "" // 歌曲链接
      }
    };
  },
  props: ["audiolist"],

  mounted() {
    this.ttlist = this.$store.state.playerlist;
    this.thisplayindex();
  },
  methods: {
    thisplayindex() {
      var list = this.ttlist;
      this.thisplaying = list.findIndex(item => {
        return item.id === this.$store.state.datamusic.typeid;
      });
    },
    falseshow() {
      this.$emit("close");
    },
    choesmusic(dataid, index) {
      this.thisplaying = index;
      console.log("woshiwaiceng");
      this.datamusic.typeid = dataid;
      this.datamusic.isplay = false;
      this.$store.commit("thisTime", 0);
      // console.log(dataid)
      // console.log(index)
      this.$store.commit("singerplay", this.datamusic);
    },
    deletes(id, index) {
      // var _this = this
      // var list = this.ttlist
      console.log("我是里面");
      this.ttlist.splice(index, 1);
      console.log(this.ttlist);
      this.$store.commit("playerlistdelete", this.ttlist);
      // console.log(_this.ttlist[index])
      // this.ttlist.remove(_this.ttlist[index])
    }
  },
  watch: {
    "$store.state.playerlist": function(val) {
      this.ttlist = this.$store.state.playerlist;
      this.thisplayindex();
      console.log(val);
      // console.log('***:' + this.ttlist)
    },
    "$store.state.datamusic.typeid": function(val) {
      // console.log('歌曲改变了，我们听到吗' + val)
      this.thisplayindex();
      console.log(val);
    }
  }
};
</script>
<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
.mutlist {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 6;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.34);
  transition: all 0.2s;
}
.lists {
  width: 3.5rem;
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
.lists ul {
  width: 100%;
  text-align: left;
  padding: 0.08rem 0 0.08rem 0.2rem;
  box-sizing: border-box;
  border-bottom: 1px #eee dashed;
  overflow: hidden;
}
.lists ul li {
  width: 70%;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* padding: 0 0 0.08rem 0.2rem; */
  color: #666;
  box-sizing: border-box;
  float: left;
  padding: 0;
}
.lists ul li:first-child {
  color: #3ad5a4;
  font-size: 0.27rem;
  margin-bottom: 0.08rem;
  /* padding:  0.08rem 0 0.08rem 0.2rem; */
}
.delete {
  width: 19%;
  float: right;
  position: relative;
  z-index: 99;
}
.delete img {
  width: 100%;
  display: block;
}
.lists ul .musicplay {
  color: #69d5a4;
}
</style>
