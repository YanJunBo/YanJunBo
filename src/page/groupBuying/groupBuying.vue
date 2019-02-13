<template>
  <div>
    <mt-header
      fixed
      title="团购"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="content">
      <div><img
          src="https://gjusp.alicdn.com/img/img1539078900646-996.png@1000y-0ic_50Q.png"
          class="banner"
          alt=""
          srcset=""
        ></div>
      <div class="list-content bc-fff">

        <group-buring-list
          v-for="(items,index) in physical"
          :goods_name="items.goods_name"
          :goods_img="items.groupbuy_image"
          :goods_price="parseFloat(items.goods_price)"
          :time="items.countTime"
          v-on:open-details="openDetails(items.goods_id)"
        >
        </group-buring-list>

      </div>
    </div>
  </div>
</template>

<script>
import groupBuringList from "../../components/groupBuringList";

import tuanGouJson from "../../components/tuangou.json";
export default {
  //https://gjusp.alicdn.com/img/img1539078900646-996.png@1000y-0ic_50Q.png
  //http://mall.jscntech.com//index.php?ctl=GroupBuy&met=index&typ=json&ua=wap&sub_site_id=0&k=&u=
  name: "groupBuring",
  components: {
    "group-buring-list": groupBuringList
  },
  data() {
    return {
      physical: []
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    var _self = this;
    setInterval(function() {
      //时间的倒计时
      _self.countDown();
    }, 1000);
  },
  methods: {
    loadData() {
      
      var _self = this;
      var data = tuanGouJson;
      // _self.common.get(
      //   _self.apiUrl.shopUrl +
      //     "/index.php?ctl=GroupBuy&met=index&typ=json&ua=wap&sub_site_id=0",
      //   {},
      //   data => {
      if (data) {
        if (data.status == 200) {
          if (data.data.goods.physical.recommend.items.length > 0) {
            _self.physical = data.data.goods.physical.recommend.items;
            _self.physical.forEach(val => {
              _self.$set(
                val,
                "countTime",
                _self.countDownFn(val.groupbuy_endtime)
              );
            });
          }
        }
      }
      //   }
      // );
    },
    countDown() {
      var _self = this;
      _self.physical.forEach(val => {
        val.countTime = _self.countDownFn(val.groupbuy_endtime);
      });
    },
    countDownFn(date) {
      var _self = this;
      var dateTime = new Date(date);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth();
      var day = dateTime.getDate();
      var now = new Date();
      var endDate = new Date(year, month, day);
      var leftTime = endDate.getTime() - now.getTime();
      var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hh = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时数
      var mm = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟数
      var ss = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
      dd = _self.checkTime(dd);
      hh = _self.checkTime(hh);
      mm = _self.checkTime(mm);
      ss = _self.checkTime(ss); //小于10的话加0
      return dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    openDetails(goods_id) {
      var _self = this;
      _self.$router.push({
        path: "../goods/product_details",
        query: {
          goodsId: goods_id
        }
      });
    }
  }
};
</script>

<style scoped>
.mint-header {
  background-color: #fff !important;
  color: #303030 !important;
}
.banner {
  width: 100%;
  display: block;
}
</style>
