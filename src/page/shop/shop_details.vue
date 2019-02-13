<template>
  <div>
    <div class="df f-ac shopSearch fixed">
      <div
        v-on:click="$router.back()"
        class="mintui mintui-back c-fff ml-10"
      ></div>
      <div class="fg-3 p-5">
        <input
          type="text"
          class="search_ipt"
          v-model="inputData.keywords"
          placeholder="在店铺中搜索"
        >
      </div>
      <div
        class="search_txt"
        v-on:click="search"
      >
        <div>搜索</div>
      </div>
    </div>
    <div class="content">
      <div class="shopInfo df">
        <div
          class="shopbc" ref="shopbc"
          v-bind:style="{backgroundImage:'url('+shopBcImg+')'}"
        >
        </div>
        <div class="shopInfoContent df">
          <div class="shopLog">
            <img
              :src="store_info.store_avatar"
              alt=""
            >
          </div>
          <div class="shopName fg-1">{{store_info.store_name}}</div>
        </div>

      </div>

      <div
        class="df tx-c shopNav"
        v-bind:class="{shopNavFixed:Fixed}"
      >
        <div
          class="fg-1"
          v-for="(items,index) in shopNavArr"
          v-bind:class="{'shopIconActive':cruent == index}"
          v-on:click="shopNav(index,items.pageName)"
          :id="index+1"
        >
          <div
            class="shopIcon"
            v-bind:class="items.className"
          ></div>
          <div class="shopNavText">{{items.test}}</div>
        </div>
      </div>
      <!-- <shop-index></shop-index> -->
      <keep-alive>
        <component v-bind:is="page"></component>
      </keep-alive>
    </div>

  </div>
</template>
<script>
import shopIndex from "./shopNavbar/shop_index"
import shopProduct from "./shopNavbar/shop_product"
import shopNew from "./shopNavbar/shop_new"
import shopActivity from "./shopNavbar/shop_activity"
export default {
  name: "shop_details",
  components:{
      "shop-index":shopIndex,
      "shop-product":shopProduct,
      "shop-new":shopNew,
      "shop-activity":shopActivity
      
  },
  data() {
    return {
      cruent: 0,
      shop_id: "",
      store_info: {},
      Fixed:false,
      page: "shop-index",
      topHeight:0,
      inputData: {
        keywords: ""
      },
      shopNavArr: [
        {
          className: "icon-shopIcon",
          pageName:"shop-index",
          test: "首页"
        },
        {
          className: "icon-goodsIcon",
          pageName:"shop-product",
          test: "商品"
        },
        {
          className: "icon-upnewIcon",
          pageName:"shop-new",
          test: "上新"
        },
        {
          className: "icon-activeIcon",
          pageName:"shop-activity",
          test: "活动"
        }
      ],
      shopBcImg: ""
    };
  },
  mounted() {
      
    window.addEventListener("scroll", this.handleScroll);//滚动条监听时间handleScroll
    this.topHeight = this.$refs.shopbc.offsetHeight;
    this.loadData();
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
            }
          }
        },
        function(error) {}
      );
    },
    shopNav(index,page) {
      var _self = this;
      _self.cruent = index;
      _self.page = page;
    },
    handleScroll() {
      //滚动条监听时间handleScroll
      var _self = this;
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if(scrollTop >= _self.topHeight ){
         _self.Fixed = true;
      }else{
          _self.Fixed = false;
      }
    },
    search(){
      var _self = this;
      _self.$router.push({
        path:"../goods/goods_list",
        query:{
          keyWords:_self.inputData.keywords,
          shopId:_self.shop_id
        }
      });
    }
  }
};
</script>
<style scoped>
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
.shopNavFixed{
    position: fixed;
    width:100%;
    top:40px;
    z-index: 99;
}
</style>

