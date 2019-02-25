<template>
  <div>
    <mt-header
      fixed
      title="首页"
    ></mt-header>
    <router-link
      class="search"
      to="../page/goods/goods_search"
    >
      <div class="f-ac df">
        <div class="fg-3 searchIpt">
          <div class="icon-search p-10 fs-13 c-5f646e"></div>
        </div>
        <div class="c-fff ml-5 fs-14">搜索</div>
      </div>
    </router-link>
    <div class="content">
      <router-link to="../page/user/user_shop_car"
        class="shopCarIcon"
        v-if="userId || userId!=null"
      >
        <div class="icon-shop-car"></div>
      </router-link>
      <div class="">

        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="items in swipeItems"
            >
              <img
                :src="items.image"
                alt=""
              >

            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="nav">

          <div
            class="navIcon"
            v-for="items in navItems"
            v-on:click="navPath(items.path)"
          >
            <img
              :src="items.src"
              alt=""
            >
            <span>{{items.text}}</span>
          </div>

        </div>
        <div class="activityTitle">最新活动</div>
        <!-- 商品列表的组件 -->
        <div style="overflow: hidden;">
          <productList
            v-for="items in productItems"
            :title="items.goods_name"
            :id="items.goods_id"
            :imageSrc="items.goods_image"
            v-on:my-event="productDetil"
            :price="items.goods_promotion_price"
          >
          </productList>
        </div>

      </div>
    </div>
    <myFooter :current="0"></myFooter>
  </div>
</template>
<script>
/*
    引入组件
 */

//单独引用Swiper.min.js
import Swiper from "../../../node_modules/swiper/dist/js/swiper.min.js";
import productList from "../../components/productList";
import myFooter from "../../components/footer";
export default {
  name: "m-home",
  components: {
    //组件components
    productList,
    myFooter
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      swipeItems: [],
      navItems: [
        {
          src: require("../../assets/pinpai.png"),
          id: "1",
          text: "品牌",
          path:"classify"
        },
        {
          src: require("../../assets/tuangou.png"),
          id: "2",
          text: "团购",
          path:"page/groupBuying/groupBuying"
        },
        {
          src: require("../../assets/shop.png"),
          id: "3",
          text: "店铺",
          path:""
        },
        {
          src: require("../../assets/pintuan.png"),
          id: "4",
          text: "拼团",
          path:""
        }
      ],
      //商品列表的组件
      productItems: []
    };
  },
  mounted() {
    this.loadData();
    let arr = [1,2,3,4,5,6];
    let newArr = arr.map((items,index,arr) => {
      console.log(items);
    })
  },
  methods: {
    productDetil(id) {
      // console.log(id);
      this.$router.push({
        path: "page/goods/product_details",
        query: {
          goodsId: id
        }
      });
    },
    loadData() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Index&met=index&typ=json&ua=wap&sub_site_id=0",
        {},
        function(data) {
          if (data) {
            if (data.status == 200) {
              var itemsData = data.data.data.module_data;
              itemsData.forEach(val => {
                if (val.slider_list) {
                  //图片的轮播
                  val.slider_list.item.forEach(key => {
                    _self.swipeItems.push(key);
                  });
                  return;
                }
                if (val.goods) {
                  //商品
                  var goodsItems = val.goods.item;
                  goodsItems.forEach(items => {
                    _self.productItems.push(items);
                  });
                }
              });
              _self.swiper();
            } else {
            }
          }
          // console.log(data)
        },
        function(error) {
          console.log(error);
        }
      );
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
    navPath(path){
      var _self = this;
      _self.$router.push({
        path:path
      })
    }
  }
};
</script>
<style scoped>
.content {
  background-color: #fff;
  margin-top: 88px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
.swipeIcon {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.nav {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #f7f7f7;
}
.nav .navIcon img {
  display: block;
  width: 35%;
  margin: 0 auto;
  margin-top: 10px;
}
.nav div {
  flex-grow: 1;
}
.nav span {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
}
.activityTitle {
  color: #ff6a69;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}

.search {
  position: fixed;
  top: 45px;
  width: 100%;
  background-color: #ff0036;
  z-index: 99;
}
.search .df {
  padding: 5px 10px;
}
.muisicContent {
  overflow: hidden;
}
.searchIpt {
  background-color: #fff;
  border-radius: 10px;
}
.shopCarIcon {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: #ff0036;
  border-radius: 100%;
  text-align: center;
  z-index: 999;
  font-size: 20px;
  bottom: 50px;
  right: 10px;
  opacity: 0.8;
}
.shopCarIcon .icon-shop-car {
  color: #fff;
  line-height: 40px;
}
>>>.swiper-pagination-bullet{
  width:20px;
  height:5px;
  border-radius: 15px;
}
>>>.swiper-pagination-bullet-active{
  background:#fff;
}
</style>
