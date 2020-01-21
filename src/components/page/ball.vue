<template>
  <div class="index">
    <!-- <div class="topSearch">
            <div class="top">
            <div class="topleft" @click="lastpag"><img src="../../assets/images/paglast.png" alt="">返回</div>
            音乐榜单
           </div>
        </div> -->
    <lastpag></lastpag>
    <div class="balls">
      <div
        class="ballList"
        v-for="(item, index) in musicall"
        :key="index"
        @click="plyermusic(item.type)"
      >
        <div class="ballimg">
          <img :src="item.pic_s260 ? item.pic_s260 : item.pic_s192" />
        </div>
        <ul>
          <li
            class="balltitle"
            v-for="(items, indexs) in item.content"
            :key="indexs"
          >
            {{ items.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import lastpag from "../page/lastpag";
export default {
  data() {
    return {
      musicall: [] // 所有榜单
    };
  },
  mounted() {
    this.ball();
  },
  methods: {
    ball() {
      this.$axios.ball("s", res => {
        this.musicall = res.data.content; // 所有榜单
        // console.log(this.musicall)
      });
    },
    plyermusic(indexid) {
      this.$router.push({ name: "ss", params: { type: indexid } });
      localStorage.setItem("typeid", JSON.stringify(indexid));
    }
  },
  components: {
    lastpag
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  position: relative;
}

.balls {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
}
.ballList {
  width: 100%;
  box-sizing: border-box;
  background: #eee;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.ballimg {
  width: 2.5rem;
  float: right;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 9px #afafaf;
}
.ballList ul {
  list-style-type: decimal;
  margin: 0;
  padding: 0.3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  height: 2.5rem;
}
.balltitle {
  text-align: left;
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}
.ballimg img {
  width: 100%;
  display: block;
}
</style>
