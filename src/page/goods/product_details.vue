<template>
  <div>

    <mt-header
      fixed
      title="商品详情"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
      <mt-button
        icon="more"
        slot="right"
      ></mt-button>
    </mt-header>

    <div class="content">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="items in swipeItems"
          >
            <!-- <h4>1111</h4> -->
            <img
              :src="items.src"
              alt=""
            >

          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="productDetails">
        <div>
          <span class="product_pice">￥{{goodsDetails.goods_price}}</span>
          <span class="cuxiaojia">促销价</span>
        </div>
        <div class="fs-13 c-A2A2A2 mt-5">
          <span>价格</span>
          <del>￥{{goodsDetails.goods_market_price}}</del>
        </div>
        <div class="df fs-13 c-A2A2A2 mt-10 pb-10 porductType">
          <div class="fg-1">快递费：7.00</div>
          <div class="fg-1 tx-c">月销:{{goodsDetails.common_salenum}}</div>
          <div class="fg-1 tx-r">江苏南京</div>
        </div>
        <div class="c-303030">
          <div>
            <span class="pt_label">天猫APP精选</span>
          </div>
          <div class="product_title">{{goodsDetails.common_name}}</div>
        </div>
      </div>

      <div class="productDetails mt-10 c-ff0036">
        <div class="df fw-bold">
          <div class="icon-shop fs-20"></div>
          <div class="fs-13 ml-5">三单有礼</div>
        </div>
        <div class="c-303030 fs-13 mt-5">
          本商品参加天猫APP精选·三单有礼活动
        </div>
      </div>
      <div
        class="productDetails df mt-10 c-ff0036"
        v-on:click="show_parameter"
        style="display:none"
      >
        <div class="c-303030 fs-13 fg-2">
          产品参数
        </div>
        <div class="fg-1 c-303030 fs-13 tx-r">···</div>
      </div>
      <!-- 商品评论 -->
      <div class="productDetails mt-10">

        <div class="df">
          <div class="fs-13 fg-1">商品评论({{productsReviewsNum}})</div>
          <!-- goods_comment?shop_id=shop_id -->
          <router-link
            v-show="isComment"
            :to="{path:'goods_comment',query:{goodsId:goodsId}}"
            class="fs-13 fg-1 c-ff0036 tx-r"
          >查看更多></router-link>
        </div>
        <router-link
          to="goods_comment"
          class="products_reviews_type"
          style="display:none"
        >
          <span class="high_opinion">质量不错(64)</span>
          <span class="high_opinion">快递不错(51)</span>
          <span class="high_opinion">态度不错(50)</span>
          <span class="high_opinion">是正品(40)</span>
          <span class="high_opinion">性能好(6)</span>
          <span class="negative">物流太慢(18)</span>
        </router-link>
        <!-- 评论的列表 -->
        <div class="products_reviews_content mt-10">
          <productsReviewsList
            v-for="(items,index) in productsReviewsList"
            :nickname="items.user_name"
            :headerImg="items.user_grade_logo"
            :details="items.content"
          ></productsReviewsList>
        </div>
      </div>

      <div
        class="shopDetile"
        v-html="goodsDetails.common_detail"
      >
      </div>
      <footer class="c-fff">
        <div class="df f-ac">
          <div
            class="fg-1 c-5F646E"
            v-on:click="openShop"
          >
            <div class="icon-shop-center fs-25"></div>
            <div class="fg-1 fs-12">店铺</div>
          </div>
          <div
            id="Collection"
            class="fg-1 Collection"
            v-on:click="collection"
          >
            <div v-bind:class="{'c-ff0036':isCollection}">
              <div class="icon-collection fs-25"></div>
              <div class="fg-1 fs-12">收藏</div>
            </div>

          </div>
          <div
            class="join_shopCar fg-2"
            v-on:click="openBuyPop"
          >加入购物车</div>
          <div
            v-on:click="buying"
            class="buy fg-2"
          >立即购买</div>
        </div>

      </footer>
    </div>
    <!-- 商品参数弹出框 -->
    <popup v-model="popupVisible">
      <productList
        :listType="false"
        :title="goodsDetails.common_name"
        :common_evaluate="goodsDetails.common_evaluate"
        :common_salenum="goodsDetails.common_salenum"
        :imageSrc="goodsDetails.common_image"
        :price="goodsDetails.common_price"
      ></productList>

      <div
        class="goods_type"
        @touchmove.prevent
      >
        <scroll
          class="specContent"
          ref="specScroll"
        >
          <div>
            <div v-for="(items,index) in spec_list">
              <div class="specTitle">{{items.listName}}：</div>
              <div>
                <span
                  class="specItems"
                  ref="specItems"
                  v-for="(val,keys) in items.list"
                  v-bind:class="{specSelect:keys == items.listIdx}"
                  :data-id="val.specs_value_id"
                  v-on:click="specList(items,index,keys,val)"
                >{{val.specs_value_name}}</span>

              </div>
            </div>
          </div>

        </scroll>
      </div>
      <div class="df numbox f-ac">
        <div class="fg-1 c-5F646E fs-14">
          购买数量
        </div>
        <div class="fg-1 tx-r">
          <button
            class="minus"
            v-on:click="minus"
          >-</button>
          <span>{{shopCarNum}}</span>
          <button
            class="add"
            v-on:click="add"
          >+</button>
        </div>

      </div>
      <div
        class="confirm"
        v-on:click="addShopCar"
      >确认</div>
    </popup>
    <!-- 商品评论右侧弹出 -->

  </div>
