<template>
  <div>
    <mt-header fixed>
      <div
        v-on:click="setting"
        v-if="userId"
        class="fs-25"
        slot="left"
      >
        <mt-button class="icon-setup"></mt-button>
      </div>
    </mt-header>
    <div class="content bc-fff">

      <div class="userInfo c-fff">

        <div
          class="df f-ac"
          v-if="!userId"
          v-on:click="openLogin"
        >
          <div
            class="userHeader bc-img-c noLogin"
            v-bind:style="{backgroundImage:'url('+noLoginUserHeader+')'}"
          ></div>
          <div class="noLoginText">点击登陆</div>
        </div>

        <!-- 登陆的样式 -->
        <div
          class="df userConent f-ac"
          v-else=""
        >
          <div
            class="userHeader bc-img-c"
            v-bind:style="{backgroundImage:'url('+userData.user_logo+')'}"
          ></div>
          <div class="ml-5">
            <div class="fs-16 fw-bold">{{userData.user_name}}</div>
            <div class=""></div>
          </div>
        </div>

      </div>
      <div class="p-10"></div>
      <div class="df fs-14 fc-303030 p-10 ">
        <div class="fg-2">我的订单</div>
        <div class="fg-2 tx-r fs-13 c-5F646E">查看全部></div>
      </div>
      <div class="df c-ff0036 tx-c pb-10 mt-5">
        <div
          class="fg-2"
          v-for="items in orderType"
          v-on:click="orderList(items.type)"
        >
          <div
            class="fs-25"
            v-bind:class="items.className"
          ></div>
          <div class="c-5F646E fs-12 mt-5">{{items.orderName}}</div>
        </div>
      </div>
      <div class="p-10"></div>
      <div class="df fs-14 fc-303030 p-10 ">
        <div class="fg-2">我的收藏</div>
      </div>
      <div class="df c-5F646E tx-c pb-10 mt-5">
        <div
          class="fg-2"
          v-for="(items,index) in userFavorites"
          v-on:click="favorites(items.page)"
        >
          <div class="fs-20">{{items.num}}</div>
          <div class="c-5F646E fs-12 mt-5">{{items.name}}</div>
        </div>
      </div>
      <div class="mt-15">
        <div
          class="df f-ac p-10 userList"
          v-on:click="userList()"
        >
          <div><img
              src="../../assets/address.png"
              alt=""
              width="20"
            ></div>
          <div class="fs-14 ml-5">收货地址</div>
          <div><i class="mint-cell-allow-right"></i></div>
        </div>
      </div>
    </div>
    <myFooter :current="3"></myFooter>
  </div>
</template>
<script>
import myFooter from "../../components/footer";
export default {
  name: "Main",
  components: {
    myFooter
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      isLogin: false,
      orderType: [
        {
          orderName: "待付款",
          className: "icon-card",
          type: 0
        },
        {
          orderName: "待发货",
          className: "icon-yushu",
          type: 1
        },
        {
          orderName: "待收货",
          className: "icon-fahuo",
          type: 2
        },
        {
          orderName: "待评价",
          className: "icon-message2",
          type: 3
        }
      ],
      userFavorites: [
        {
          name: "商品收藏",
          page: "goods_favorites",
          num: 0
        },
        {
          name: "店铺收藏",
          page: "shop_favorites",
          num: 0
        },
        {
          name: "我的足迹",
          page: "footprint",
          num: 0
        }
      ],
      noLoginUserHeader: require("../../assets/noLogin.png"),
      userData: {}
    };
  },
  mounted() {
    if (this.userId) {
      this.getUserInfo();
    }
  },
  methods: {
    orderList(type) {
      this.$router.push({
        path: "page/order/orderList",
        query: { type: type }
      });
    },
    getUserInfo() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_User&met=getUserInfo&typ=json",
        {
          k: _self.userKey,
          u: _self.userId
        },
        data => {
          if (data) {
            if (data.data.status == 200) {
              _self.userData = data.data.data;
              _self.userFavorites[0].num = _self.userData.favorites_goods_num; //收藏商品
              _self.userFavorites[1].num = _self.userData.favorites_shop_num; //收藏店铺
              _self.userFavorites[2].num = _self.userData.footprint_goods_num; //足迹
            }
          }
        }
      );
    },
    userList() {
      var _self = this;
      if (!_self.userKey || _self.userKey == "") {
        _self.openLogin();
        return;
      }
      _self.$router.push({
        path: "page/user/user_address_list",
        query: {}
      });
    },
    setting() {
      this.$router.push({
        path: "page/user/setting",
        query: {}
      });
    },
    openLogin() {
      this.$router.push({
        path: "page/user/login"
      });
    },
    favorites(page) {
      if (!this.userId) {
        this.openLogin();
        return;
      }
      this.$router.push({
        path: "page/user/" + page
      });
    }
  }
};
</script>
<style scoped>
.mint-cell-allow-right::after {
  top: none;
  width: 8px;
  height: 8px;
}
.userList {
  position: relative;
  border-top: 1px solid #ececec;
}
.userInfo {
  background-color: #ff0036;
  height: 80px;
  position: relative;
}
.userConent {
  position: absolute;
  bottom: -15px;
  left: 10px;
}
.userHeader {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 100%;
}
.noLogin {
  border: 2px solid #fff;
  margin-left: 10px;
  background-size: 70%;
  background-position: center;
}
.noLoginText {
  font-weight: bold;
  margin-left: 15px;
}
</style>

