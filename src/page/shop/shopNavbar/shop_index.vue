<template>
  <div class="content">

    <div class="mb_title_img"><img
        :src="store_info.mb_title_img"
        alt=""
        width="100%"
      ></div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-if="store_info.mb_sliders.length > 0"
          v-for="items in store_info.mb_sliders"
        >
          <img
            :src="items.imgUrl"
            alt=""
          >
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="p-10 bc-fff">
      <div class="df f-ac bb-e3e3e3">
        <div>
          <img
            src="../../../assets/Recommend.png"
            alt=""
            width="25"
          >
        </div>
        <div class="c-303030 fs-14 ml-10">店主推荐</div>
      </div>
    </div>
    <product-list
      v-for="(items,index) in rec_goods_list"
      :title="items.common_name"
      :imageSrc="items.common_image"
      :price="items.common_cost_price"
      v-on:my-event="openProduct(items.goods_id)"
    ></product-list>
  </div>
</template>
<script>
import Swiper from "../../../../node_modules/swiper/dist/js/swiper.min.js";
import productList from "../../../components/productList";
export default {
  name: "shop_index",
  components: {
    "product-list": productList
  },
  data() {
    return {
      cruent: 0,
      shop_id: "",
      store_info: {},
      rec_goods_list: [],
      slider: [],
      inputData: {
        keywords: ""
      }
    };
  },
  mounted() {
    this.loadData();
    this.swiper();
  },
  methods: {
    loadData() {
      var _self = this;
      _self.shop_id = this.$route.query.shopId;

      _self.common.post(
        _self.apiUrl.shopUrl + "index.php?ctl=Shop&met=getStoreInfo&typ=json",
        {
          k: "",
          u: "",
          shop_id: _self.shop_id
        },
        function(data) {
          if (data) {
            if (data.status == 200) {
              _self.store_info = data.data.data.store_info;
              if (data.data.data.store_info.mb_sliders.length > 0) {
                _self.shopBcImg =
                  data.data.data.store_info.mb_sliders[0].imgUrl;
              }
              _self.slider = data.data.data.store_info.mb_sliders;
              _self.rec_goods_list = data.data.data.rec_goods_list;
            }
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    shopNav(index) {
      var _self = this;
      _self.cruent = index;
    },
    swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        autoplay: true, //可选选项，自动滑动
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        }
      });
    },
    openProduct(id) {
      this.$router.push({
        path: "../goods/product_details",
        query: { goodsId: id }
      });
    }
  }
};
</script>
<style scoped>
>>> .swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-slide img {
  display: block;
  width: 100%;
}
.content {
  margin-top: 0px;
}
.shopInfo {
  padding: 90px 10px 10px 10px;
  position: relative;
}
.shopbc {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  opacity: 0.3;
}
.shopInfoContent {
  position: relative;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.shopLog {
  width: 50px;
  height: 50px;
}
.shopLog img {
  width: 100%;
  display: block;
}
.shopName {
  color: #303030;
  font-size: 15px;
  padding: 0px 10px;
}
.shopIcon {
  font-size: 23px;
  padding-top: 5px;
}
.shopIconActive {
  color: #da2623;
  border-bottom: 2px solid #da2623;
}
.shopNavText {
  font-size: 13px;
  padding: 5px 0px;
}
.shopNav {
  background-color: #fff;
  color: #717171;
}
.shopSearch {
  width: 100%;
  top: 0px;
  z-index: 9;
  background-color: #303030;
  background-color: rgba(0, 0, 0, 0.5);
}
.mint-search {
  height: auto !important;
}
.keyWordContent span {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 13px;
  color: #303030;
  background-color: #fff;
  border: 1px solid #e2e2e2;
}
.search_ipt {
  width: 100%;
  border: none;
  padding: 8px 0px 8px 8px;
  border-radius: 10px;
}
.search_txt {
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 0px 15px;
}
.mb_title_img img {
  display: block;
}
</style>