</template>
<script>
//单独引用Swiper.min.js
import Swiper from "../../../node_modules/swiper/dist/js/swiper.min.js";
//商品详情列表的组件
import productsReviewsList from "../../components/products_reviews_list";
//商品评论的类型选择
import productReviewsType from "../../components/product_reviews_type";
import productList from "../../components/productList";
import popup from "../../components/popup";
import scroll from "../../components/scroll";
export default {
  name: "product_details",
  components: {
    productsReviewsList,
    productReviewsType,
    productList,
    scroll,
    popup
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      shop_id: "",
      goodsId: this.$route.query.goodsId,
      popupVisible: false,
      productsReviews: false,
      shopCarNum: 1,
      //控制评论列表的样式
      count: 0,
      specSelectNum: 0,
      //是否收藏的样式
      isCollection: false,
      isComment: false,
      swipeItems: [],
      goodsDetails: {},
      productsReviewsNum: 0,
      productsReviewsList: [],
      spec_list: [],
      spec_list_goodsId: {}
    };
  },
  mounted: function() {
    this.swiper();
    this.loadData("spec_list");
    this.getGoodsNewReview();
  },

  methods: {
    //获取商品的详情
    loadData(spec_list) {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl + "/index.php?ctl=Goods_Goods&met=goods&typ=json",
        {
          goods_id: _self.goodsId,
          k: _self.common.getCookie("user_key"),
          u: _self.common.getCookie("user_id")
        },
        function(data) {
          if (data) {
            if (data.status == 200) {
              var data = data.data.data;
              var obj = data.goods_info.spec_list;
              var specArr = [];
              /**
               * 商品规格
               */
              var idx = 0;
              if (spec_list) {
                _self.spec_list.splice(0);
                for (const key in obj) {
                  //规格
                  var listArr = [];
                  if (obj.hasOwnProperty(key)) {
                    for (const s in obj[key]) {
                      if (obj[key].hasOwnProperty(s)) {
                        listArr.push(obj[key][s]);
                      }
                    }
                    var list = {
                      listIdx: 0,
                      listName: key,
                      list: listArr
                    };
                    _self.spec_list.push(list);
                  }
                }
              }
              _self.goodsDetails = data.goods_info;
              //收藏字段
              _self.isCollection = data.is_favorate;
              //轮播
              _self.swipeItems.splice(0);
              var goodsImage = [];
              if (data.goods_image || data.goods_image != "") {
                goodsImage = data.goods_image.split(",");
              }
              goodsImage.forEach(val => {
                var obj = {
                  src: val
                };
                _self.swipeItems.push(obj);
              });
              _self.shop_id = _self.goodsDetails.shop_id;
              _self.spec_list_goodsId = data.spec_list;
            }
          }
        },
        function(error) {}
      );
    },
    getGoodsNewReview() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Goods_Goods&met=getGoodsNewReview&typ=json&sort=scores",
        {
          goods_id: _self.goodsId
        },
        function(data) {
          if (data) {
            if (data.status == 200) {
              _self.productsReviewsList.splice(0);
              var items = data.data.data.goods_review_rows;
              _self.productsReviewsNum = data.data.data.num;
              if (data.data.data.num == 0) {
                _self.isComment = false;
              }
              if (items.length > 0) {
                _self.isComment = true;
                items.forEach(key => {
                  _self.productsReviewsList.push(key);
                });
              } else {
              }
            } else {
            }
          }
        }
      );
    },
    swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        autoplay: true, //可选选项，自动滑动
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        }
      });
    },
    show_parameter() {
      this.popupVisible = true;
    },
    show_productsReviews() {
      var _self = this;
      if (_self.productsReviews) {
        _self.productsReviews = false;
      } else {
        _self.productsReviews = true;
      }
    },
    collection() {
      //收藏的事件
      if (this.isCollection) {
        this.delFavoritesGoods();
      } else {
        this.collectGoods();
      }
    },
    openBuyPop() {
      //加入购物车
      var _self = this;
      _self.popupVisible = !_self.popupVisible;

      var userId = _self.common.getCookie("user_id");
      if (!userId || userId == "") {
        _self.$router.push({
          path: "../user/login"
        });
        return;
      }
    },
    specList(items, index, keys, val) {
      //选择规格的事件
      var _self = this;
      items.listIdx = keys;

      /**
       * 在选择规格中都需要获取规格ID
       */
      var specIdArr = [];
      for (let i = 0; i < _self.spec_list.length; i++) {
        //循环规格_self.spec_list
        const element = _self.spec_list[i];
        //_self.spec_list[i].listIdx代表选择子规格的标注
        let idx = _self.spec_list[i].listIdx;
        //element.list[idx].specs_value_id 子规格的Id 使用set方法赋值给_self.spec_list.ids
        // _self.$set(element, "ids", element.list[idx].specs_value_id);
        specIdArr.push(element.list[idx].specs_value_id);
      }
      specIdArr = specIdArr.join("|");
      _self.goodsId = _self.spec_list_goodsId[specIdArr];
      _self.loadData();
    },
    addShopCar() {
      var _self = this;
      _self.common.post(
        _self.apiUrl.shopUrl + "/index.php?ctl=Buyer_Cart&met=addCart&typ=json",
        {
          k: _self.common.getCookie("user_key"),
          u: _self.common.getCookie("user_id"),
          goods_id: _self.goodsId,
          goods_num: _self.shopCarNum
        },
        function(data) {
          if (data) {
            if (data.data.status == 200) {
              _self.common.openToast("加入成功", "", "", "icon-shop-car");
            } else {
              _self.common.openAlert("加入失败");
            }
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    collectGoods() {
      //收藏的接口
      var _self = this;
      _self.common.post(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Goods_Goods&met=collectGoods&typ=json",
        {
          k: _self.userKey,
          u: _self.userId,
          goods_id: _self.goodsId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              _self.common.openToast(data.data.data.msg);
              _self.isCollection = true;
            }
          }
        }
      );
    },
    delFavoritesGoods() {
      var _self = this;
      //http://mall.jscntech.com//index.php?ctl=Buyer_Favorites&met=delFavoritesGoods&typ=json
      _self.common.post(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_Favorites&met=delFavoritesGoods&typ=json",
        {
          k: _self.userKey,
          u: _self.userId,
          id: _self.goodsId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              _self.common.openToast("取消成功！");

              _self.isCollection = false;
            }
          }
        }
      );
    },
    minus() {
      var _self = this;
      if (_self.shopCarNum == 0) {
        return;
      }
      _self.shopCarNum--;
    },
    add() {
      var _self = this;
      _self.shopCarNum++;
    },
    openShop() {
      //打开店铺详情
      var _self = this;
      this.$router.push({
        path: "../shop/shop_details",
        query: {
          shopId: _self.shop_id
        }
      });
    },
    buying() {
      var _self = this;
      if (!_self.userId || _self.userId == "") {
        _self.$router.push({
          path: "../user/login",
          query: {
           
          }
        });
        return;
      }
      _self.$router.push({
        path: "confirm_order",
        query: {
          goodsId: _self.goodsId,
          shopId: _self.shop_id
        }
      });
    }
  }
};
</script>
<style scoped>
/* 单独引用Swiper.min.css */
@import url("../../../node_modules/swiper/dist/css/swiper.min.css");
>>> .transverse .goods_pic {
  width: 20% !important;
}
>>> .shopDetile img {
  width: 100% !important;
}
.mint-header.is-fixed {
  z-index: 2;
}
.content {
  margin: 45px 0px 50px 0px;
}
.swiper-slide img {
  width: 100%;
}
.swiper-container-horizontal > .swiper-pagination-bullets[data-v-d81c94aa],
.swiper-pagination-custom[data-v-d81c94aa],
.swiper-pagination-fraction[data-v-d81c94aa] {
  font-weight: bold;
  color: #ff0036;
  font-size: 15px;
}
>>> .swiper-pagination-bullet-active {
  background: #ff0036 !important;
}
.productDetails {
  padding: 10px;
  background-color: #fff;
}
.product_pice {
  color: #ff0036;
  font-size: 18px;
  font-weight: 600;
}
.cuxiaojia {
  font-size: 10px;
  margin-left: 5px;
  color: #a2a2a2;
  background-color: #ebebeb;
}
.porductType {
  border-bottom: 1px solid #e6e6e6;
}
.product_title {
  font-size: 15px;
  line-height: 20px;
}
.pt_label {
  font-size: 10px;
  display: inline-block;
  padding: 0px 6px;
  margin: 8px 0px;
  background-color: #ff0036;
  color: #fff;
}
.buy {
  background-color: #ff0036;
  padding: 12px 0px;
}
.join_shopCar {
  background-color: #ff9600;
  padding: 12px 0px;
}
footer {
  position: fixed;
  width: 100%;
  bottom: 0px;
}
footer div {
  text-align: center;
  background-color: #fff;
}
.Collection {
  color: #5f646e;
}
.parameter {
  width: 100%;
  padding: 5px;
  font-size: 13px;
}
.parameterType {
  border-top: 1px solid #f4f4f4;
  padding: 15px 0px;
}
.parameter_title {
  width: 25%;
  color: #a2a2a2;
}
.parameter_Detalis {
  width: 75%;
  color: #a2a2a2;
}
.products_reviews_type {
  text-decoration: none;
}

