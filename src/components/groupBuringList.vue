<template>
  <div class="list">
    <div class="time_content df f-ac">
      <div class="time"><img
          src="../assets/time.png"
          alt=""
        ></div>
      <!-- ShowCountDown(time) -->
      <div class="timeStr">距离结束还有：{{time}}</div>
    </div>
    <div class="df f-ac">
      <div class="goods_img"><img
          :src="goods_img"
          alt=""
          srcset=""
        ></div>
      <div class="goods_detailed">
        <div class="goods_name">{{goods_name}}</div>
        <div class="goods_title pt-5">限时第2件5折</div>
        <div class="doing">疯抢进行中</div>
        <div class="df f-ac">
          <div
            class="goods_price fg-1"
            style="align-self:flex-end"
          >￥{{goods_price}}</div>
          <div class="fg-1 tx-r">
            <span class="buring" @click="$emit('open-details'); ">马上团 > </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "groupBuringList",
  props: {
    goods_name: {
      type: String,
      default: "goods_name"
    },
    goods_img: {
      type: String,
      default: ""
    },
    goods_price: {
      type: Number,
      default: 0
    },
    time: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>

<style scoped>
.goods_img {
  width: 30%;
  padding: 15px;
}
.goods_img img {
  width: 100%;
}
.goods_detailed {
  width: 70%;
  padding: 15px;
  color: rgb(51, 51, 51);
}
.goods_title {
  font-size: 12px;
}
.doing {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  margin-top: 7px;
  padding: 3px 40px;
  background-image: url("../assets/bb.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: repeat-x;
  color: #fff;
  border-radius: 15px;
  overflow: hidden;
}
.goods_price {
  color: #ff0036;
  font-size: 17px;
  font-weight: bold;
}
.buring {
  display: inline-block;
  padding: 10px;
  background-color: #ff0036;
  font-size: 14px;
  color: #fff;
  border-radius: 15px;
}
.time_content {
  padding: 10px 10px 0px 10px;
}
.time {
  width: 5%;
}
.time img {
  display: inline-block;
  width: 100%;
}
.timeStr {
  margin-left: 10px;
  font-size: 14px;
  color: #ff0036;
}
</style>
