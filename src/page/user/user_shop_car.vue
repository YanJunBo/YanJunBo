<template>
  <div>
    <mt-header
      fixed
      title="购物车"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>

      </div>
      <div
        v-on:click="adminList"
        slot="right"
      >
        <span>管理</span>

      </div>
    </mt-header>

    <div class="content">
      <div
        class="noCarList"
        v-if="shopCar.length == 0"
      >
        <img
          src="../../assets/noCarList.png"
          alt=""
        >
        <div class="tx-c fs-14 pt-10 c-5F646E">购物车空空如也</div>

      </div>
      <div
        v-else=""
        class="UserShopCar"
      >

        <div
          class="carList"
          v-for="(items,index) in shopCar"
          v-if="items.goods.length>0"
        >
          <div class="shopDetile df f-ac">
            <div class="p-r-10">

              <input
                type="checkbox"
                name=""
                :id="items.shop_id"
                :value="items"
                @change="shopListChange($event,items)"
                v-model="shopChecked"
              >
              <label :for="items.shop_id"></label></div>
            <div class="icon-shop-center"></div>
            <div class="shopName">{{items.shop_name}}</div>
          </div>
          <div
            class="goodsList df f-ac"
            v-for="(val,key) in items.goods"
            :data-id="val.cart_id"
          >
            <mt-cell-swipe :right="[
              {
                content: '<span>删除</span>',
                style: { background: '#ff0036', color: '#fff'},
                handler: function($event){delCarList(val.cart_id)}
              }
            ]">
              <div class="p-r-10"><input
                  type="checkbox"
                  name=""
                  :id="val.goods_base.goods_id"
                  :value="val"
                  v-model="checkedVal"
                  @change="getListVal(items)"
                > <label :for="val.goods_base.goods_id"></label></div>

              <div class="goodsImage">
                <img
                  :src="val.goods_base.goods_image"
                  alt=""
                >
              </div>
              <div class="goodsDetails">
                <div class="goodsTitle">{{val.goods_base.goods_name}}</div>
                <div class="spec_val_str">{{val.goods_base.spec_val_str}}</div>
                <div class="pt-10 df f-ac">
                  <div class="price">￥{{val.goods_base.goods_price}}</div>
                  <div class="tx-r">
                    <numbox
                      :number="val.goods_num = Number(val.goods_num)"
                      v-on:add="numAdd(val)"
                      v-on:minus="numMinus(val)"
                    ></numbox>
                  </div>
                </div>
              </div>
            </mt-cell-swipe>
          </div>
        </div>

      </div>
    </div>
    <div
      class="footer"
      v-if="shopCar.length > 0"
    >
      <div class="footerItmes df f-ac">

        <div class="df fg-2">
          <div>
            <input
              id="all"
              type="checkbox"
              name=""
              style="width:100%;"
              :checked="goodsLength == checkedVal.length"
              @change="checkedAllList($event)"
            >
            <label for="all"></label>
          </div>
          <div class="fs-14 ml-5">全选</div>
        </div>
        <div
          v-if="!adminDel"
          class="df fg-1 "
        >
          <div class="df f-ac fg-1 c-ff0036 fs-15 fw-bold">合计：<div class="fs-11">￥</div>
            <div class="fs-16">{{sumprice}}</div>
          </div>
          <div
            class="settlement tx-c fg-1"
            v-on:click=""
          >结算</div>
        </div>
        <div
          v-else=""
          class="delAll"
          v-on:click="deleteAll"
        >删除</div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../../components/numbox";
