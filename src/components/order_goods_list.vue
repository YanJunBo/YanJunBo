<template>
  <div>
    <router-link
      to="order_details"
      class="df orderList"
    >
      <div class="orderImage">
        <div
          class="bc-img-c"
          :style="{backgroundImage:'url('+goodsImage+')'}"
        ></div>
      </div>
      <div class="listContent fg-1">
        <div class="df">
          <div class="orderDeilt fg-3 ml-10">
            <div class=" fs-15">{{goodsName}}</div>
          </div>
          <div class="orderPric fg-1 ml-10 tx-r">
            <div class=" fs-15">￥{{goodsPric}}</div>
          </div>
        </div>
        <div class="df mt-5">
          <div class="ml-10 fg-3">
            <div class="spec fs-13">{{spec}}</div>
          </div>
          <div class="fg-1 fs-13 ml-10 tx-r">
            <div class="fs-13">X{{goods_num}}</div>
          </div>
        </div>
      </div>

    </router-link>
  </div>
</template>

<script>
export default {
  name: "order-goods-list",
  props: {
    goodsImage: {
      type: String
    },
    goodsName: {
      type: String,
      default: "商品名称"
    },
    goodsPric: {
      type: Number,
      default: 0.0
    },
    spec: {
      type: String,
      default: ""
    },
    goods_num:{
        type:Number,
        default:0
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.listContent{
    padding:5px 0px;
}
.orderDeilt {
  background-color: #f5f5f5;
}
.orderImage div {
  width: 5.2rem;
  height: 5.2rem;
  margin: 0 auto;
}
.orderList {
  padding: 10px 10px;
  background-color: #f5f5f5;
  border-bottom: 3px solid #fff;
}
</style>
