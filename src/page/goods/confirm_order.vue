<template>
  <div>
    <mt-header
      fixed
      title="确认订单"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>

      </div>

    </mt-header>
    <div class="content">
      <div class="df user_address f-ac" v-on:click="openUserAddress">
        <div class="icon-loaction"></div>
        <div class="fg-1 address_details">
          <div class="df address_name_phone">
            <div class="fg-1">收货人：颜俊波</div>
            <div class="fg-1">18205082594</div>
          </div>
          <div class="df f-ac pt-10">
            <div class="fg-1 address">
              江苏省南京市秦淮区御道街169号江苏省南京市秦淮区御道街169号江苏省南京市秦淮区御道街169号
            </div>
            <div class="icon-right"></div>
          </div>
        </div>

      </div>
      <div class="order_goods_list">
        <div class="df f-ac order_shop">
          <div class="icon-shop-center"></div>
          <div class="shop_name">店铺名称</div>
        </div>
        <order-goods-list
          :goodsImage="testImage"
          :goodsName="testName"
          :spec="testSpec"
        ></order-goods-list>
      </div>
      <cell-list
        type="text"
        cellText="￥0"
        textColor="#ff0036"
        cellTitle="物流配送"
      ></cell-list>
      <cell-list
        type="all"
        cellText="暂无可用店铺代金券"
        textColor="#888"
        cellTitle="店铺代金劵"
      ></cell-list>
      <cell-list
        type="inputText"
        cellText=""
        textColor="#888"
        cellTitle="买家留言"
      ></cell-list>
      <div class="goods_total">
        共3件商品 小计：
        <span class="goods_price">￥480</span>
      </div>
    </div>
    <div class="df confirm_order_footer f-ac">
      <div class="fg-2 goods_sum">合计：<span>￥480</span></div>
      <div class="fg-1 submit_order">提交订单</div>
    </div>
    <pop-up v-model="popStatus">

      <div class="userAddress">

      </div>

    </pop-up>
  </div>
</template>

<script>
import orderGoodsList from "../../components/order_goods_list";
import cellList from "../../components/cell";
import popup from "../../components/popup"
export default {
  name: "confirmOrder",
  components: {
    "order-goods-list": orderGoodsList,
    "cell-list": cellList,
    "pop-up":popup
  },
  data() {
    return {
      testImage:
        "http://mall.jscntech.com/image.php/shop/data/upload/media/99eb64ba4386919cf1af7e806cad0527/10020/19/image/20180605/1528182333488568.jpg",
      testName: "润唐迷你电饭煲RTFB-20HW",
      testSpec: "RTFB-20HW",
      popStatus:false
    };
  },
  mounted() {
    var arr = [1,2,3];
    arr.pop(1)
    console.log(arr);


  },
  methods: {
    openUserAddress() {
      var _self = this;
      _self.popStatus = true;
    }
  }
};
</script>

<style scoped>
.mint-header {
  background-color: #fff !important;
  color: #303030;
}
.user_address {
  padding: 10px;
  background-color: #fff;
  color: #303030;
  border-bottom: 3px solid;
  -webkit-border-image: url("../../assets/border.png") 0 1% 100% 1% repeat
    repeat;
  -o-border-image: url("../../assets/border.png") 0 1% 100% 1% repeat repeat;
  border-image: url("../../assets/border.png") 0 1% 100% 1% repeat repeat;
}
.icon-loaction {
  padding-right: 5px;
}
.address_name_phone {
  font-size: 18px;
  font-weight: bold;
}
.icon-right {
  color: #707070;
}
.address {
  font-size: 13px;
}
.order_goods_list {
  margin-top: 10px;
}
.order_shop {
  padding: 10px;
  background-color: #fff;
}
.shop_name {
  font-size: 14px;
  margin-left: 5px;
}
.goods_total {
  color: #303030;
  font-size: 14px;
  padding:12px;
  text-align: right;
  background-color: #fff;
}
.goods_price{
  color: #ff0036;
}
.confirm_order_footer{
  position: fixed;
  bottom:0px;
  width:100%;
  background-color: #fff;
}
.submit_order{
  text-align: center;
  background-color: #ff0036;
  padding: 15px 0px;
  color:#fff;
}
.goods_sum{
  padding-left: 10px;
  font-size: 14px;

}
.goods_sum span{
  color:#ff0036;
  font-weight: bold;
}
</style>
