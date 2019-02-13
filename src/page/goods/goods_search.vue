<template>
  <div>
    <div
      class="fixed"
      style="width:100%;top:0px;z-index:9"
    >
      <div class="df f-ac bc-ff0036">
        <div
          v-on:click="pageBack"
          class="mintui mintui-back c-fff ml-10"
        ></div>
        <div class="fg-3 p-5">
          <input
            type="text"
            class="search_ipt"
            :placeholder="placeholder"
            v-model="inputData"
            @focus="openKeyWords"
          >
        </div>
        <div
          class="fg-1 search_txt"
          v-on:click="openList(inputData)"
        >
          <div>搜索</div>
        </div>
      </div>

    </div>
    <div class="content">

      <div
        class="keyWordContent p-5 bc-fff"
        v-show="keyWordsContent"
      >
        <div class="fs-16 p-10"> 热门搜索</div>
        <keyWords
          v-for="(items,index) in keyWordsList"
          :keyWords="items"
          v-on:key-words="openList(items)"
        ></keyWords>
      </div>
    </div>
  </div>

</template>
<script>
import keyWords from "../../components/keyWords";
export default {
  name: "goodsSearch",
  components: {
    keyWords: keyWords
  },
  data() {
    return {
      inputData: "",
      placeholder: "",
      keyWordsStr: "",
      keyWordsContent: true,
      keyWordsList: []
      //列表排序  
    };
  },
  mounted: function() {
    this.keyWordsData();
  }, 
  methods: {
    openKeyWords() {
      var _self = this;
      if (_self.keyWordsContent) {
        return;
      }
      _self.goodsData.splice(0);
      _self.curpage = 1;
      _self.keyWordsContent = true;
      _self.goodsDataContent = false;
      _self.loadingStatus = true;
    },
    keyWordsData() {
      //关键词 接口
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "index.php?ctl=Index&met=getSearchKeyList&typ=json",
        {},   
        function(data) {
          if (data) {
            if (data.status == 200) {
              var res = data.data.data; 
              _self.placeholder = res.default_list;
              res.list.forEach(items => {
                _self.keyWordsList.push(items);
              });
            }
          }
        },
        function(error) {}
      );
    },
    openList(items) {
      var _self = this;
      if (!items || items == "") {
        items = _self.placeholder;
      }
      _self.$router.push({  
        path: "goods_list",
        query: {
          keyWords: items
        }
      }); 
    },
    pageBack() { 
      var _self = this;
      if (_self.$route.query.type) {
        _self.$router.push({
          path: "../../classify"
        });
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
.keyWordContent span {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
  font-size: 13px;
  color: #303030;
  background-color: #fff;
  border: 1px solid #e2e2e2;
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
</style>

