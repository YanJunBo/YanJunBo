<template>
  <div>
    <div
      class="fixed"
      style="width:100%;top:0px;z-index:9"
    >
      <div class="df f-ac bc-ff0036">
        <div
          v-on:click="$router.back();"
          class="mintui mintui-back c-fff ml-10"
        ></div>
        <div class="fg-3 p-5">
          <input
            type="text"
            class="search_ipt"
            :placeholder="placeholder"
            v-model="_self.keyWordsStr"
            @focus="pageBack"
          >
        </div>
        <div class="fg-1 search_txt">
          <div>搜索</div>
        </div>

      </div>
      <div
        class="df df-ac tx-c bc-fff goodsType"
        v-show="goodsDataContent"
      >

        <!-- <div class="tabItems" v-on:click="goodsTypeStatus =! goodsTypeStatus">{{goodsTypeText}}<span class="icon-donw"></span></div> -->
        <div
          class="tabItems"
          v-for="(items,index) in tabItems"
          v-bind:class="{'c-ff0036': tabItemsSelected == index }"
          v-html="items.name"
          v-on:click="tabItemsFn(index,items)"
        ></div>

        <div
          v-if="goodsTypeStatus"
          class="tx-l drop-down"
        >
          <div
            class="df drop-down-items"
            v-bind:class="{'c-ff0036': typeCurretn == index }"
            v-for="(items,index) in goodsTypeList"
            v-on:click="changeType(index,items)"
          >
            <div class="fg-2">{{items.name}}</div>
            <div class="fg-1 tx-r"><span
                v-if="typeCurretn == index"
                class="icon-select"
              ></span></div>
          </div>
        </div>

      </div>
    </div>
    <div class="content"> 
      <noData v-show="noDataContent">
        <img
          :src="noDataImage"
          alt=""
          srcset=""
        >
        <p class="tx-c fs-15 c-5F646E mt-5">没有该商品哦</p>
      </noData>

      <div
        class="goods-list"
        v-show="goodsDataContent"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadingStatus"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false"
      >
        <mask-content v-if="goodsTypeStatus"></mask-content>
        <productList
          v-for="(items,index) in goodsData"
          :listType="goodsListType"   
          :title="items.common_name"
          :id="items.good[0].goods_id"
          :common_evaluate="items.common_evaluate"
          :common_salenum="items.common_salenum"
          :imageSrc="items.common_image"
          :price="items.common_price"
          v-on:my-event="goodsDetails(items.good[0].goods_id)"
        >
        </productList>
      </div>
    </div>
    <!-- <loading-data-text></loading-data-text> -->
  </div>

