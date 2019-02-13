<template>
  <div
    class="list"
    @click="$emit('parent-list',$event)"
  >
    <div>
      <img
        v-bind:class="{imgNoSel:index != current}"
        class=""
        :src="imgSrc"
        alt=""
      >
    </div>

    <div
      class="classify_name"
      v-bind:class="{fcRed:index == current}"
    >{{name}}</div>
  </div>
</template>

<script>
export default {
  name: "classify_parent",
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },  
    index: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgNoSel: "imgNoSel",
      fcRed: "fcRed"
    };
  },
  methods: {}
};
</script>

<style scoped>
img {
  display: block;
  height: 20px;
  margin: 0 auto;
}
.classify_name {
  font-size: 13px;
  color: #444;
  text-align: center;
  padding-top: 8px;
}
.list {
  padding: 10px 0px;
}
.imgNoSel {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.fcRed {
  color: #ed5564;
}
</style>
