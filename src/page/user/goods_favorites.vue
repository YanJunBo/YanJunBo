<template>
  <div>
    <mt-header
      fixed
      title="商品收藏"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>

      </div>
    </mt-header>
    <div class="content">
      <div v-if="favoritesGoods.length == 0">
        <img src="../../assets/no-data.png" alt="" srcset="" style="width:80%;margin:0 auto;display:block">
      </div>
      <div
      v-else=""
        class="list"
        v-for="(items,index) in favoritesGoods"
      >
        <mt-cell-swipe :right="[
          {
            content: '<span>取消收藏</span>',
            style: { background: 'red', color: '#fff' },
            handler: () => cancel(items.goods_id)
          }
        ]">
          <product-list
            :listType="false"
            :title="items.detail.goods_name"
            :imageSrc="items.detail.goods_image"
            :price="items.detail.goods_price"
            :common_salenum="items.detail.goods_salenum"
            :common_evaluate="items.detail.goods_evaluation_count"
          ></product-list>
        </mt-cell-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import productList from "../../components/productList";
export default {
  name: "goods_favorites",
  components: {
    "product-list": productList
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      favoritesGoods: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_Favorites&met=favoritesGoods&typ=json",
        {
          k: _self.userKey,
          u: _self.userId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.items.length > 0) {
                _self.favoritesGoods = data.data.data.items;
              }
            }
          }
        }
      );
    },
    cancel(id) {
      var _self = this;
      _self.common.openMessage("提示", "确定执行此操作吗", true, () => {
        _self.common.get(
          _self.apiUrl.shopUrl +
            "/index.php?ctl=Buyer_Favorites&met=delFavoritesGoods&typ=json",
          {
            k: _self.userKey,
            u: _self.userId,
            id: id
          },
          data => {
            if (data) {
              console.log(data);
              if (data.data.status == 200) {
                _self.favoritesGoods = _self.favoritesGoods.filter(i => {
                  return i.goods_id != id;
                });
              }
            }
          }
        );
      });
    }
  }
};
</script>

<style scoped>
>>> .mint-cell:last-child {
  background-image: none;
}
>>> .mint-cell-swipe-button {
  display: flex;
  text-align: center;
  padding: 0px 20px;
}
>>> .mint-cell-swipe-button span {
  margin: auto;
  font-size: 14px;
}
</style>
