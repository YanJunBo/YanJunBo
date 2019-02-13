<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loadingStatus"
    infinite-scroll-distance="0"
    infinite-scroll-immediate-check="false"
  >
    <div
      v-for="(items, index) in goodsList"
      class="goodslist"
    >
      <span class="dateTime">{{items.dateTime}}</span>
      <product-list
        v-for="(ele,key) in items.goods"
        :title="ele.common_name"
        :imageSrc="ele.common_image"
        :listType="false"
        :price="ele.common_cost_price"
        :common_evaluate="ele.common_evaluate"
        :common_salenum="ele.common_salenum"
        v-on:my-event="openProduct(ele.goods_id[0].goods_id)"
      ></product-list>
    </div>
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
      goodsDateTimes: 0,
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
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Shop&met=goodsList&order=common_sell_time&sort=desc&typ=json",
        {
          id: _self.shop_id,
          pagesize: 10,
          curpage: _self.curpage
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.items.length <= 0 && _self.curpage == 1) {
                _self.loadingStatus = true;
                return;
              }
              /**
               * ios android 都支持yyyy/MM/dd
               * ios不支持yyyy-MM-dd
               */
              if (data.data.data.items.length > 0) {
                var dateTime = 0;
                var listArr = data.data.data.items;
                listArr.forEach((val, i) => {
                  var time = _self.common.DateTime(
                    val.common_add_time.replace(/-/g, "/"),
                    "yyyy/MM/dd"
                  );
                  if (_self.goodsDateTimes != new Date(time).getTime()) {
                    //判断时间戳是否相等
                    /**
                     * 先创建不同时间的数组
                     */
                    _self.goodsDateTimes = new Date(time).getTime();
                    var obj = {
                      dateTime: _self.common.DateTime(
                        new Date(time).getTime(),
                        "yyyy/MM/dd"
                      ),
                      goods: []
                    };
                    _self.goodsList.push(obj);
                  }
                });
                //循环对应日期
                /**
                 * 根据不同时间数组循环商品
                 */
                _self.goodsList.forEach(el => {
                  
                  var dateTime = new Date(el.dateTime).getTime();
                  listArr.forEach((val, i) => {
                    var common_add_time = _self.common.DateTime(
                      val.common_add_time,
                      "yyyy/MM/dd"
                    );
                    if (dateTime == new Date(common_add_time).getTime()) {
                      //如果时间戳相等则压入对应时间的数组
                      el.goods.push(val);
                    }
                  });
                });
              } else {
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
.goodslist {
  clear: both;
}
.dateTime {
  padding: 10px;
  display: inline-block;
  color:#303030;
}
</style>
