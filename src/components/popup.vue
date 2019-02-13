<template>
  <transition name="fade">
    <div
      v-show="currentValue"
      class="popupContent"
    >
      <div
        class="mask"
        v-on:click="close"  
      ></div>
      <div class="popuopDetil">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: false
    };
  },
  methods: {
    close() {
      this.currentValue = !this.currentValue;
    }
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },

    value(val) {
      this.currentValue = val;
    }
  }
};
</script>

<style scoped>
.mask {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
}
.popupContent {
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
.popuopDetil {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
