<template>
  <div>
    <mt-header
      fixed
      title="足迹"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
      <div slot="right">
        <mt-button v-on:click="deleteFooter">清空</mt-button>
      </div>
    </mt-header>
    <div class="content">
      <div v-if="footerGoods.length == 0">
        <img
          src="../../assets/no-data.png"
          alt=""
          srcset=""
          style="width:80%;margin:0 auto;display:block"
        >
      </div>
      <div
        v-else=""
        class="footer-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadingStatus"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false"
      >
        <div
          class="list"
          v-for="(items,index) in footerGoods"
        >
          <product-list
            :listType="false"
            :title="items.common_name"
            :imageSrc="items.common_image"
            :price="items.common_cost_price"
            v-on:my-event="goodsDetails(items.goods_id)"
          ></product-list>
        </div>
         <loading-data-text v-show="loadingText"></loading-data-text>
      </div>
     
    </div>
  </div>
</template>

<script>
//k=VyUDdg9rDyAJUlBrUDVTYQMxUWZXOlY1BmU%3D&u=10806&curpage=1&page=10
import productList from "../../components/productList";
import loadingDataText from "../../components/loadingDataText";
export default {
  name: "footerprint",
  components: {
    "product-list": productList,
    "loading-data-text":loadingDataText
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      curpage: 1,
      footerGoods: [],
      loadingStatus: true,
      loadingText:false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      var _self = this;

      _self.loadingStatus = false;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_Favorites&met=footprintwap&typ=json",
        {
          k: _self.userKey,
          u: _self.userId,
          curpage: _self.curpage,
          page: 10
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.arr.items.length > 0) {
                data.data.data.arr.items.forEach(element => {
                  _self.footerGoods.push(element);
                });
              } else {
                _self.loadingStatus = true;
                _self.loadingText = true;
              }
            }
          }
        }
      );
    },
    loadMore() {
       var _self = this;
      _self.curpage += 1;
      _self.loadData();
    },
    deleteFooter() {
      var _self = this;
      if (_self.footerGoods.length == 0) {
        return;
      }
      _self.common.post(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_Favorites&met=delFootPrint&typ=json",
        {
          k: _self.userKey,
          u: _self.userId
        },
        data => {
          if (data) {
            if (data.status == 200) {
              _self.footerGoods.splice(0);
              _self.loadData();
            }
          }
        }
      );
    },
    goodsDetails(id) {
      this.$router.push({
        path: "../goods/product_details",
        query: {
          goodsId: id
        }
      });
    },
  }
};
</script>

<style scoped>
.footer-list {
  overflow: hidden;
}
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
.content {
  margin-bottom: 0px;
}
</style>
