<template>
  <div>
    <mt-header
      fixed
      title="收货地址"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="content">
      <no-data v-show="noData">
        <img
          src="../../assets/no_address.png"
          alt=""
        >
      </no-data>
      <address-list
        v-show="!noData"
        v-for="(items,index) in user_addressList"
        :index="index"
        :isChecked="items.user_address_default"
        :userName="items.user_address_contact"
        :userPhone="items.user_address_phone"
        :user_address_area="items.user_address_area"
        :userAddress="items.user_address_address"
        v-on:address-edit="edit(items.id)"
        v-on:address-delete="deleteAddress(items.id)"
        v-on:address-default="editAddressDefaultInfo(items.id,items.user_address_default)"
      ></address-list>
    </div>
    <footer
      class="addAddress"
      v-on:click="addAddress()"
    >
      新建地址
    </footer>
  </div>
</template>
<script>
import addressList from "../../components/address_list";
import noData from "../../components/noData";
export default {
  name: "user_address_list",
  components: {
    "address-list": addressList,
    "no-data": noData
  },
  data() {
    return {
      userId: this.common.getCookie("user_id"),
      userKey: this.common.getCookie("user_key"),
      noData: false,
      user_addressList: []
    };
  },
  mounted() {
    this.userAddressList();
  },
  methods: {
    userAddressList() {
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl + "/index.php?ctl=Buyer_Cart&met=confirm&typ=json",
        {
          k: _self.userKey,
          u: _self.userId
        },
        function(data) {
          if (data) {
            if (data.data.status == 200) {
              if (data.data.data.address.length > 0) {
                _self.noData = false;
                var addressList = data.data.data.address;
                addressList.forEach(val => {
                  val.user_address_area = val.user_address_area.replace(
                    /\s+/g,
                    ""
                  );
                  if (val.user_address_default == "1") {
                    val.user_address_default = true;
                  } else {
                    val.user_address_default = false;
                  }
                  _self.user_addressList.push(val);
                });
              } else {
                _self.noData = true;
              }
            }
          }
        }
      );
    },
    addAddress() {
      var _self = this;
      _self.$router.push({
        path: "user_add_address",
        query: {
          type: "add"
        }
      });
    },
    edit(id) {
      var _self = this;
      _self.$router.push({
        path: "user_add_address",
        query: {
          type: "edit",
          addressId: id
        }
      });
    },
    ///index.php?ctl=Buyer_User&met=editAddressDefaultInfo&typ=json
    editAddressDefaultInfo(addressId, user_address_default) {
      var _self = this;
      if (user_address_default) {
        //如果当前默认值是true，则设置设置为false
        user_address_default = 0;
      } else {
        user_address_default = 1;
      }
      _self.common.post(
        _self.apiUrl.shopUrl +
          "index.php?ctl=Buyer_User&met=editAddressDefaultInfo&typ=json",
        {
          k: _self.userKey,
          u: _self.userId,
          user_address_default: user_address_default,
          user_address_id: addressId
        },
        data => {
          if (data.data.status == 200) {
            _self.common.openToast("设置成功");
          } else {
            _self.user_addressList.splice(0);
            _self.userAddressList();
          }
        }
      );
    },
    deleteAddress(addressId) {
      //?ctl=Buyer_User&met=delAddress&typ=json
      var _self = this;
      _self.common.openMessage("提示", "确定删除吗？", true, () => {
        _self.common.post(
          _self.apiUrl.shopUrl + "?ctl=Buyer_User&met=delAddress&typ=json",
          {
            id: addressId,
            k: _self.userKey,
            u: _self.userId
          },
          function(data) {
            if (data) {
              if (data.data.status == 200) {
                _self.user_addressList.splice(0);
                _self.userAddressList();
                _self.common.openToast("删除成功");
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
.addAddress {
  position: fixed;
  bottom: 0px;
  width: 100%;
  text-align: center;
  background-color: #ff0036;
  color: #fff;
  padding: 14px 0px;
}
.noData {
  width: 50% !important;
}
</style>
