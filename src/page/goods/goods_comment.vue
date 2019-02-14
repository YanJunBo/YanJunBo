<template>
  <div class="bc-fff">
    <mt-header
      fixed
      title="商品评论"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>

    </mt-header>
    <div>

      <div
        class="products_reviews_content p-10"
        style="margin-top:46px;"
      >
        <!-- 商品评论的类型选择 -->
        <div class="products_reviews_type">
          <productReviewsType
            v-for="(items,index) in productReviewsTypeData"
            :num="count"
            :index="index"
            :typeStr="items.typeName"
            :type="items.type"
            v-on:type-product="activeProductType(index,items)"
          ></productReviewsType>
        </div>
        <!-- 商品评论右侧弹出:评论列表 -->
        <no-data v-show="noData">
          <img
            :src="noDataImage"
            alt=""
            srcset=""
          >
          <p>没有任何评论哦~</p>
        </no-data>
        <div
          class=""
          v-show="isList"
          style="overflow:hidden"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100"
          v-infinite-scroll="loadMore"
          infinite-scroll-immediate-check="ture"
        >
          <productsReviewsList
            v-for="(items,index) in productsReviewsList"
            :nickname="items.member_name"
            :headerImg="items.user_logo"
            :details="items.content"
            :imgArr="items.image_row"
            :photoIndex="index"
            :data-type="items.type"
          >
          </productsReviewsList>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
//商品详情列表的组件
import productsReviewsList from "../../components/products_reviews_list";
//商品评论的类型选择
import productReviewsType from "../../components/product_reviews_type";
import noData from "../../components/noData";
export default {
  name: "goods_comment",
  components: {
    productsReviewsList: productsReviewsList,
    productReviewsType: productReviewsType,
    "no-data": noData
  },
  data() {
    return {
      count: 0,
      curpage: 1,
      loading: true,
      isList: true,
      noData: false,
      noDataImage: require("../../assets/no_comment.png"),
      productsReviewsList: [],
      productReviewsTypeData: [
        {
          typeName: "全部",
          type: ""
        },
        {
          typeName: "好评",
          type: "1"
        },
        {
          typeName: "中评",
          type: "2"
        },
        {
          typeName: "差评",
          type: "3"
        },
        {
          typeName: "带图评价",
          type: "4"
        }
      ]
    };
  },
  mounted() {
    this.getGoodsEvaluationList();
  },
  methods: {
    //
    loadMore() {
      var _self = this;
      _self.curpage += 1;
      _self.getGoodsEvaluationList();
    },
    getGoodsEvaluationList() {
      /**获取商品评论列表 */
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Goods_Goods&met=getGoodsEvaluationList&typ=json&sou=wap",
        {
          goods_id: _self.$route.query.goodsId,
          type: _self.evaluationType,
          curpage: _self.curpage,
          page: 10
        },
        function(data) {
          if (data) {
            if (data.status == 200) {
              _self.$previewRefresh();
              _self.loading = false;
              if (data.data.data.items.length <= 0 && _self.curpage == 1) {
                _self.noData = true;
                _self.loading = true;
                return;
              }
              if (data.data.data.items.length > 0) {
                var items = data.data.data.items;
                _self.noData = false;
                _self.isList = true;
                items.forEach(val => {
                  val.forEach(el => {
                    _self.productsReviewsList.push(el);
                  });
                });
              } else {
                _self.loading = true;
                return;
              }
            } else {
            }
          }
        }
      );
    },
    activeProductType(index, items) {
      var _self = this;
      this.count = index;
      _self.evaluationType = items.type;
      _self.productsReviewsList.splice(0);
      _self.getGoodsEvaluationList();
    }
  }
};
</script>
<style scoped>
body,
html {
  background-color: #fff !important;
}
</style>
