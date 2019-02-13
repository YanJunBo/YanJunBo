<template>
  <div>
    <mt-header
      fixed
      title="分类"
    ></mt-header>
    <div style="margin-top:45px;"></div>
    <div class="content">
      <m-scroll
        class="wrapper-parent"
        ref="wrapperParent"
      >
        <div>
          <classify-parent
            v-for="(items,index) in classify_parentItems"
            :name="items.name"
            :imgSrc="items.cat_pic"
            v-on:parent-list="parentList(index,items.cat_id,$event)"
            :index="index"
            :current="current"
            ref="parentClassifyList"
          ></classify-parent>
        </div>

      </m-scroll>
      <m-scroll
        class="wrapper-children"
        ref="wrapperChildren"
      >
        <div>
          <classify-children
            v-for="(item,index) in classify_childrenItems"
            :carName="item.cat_name"
            :childList="item.child"
            v-on:children-title="childrenList(item.cat_id)"
            v-on:children-list="childrenList"
          ></classify-children>
        </div>
      </m-scroll>

    </div>
    <myFooter :current="1"></myFooter>
  </div>
</template>

<script>
import myFooter from "../../components/footer";
import classifyParent from "../../components/classify_parent";
import classifyChildren from "../../components/classify_children";
import scroll from "../../components/scroll";
//http://mall.jscntech.com//index.php?ctl=Goods_Brand&met=lists&typ=json
//http://mall.jscntech.com//index.php?ctl=Goods_Cat&met=tree&typ=json&cat_parent_id=95
export default {
  name: "order",
  components: {
    myFooter: myFooter,
    "classify-parent": classifyParent,
    "classify-children": classifyChildren,
    "m-scroll": scroll
  },
  data() {
    return {
      wrapperParent: "wrapperParent",
      current: 0,
      classify_parentItems: [],
      classify_childrenItems: []
    };
  },
  created() {},
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Goods_Cat&met=cat&typ=json&cat_parent_id=0",
        {},
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.items.length > 0) {
                var items = data.data.data.items;
                items.forEach(val => {
                  _self.classify_parentItems.push(val);
                });
                _self.getChildrenClassify(items[0].cat_id);
              }
            }
          }
        }
      );
    },
    getChildrenClassify(catId) {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl + "/index.php?ctl=Goods_Cat&met=tree&typ=json",
        {
          cat_parent_id: catId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (_self.classify_childrenItems.length > 0) {
                _self.$refs.wrapperChildren.scrollTo(0, 0, 0);
                _self.classify_childrenItems.splice(0);
              }
              if (data.data.data.items.length > 0) {
                var items = data.data.data.items;
                _self.classify_childrenItems = items;
              }
            }
          }
        }
      );
    },
    parentList(index, catId, e) {
      //点击父分类-获取子分类
      var _self = this;
      var elem = e.currentTarget;
      _self.current = index;
      _self.$refs.wrapperParent.scrollToElement(elem, 500);
      _self.getChildrenClassify(catId);
    },
    childrenList(cat_id){
      var _self = this;
      _self.$router.push({
        path:"page/goods/goods_list",
        query:{
          cat_id:cat_id
        }
      })
    }
  }
};
</script>

<style scoped>
.content {
  position: fixed;
  width: 100%;
  top: 45px;
  left: 0px;
  bottom: -15px;
  margin-top: 0px;
}
.wrapper-parent {
  float: left;
  height: 100%;
  width: 25%;
  overflow: hidden;
}
.wrapper-children {
  float: left;
  background-color: #fff;
  height: 100%;
  width: 75%;
  overflow: hidden;
}
</style>
