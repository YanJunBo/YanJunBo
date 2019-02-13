<template>
  <div
    class="goods-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loadingStatus"
    infinite-scroll-distance="0"
    infinite-scroll-immediate-check="false"
  >
    <product-list
      v-for="(items,index) in goodsList"
      :title="items.common_name"
      :imageSrc="items.common_image"
      :price="items.common_cost_price"
      v-on:my-event="openProduct(items.goods_id[0].goods_id)"
    ></product-list>
  </div>
</template>

<script>
import productList from "../../../components/productList";
export default {
  name: "shop_product",
  components: {
    "product-list": productList
  },
  data() {
    return {
      loadingStatus: true,
      shop_id: this.$route.query.shopId,
      curpage: 1,
      goodsList: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadMore() {
      var _self = this;
      _self.curpage += 1;
      _self.loadData();
    },
    loadData() {
      var _self = this;
      _self.loadingStatus = false;
      _self.common.get(
        _self.apiUrl.shopUrl + "/index.php?ctl=Shop&met=goodsList&typ=json",
        {
          shop_id: _self.shop_id,
          id: _self.shop_id,
          pagesize: 10,
          curpage: _self.curpage,
          firstRow: 0
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.items.length <= 0 && _self.curpage == 1) {
                _self.loadingStatus = true;
                return;
              }
              if (data.data.data.items.length > 0) {
                var listArr = data.data.data.items;
                listArr.forEach(val => {
                  _self.goodsList.push(val);
                });
              }else{
                _self.loadingStatus = true;
              }
            } else {
              
            }
          }
        }
      );
    },
    openProduct(id) {
      var _self = this;
      _self.$router.push({
        path: "../goods/product_details",
        query: {
          goodsId: id
        }
      });
    }
  }
};
</script>

<style scoped>
.goods-list {
  overflow: hidden;
}
</style>