.products_reviews_type span {
  display: inline-block;
  font-size: 11px;
  color: #666;
  padding: 8px;
  margin-top: 5px;
  border-radius: 10px;
}
/* 好评 */
.high_opinion {
  background-color: #fee;
}
/* 差评 */
.negative {
  background-color: #f5f5f5;
}
.goods_type {
  padding: 10px;
}
.specTitle {
  font-size: 14px;
  color: #303030;
}
.specItems {
  font-size: 13px;
  padding: 5px 10px;
  display: inline-block;
  margin: 5px;
  color: #303030;
  border-radius: 10px;
  border: 1px solid #303030;
}
.specSelect {
  background-color: #ff0036;
  border: 1px solid #ff0036;
  color: #fff;
}
.specContent {
  max-height: 200px;
  position: relative;
  overflow: hidden;
}
.confirm {
  width: 100%;
  text-align: center;
  background-color: #ff9600;
  color: #fff;
  padding: 15px 0px;
}
.numbox {
  padding: 10px;
}
.numbox span {
  font-size: 13px;
}
.numbox button {
  background-color: #fff;
  border: 1px solid #a2a2a2;
  border-radius: 5px;
}
.minus {
  padding: 3px 10px;
}
.add {
  padding: 3px 8px;
}
.numbox span {
  padding: 0px 10px;
}
</style>