export default {
  name: "userShopCar",
  components: {
    numbox: numbox
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      sumprice: 0,
      shopCar: [],
      goodsLength: 0,
      checkedVal: [],
      shopChecked: [],
      checkedAll: false,
      adminDel: false
    };
  },
  mounted() {
    this.loadData();
  },
  watch: {
    checkedVal(newVal, oldVal) {
      //
      var _self = this;
      _self.sumprice = 0;
      newVal.forEach(el => {
        var sumprice = parseFloat(el.sumprice);
        _self.sumprice += sumprice;
      });
    }
  },
  methods: {
    loadData() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl + "/index.php?ctl=Buyer_Cart&met=cart&typ=json",
        {
          k: _self.userKey,
          u: _self.userId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.cart_list.length > 0) {
                _self.shopCar = data.data.data.cart_list;
                var length = 0;
                _self.shopCar.forEach(el => {
                  el.goods.forEach((val, i) => {
                    length++;
                  });
                });
                _self.goodsLength = length;
              }
            }
          }
        }
      );
    },
    numAdd(val) {
      var _self = this;
      var carId = val.cart_id;
      val.goods_num++;
      _self.editCarListNum(carId, val.goods_num);
    },
    numMinus(val) {
      var _self = this;
      var carId = val.cart_id;
      if (val.goods_num == 1) {
        _self.common.openToast("宝贝不能再减了哦~");
        return;
      }
      val.goods_num--;
      _self.editCarListNum(carId, val.goods_num);
    },
    getListVal(items) {
      //商品的选取
      var _self = this;
      var goodsLength = items.goods.length;
      var shop_id = items.shop_id;
      var idx = 0;
      for (let i = 0; i < _self.checkedVal.length; i++) {
        const val = _self.checkedVal[i];
        if (_self.checkedVal[i].shop_id == shop_id) {
          idx++;
        }
      }
      if (goodsLength == idx) {
        _self.shopChecked.push(items);
      } else {
        _self.shopChecked = _self.shopChecked.filter(i => {
          //过滤当前点击的shop_id
          return i.shop_id != shop_id;
        });
      }
    },
    shopListChange(event, items) {
      //商家下的商品全选按钮
      var _self = this;
      var checked = event.target.checked;
      var shop_id = items.shop_id;
      //根据shop_id 进行改id下的商品反选
      _self.checkedVal = _self.checkedVal.filter(i => {
        return i.shop_id != shop_id;
      });
      if (checked) {
        items.goods.forEach(el => {
          _self.checkedVal.push(el);
        });
      }
    },
    checkedAllList(event) {
      //全选的按钮
      var _self = this;
      var checked = event.target.checked;
      _self.shopChecked = [];
      _self.checkedVal = [];
      if (checked) {
        //全选
        _self.shopCar.forEach(el => {
          //商户多选按钮
          _self.shopChecked.push(el);
          el.goods.forEach(val => {
            _self.checkedVal.push(val);
          });
        });
        // _self.checkedVal
      } else {
      }
    },
    editCarListNum(cart_id, num) {
      //商品的加减；
      var _self = this;
      _self.common.post(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_Cart&met=editCartNum&typ=json",
        { k: _self.userKey, u: _self.userId, cart_id: cart_id, num: num },
        data => {
          if (data.data.status == 200) {
            if (_self.checkedVal.length > 0) {
              _self.checkedVal.forEach(el => {
                if (el.cart_id == cart_id) {
                  el.sumprice = data.data.data.price;
                }
              });
              _self.getGoodsSumprice();
            }
          }
        }
      );
    },
    delCarList(cartId) {
      //删除购物车
      var _self = this;
      if (!Array.isArray(cartId)) {
        cartId = [cartId];
      }
      _self.common.openMessage("提示", "确定需要删除吗？", true, function() {
        _self.common.post(
          _self.apiUrl.shopUrl +
            "/index.php?ctl=Buyer_Cart&met=delCartByCid&typ=json",
          {
            k: _self.userKey,
            u: _self.userId,
            id: cartId
          },
          data => {
            if (data) {
              if (data.data.status == 200) {
                _self.common.openToast("删除成功");
                //根据cart_id 过滤删除的购物车Id
                _self.shopCar.forEach((el, i) => {
                  cartId.forEach(key => {
                    _self.shopCar[i].goods = _self.shopCar[i].goods.filter(
                      i => {
                        //过滤购物车的数组根据购物车的id
                        return i.cart_id != key;
                      }
                    );
                  });
                });
                _self.checkedVal = _self.checkedVal.filter(i => {
                  //过滤复选框选中的数组根据购物车的id
                  return i.cart_id != cartId;
                });
              }
            }
          }
        );
      });
    },
    deleteAll() {
      //批量删除
      var _self = this;
      var ids = [];
      _self.checkedVal.forEach(el => {
        ids.push(el.cart_id);
      });
      _self.delCarList(ids);
    },
    getGoodsSumprice() {
      //计算商品的总价格
      var _self = this;
      _self.sumprice = 0;
      _self.checkedVal.forEach(el => {
        var sumprice = parseFloat(el.sumprice);
        _self.sumprice += sumprice;
      });
    },
    adminList() {
      var _self = this;
      if (!_self.adminDel) {
        _self.adminDel = true;
      } else {
        _self.adminDel = false;
      }
    }
  }
};
</script>
<style scoped>
.mint-cell:last-child {
  background-image: none;
}
>>> .mint-cell-wrapper {
  background-image: none;
}
.UserShopCar {
  width: 97%;
  margin: 0 auto;
}
.carList {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 7px;
}
.shopDetile {
  padding: 5px 0px;
  border-bottom: 1px solid #f5f5f5;
}
.shopName {
  color: #303030;
  font-size: 13px;
}
.icon-shop-center {
  color: #999;
  padding-right: 5px;
}
.goodsImage {
  width: 30%;
}
.goodsImage img {
  width: 100%;
}
.goodsDetails {
  padding: 10px;
  width: 70%;
}
.goodsTitle {
  font-size: 13px;
  color: #303030;
}
.goodsList {
  padding: 8px 0px;
}
.price {
  color: #ff0036;
  font-weight: bold;
  font-size: 15px;
  width: 50%;
}
.spec_val_str {
  font-size: 12px;
  margin-top: 5px;
  background-color: #f5f5f5;
  color: #999;
  padding: 4px;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  display: inline-block;
  height: 15px;
  width: 15px;
  text-indent: 15px;
  border-radius: 100%;
  border: 1px solid #999;
}
input[type="checkbox"]:checked + label {
  background-image: url("../../assets/selecton.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  border: 1px solid #fff;
}
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  left: 0px;
  right: 0px;
  background-color: #fff;
}
.footer .footerItmes {
  padding: 5px;
}
.settlement,
.delAll {
  background-color: #ff0036;
  color: #fff;
  font-size: 15px;
  padding: 10px 5px;
  border-radius: 10px;
}
.delAll {
  padding: 10px 30px;
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
.noCarList {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  height: 10rem;
  width: 10rem;
  margin: -5rem 0 0 -5rem;
}
.noCarList img {
  display: block;
  height: 6rem;
  width: 6rem;
  margin: 0 auto;
}
</style>
