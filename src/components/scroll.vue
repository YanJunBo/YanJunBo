<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  updated() {
    this.refresh();
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    initScroll() {
      var ele = this.$refs.wrapper;
      this.scroll = new BScroll(ele, {
        probeType: 1,
        click: true,
        eventPassthrough: "horizontal",
        bounce: true
      });
    },
    scrollTo(x, y, time, easing) {
      this.scroll.scrollTo(x, y, time, easing);
    },
    scrollBy(x, y, time, easing) {
      this.scroll.scrollBy(x, y, time, easing);
    },
    scrollToElement(el, time, offsetX, offsetY, easing) {
      this.scroll.scrollToElement(el, time, offsetX, offsetY, easing);
    },
    refresh() {
      this.scroll.refresh();
    }
  },
  watch: {
    data(newValue, oldValue) {}
  }
};
</script>
<style scoped>
</style>