</template>
<script>
import productList from "../../components/productList";
import noData from "../../components/noData";
import loadingDataText from "../../components/loadingDataText";
import mask from "../../components/mask";
export default {
  name: "goodsSearch",
  components: {
    productList: productList,
    noData: noData,
    "loading-data-text": loadingDataText,
    "mask-content": mask
  },
  data() {
    return {
      loadingStatus: true,
      goodsTypeStatus: false,
      inputData: "",
      placeholder: "",
      keyWordsStr: "",
      goodsDataContent: false,
      noDataImage: require("../../assets/no-data.png"),
      noDataContent: false,
      curpage: 1,
      keyWordsList: [],
      goodsData: [],
      typeCurretn: 0,
      //列表排序
      listSearchType: {},
      tabItemsSelected: 0,
      goodsListType: true,
      tabItems: [
        {
          name: '上架时间<span class="icon-donw"></span>',
          type: {
            act: ""
          }
        },
        {
          name: "销量",
          type: {
            act: "sale"
          }
        },
        {
          name: '<span class="icon-browse-list"></span>',
          type: {
            act: ""
          }
        },
        {
          name: "筛选",
          type: {
            act: ""
          }
        }
      ],
      goodsTypeList: [
        {
          name: "上架时间",
          type: {
            actorder: "",
            act: ""
          }
        },
        {
          name: "评价排序",
          type: {
            actorder: "DESC",
            act: "evaluate"
          }
        },
        {
          name: "价格从高到低",
          type: {
            actorder: "DESC",
            act: "price"
          }
        },
        {
          name: "价格从低到高",
          type: {
            actorder: "ASC",
            act: "price"
          }
        }
      ]
    };
  },
  mounted: function() {
    this.goodsListData();
  },
  methods: { 
    loadMore() {
      //下拉加载的滚动 加载方法
      var _self = this;
      _self.curpage += 1;
      _self.goodsListData();
    },
    changeType(idx, items) {
      var _self = this;
      //下拉框的选择
      _self.typeCurretn = idx;
      _self.tabItems[0].name = items.name + '<span class="icon-donw"></span>';
      _self.listSearchType = items.type;
      _self.goodsData.splice(0);
      _self.goodsTypeStatus = !_self.goodsTypeStatus;
      _self.curpage = 1;
      _self.goodsListData();
    },
    goodsDetails(id) {
      this.$router.push({
        path: "product_details",
        query: {
          goodsId: id
        }
      });
    },
    goodsListData() {
      var _self = this;
      _self.loadingStatus = false;
      _self.loading = false;
      _self.keyWordsStr = _self.$route.query.keyWords;
      _self.shopId = _self.$route.query.shopId;
      _self.cat_id = _self.$route.query.cat_id;
      var ctlType = "Shop"; //商品内搜索商品
      if (!_self.shopId || _self.shopId == "") {
        ctlType = "Goods_Goods";
      }
      _self.common.get(
        _self.apiUrl.shopUrl +
          ///index.php?ctl=Shop&met=goodsList&typ=json&shop_id=32&keyword=111&pagesize=10&curpage=1&firstRow=0&id=32&search=111
          "/index.php?met=goodslist&typ=json&ua=wap&sub_site_id=0",
        {
          ctl: ctlType,
          met: "goodslist",
          shop_id: _self.shopId,
          id: _self.shopId,
          keyword: _self.keyWordsStr,
          keywords: _self.keyWordsStr,
          pagesize: 10,
          actorder: _self.listSearchType.actorder,
          act: _self.listSearchType.act,
          curpage: _self.curpage,
          firstRow: 0,
          cat_id: _self.cat_id,
          search: _self.keyWordsStr
        },
        function(data) {
          if (data) {
            if (data.status == 200) {
              if (_self.curpage == 1 && data.data.data.items.length == 0) {
                _self.goodsDataContent = false;
                _self.noDataContent = true;
                return;
              }
              if (data.data.data.items.length > 0) {
                _self.goodsDataContent = true;
                _self.noDataContent = false;
                var list = data.data.data.items;
                list.forEach(val => {
                  _self.goodsData.push(val);
                });
              } else {
                _self.loadingStatus = true;
              }
            }
          }
        },
        function(error) {}
      );
    },
    tabItemsFn: function(idx, items) {
      var _self = this;
      if (idx == 0) {
        //上架时间的按钮
        //显示下拉框
        _self.goodsTypeStatus = !_self.goodsTypeStatus;
      } else if (idx == 1) {
        //销量方法
        _self.listSearchType = items.type;
        _self.goodsData.splice(0);
        _self.curpage = 1;
        _self.goodsListData();
      } else if (idx == 2) {
        //商品列表的显示样式
        _self.goodsListType = !_self.goodsListType;
      }
      _self.tabItemsSelected = idx;
      if (idx != 0) {
        _self.goodsTypeStatus = false;
      }
    },
    pageBack() {
      var _self = this;
      if (_self.cat_id) {
        
        _self.$router.push({
          path:"goods_search",
          query:{
            type:"cat_id"
          }
        })
      } else {
        _self.$router.back();
      }
    }
  }
};
</script>
<style scoped>
.content {
  margin-bottom: 10px;
}
.goods-list {
  overflow: hidden;
  padding-top: 45px;
}
.mint-search {
  height: auto !important;
}
.search_ipt {
  width: 100%;
  border: none;
  padding: 8px 0px 8px 10px;
  border-radius: 10px;
}
.search_txt {
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding-right: 5px;
}
.goodsType {
  position: relative;
  padding: 12px;
}
.drop-down {
  position: absolute;
  bottom: -180px;
  left: 0px;
  width: 100%;
  background-color: #fff;
}
.drop-down-items {
  padding: 15px;
  font-size: 13px;
}
.goodsType .tabItems {
  flex-grow: 1;
  font-size: 12px;
}
.icon-browse-list {
  font-size: 18px;
}
.icon-donw {
  font-size: 13px;
  color: #303030;
  margin-left: 3px;
}
.icon-up {
  font-size: 13px;
  color: #303030;
  margin-left: 3px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

