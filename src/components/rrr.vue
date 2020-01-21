<template>
  <div>
    <div class="sss">
      <div class="wrapper">
        <ul class="content">
          <li
            @click="clickItem($event, item)"
            class="list-item"
            v-for="(line, index) in word.lines"
            :key="index"
          >
            {{ line.txt }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style>
.sss {
  width: 100%;
  height: 8rem;
  background: pink;
}
.wrapper {
  width: 100%;
  margin: auto;
  height: 7rem;
}
</style>
