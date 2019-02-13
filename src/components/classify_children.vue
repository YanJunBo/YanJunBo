<template>
  <div>
    <div
      class="car_title df f-ac"
      @click="$emit('children-title')"
    >
      <div><img
          src="../assets/iconCar.png"
          alt=""
        ></div>
      <div class="car_title_text">{{carName}}</div>
    </div>
    <div class="box-row">
      <div
        @click="$emit('children-list',items.cat_id)"
        class="box-col-sm-4 box-col-xs-4"
        v-if="childList.length>0"
        v-for="items in childList"
      >
        <div class="tx-over-1">{{items.cat_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "classify_children",
  props: {
    carName: {
      type: String,
      default: ""
    },
    childList: {
      type: Array
    }
  }
};
</script>

<style scoped>
.box-row div div {
  font-size: 13px;
  margin: 8px;
  color: #303030;
}
.car_title {
  padding: 10px;
  font-size: 13px;
  background-color: #fdfdfd;
}
.car_title img {
  display: block;
  height: 15px;
}
.car_title_text {
  margin-left: 10px;
}
</style>
