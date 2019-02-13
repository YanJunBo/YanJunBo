<template>
  <div class="product">
    <div
      v-bind:class="{'listContent':listType,'transverse':!listType}"
      :data-id="id"
      @click="productDetails(id)"
    >
      <div class="plist">
        <div class="goods_infor_content goods_pic">
          <img
            :src="imageSrc"
            alt=""
          >
        </div>
        <div class="goods_infor_content goods_text">
          <div
            class="productTitle"
            v-bind:class="{'tx-over-1':listType,'tx-over-2':!listType}"
          >{{title}}</div>

          <div class="price">￥{{price}}</div>
          <div
            class="fs-13 pt-10 c-A2A2A2"
            v-if="listType == false"
          >
            <span>评论:{{common_evaluate}}</span>
            <span>销量:{{common_salenum}}</span>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  //自定义的组件
  name: "productList",
  props: {
    //props传递组件的参数
    title: {
      type: String,
      default: "商品标题"
    },
    imageSrc: {
      type: String,
      default: require("../assets/default.png")
    },
    common_salenum: {
      type: String,
      default: "0"
    },
    common_evaluate: {
      type: String,
      default: "0"
    },
    price: {
      type: String,
      default: "0.00"
    },
    id: {
      type: String,
      default: "0"
    },
    listType: {
      type: Boolean,
      default: true
    }
  },
  //自定义事件
  methods: {
    productDetails(id) {
      // 匹配监听
      this.$emit("my-event", id);
    }
  }
};
</script>
<style scoped>
.plist {
  background-color: #fff;
}
.listContent {
  width: 50%;
  float: left;
}
.listContent .plist {
  padding: 10px;
}
.product img {
  width: 100%;
}
.productTitle {
  font-size: 14px;
  color: #303030;
  flex-wrap: wrap;
}
.price {
  font-size: 16px;
  color: #ff0036;
  font-weight: bold;
  padding-top: 10px;
}
.transverse .plist {
  display: flex;
}
.transverse .goods_pic {
  width: 30%;
  padding: 10px;
}
.transverse .goods_text {
  width: 70%;
  padding: 10px;
}
</style>
