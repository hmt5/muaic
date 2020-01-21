<template>
  <div class="lastpage">
    <div class="topSearch">
      <div class="top">
        <div class="topleft" @click="lastpag">
          <img src="../../assets/images/paglast.png" alt="" />返回
        </div>
        {{ tittle }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tittle: ""
    };
  },
  mounted() {
    this.gettittle();
  },
  methods: {
    gettittle() {
      if (this.$route.name === "ball") {
        this.tittle = "音乐榜单";
      } else if (this.$route.name === "ss") {
        this.tittle = "音乐列表";
      } else {
        this.tittle = "列表";
      }
    },
    lastpag() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.lastpage {
  width: 100%;
  min-height: 0.55rem;
}
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
  position: relative;
  display: table;
  text-align: center;
  font-size: 0.42rem;
}
.topleft {
  float: left;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  position: absolute;
}
/* .topSearchtxt{
  padding:0 0.3rem;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 0.42rem;
} */
.topleft img {
  width: 0.46rem;
  display: block;
  margin-right: 0.1rem;
}
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
  position: relative;
  display: table;
  text-align: center;
  font-size: 0.42rem;
}
.topleft {
  float: left;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  position: absolute;
}
/* .topSearchtxt{
  padding:0 0.3rem;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 0.42rem;
} */
.topleft img {
  width: 0.46rem;
  display: block;
  margin-right: 0.1rem;
}
</style>
