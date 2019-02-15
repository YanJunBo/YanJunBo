
<template>
  <div class="cell">
    <div class="cell_content df f-ac">
      <div class="cell_title" v-bind:class="{'fg-1':type != 'inputText'}">{{cellTitle}}</div>
      <div
        v-if="type == 'text' || type == 'all'"
        class="cell_text"
      >
        <div :style="{color:textColor}">{{cellText}}</div>
      </div>
      <div
        v-if="type == 'icon' || type == 'all'"
        class="icon-right tx-r"
      ></div>
        <div class="ml-10 fg-1" v-if="type == 'inputText'">
            <input type="text" placeholder="店铺订单留言">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cell",
  props: {
    type: String,
    cellText: String,
    textColor: String,
    cellTitle: String
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    name() {}
  }
};
</script>

<style scoped>
/**cell**/
.cell {
  background-color: #fff;
  padding: 12px;
  font-size: 14px;
  color:#303030;
  border-bottom:1px solid #f5f5f5
}
.cell_text {
  font-size: 12px;
}
input[type="text"]{
    border:none;
    width:100%;
}
</style>
