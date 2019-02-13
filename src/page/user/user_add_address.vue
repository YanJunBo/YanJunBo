<template>
  <div>
    <mt-header
      fixed
      title="新建地址"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="content">
      <mt-field
        label="收货人"
        placeholder="请输入中文姓名"
        v-model="inputData.userName"
      ></mt-field>
      <mt-field
        label="联系人"
        placeholder="请输入收货人手机号"
        v-model="inputData.userPhone"
        type="tel"
      ></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">所在地区</span>
          </div>
          <div class="mint-cell-value m-input">
            <div
              class="m-input-contetnt"
              v-on:click="openPicker"
            ></div>
            <input
              placeholder="请点击选择送货区域"
              class="mint-field-core"
              disabled
              v-model="inputData.user_address_area"
            >
            <div class="mint-field-clear">
              <i class="mintui mint-cell-allow-right"></i>
            </div>
            <span class="mint-field-state is-default">
              <i class="mintui mintui-field-default"></i>
            </span>
            <div class="mint-field-other"></div>
          </div>
        </div>
        <div class="mint-cell-right"></div>
      </a>
      <mt-field
        label="详细地址"
        placeholder="请输入详细地址"
        v-model="inputData.userAddress"
      ></mt-field>
      <div class="df f-ac fs-13-5 defaultAddress">
        <div class="fg-1">是否默认地址</div>
        <div class=" defaultAddressSwitch">
          <mt-switch v-model="inputData.user_address_default"></mt-switch>
        </div>

      </div>

    </div>
    <mt-button
      type="danger"
      class="meBtn"
      v-on:click="confoirmBtn"
    >确认</mt-button>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
    >
      <div class="BTNPopup">
        <span
          class="confirmPopup"
          v-on:click="confirmPopup"
        >确定</span>
      </div>

      <mt-picker
        :slots="slots"
        value-key="name"
        @change="onValuesChange"
      ></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Myaddress from "../../components/address.json";
export default {
  name: "user_add_address",
  data() {
    return {
      popupVisible: false,
      Picker: null,
      pickAddress: [],
      inputData: {
        userName: "",
        user_address_area: "",
        addressCode: [],
        user_address_default: false
      },
      slots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Myaddress,
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {
    var _self = this;
    var type = _self.$route.query.type;
    if (type == "edit") {
      _self.addressInfor();
    }

    _self.$nextTick(() => {
      _self.slots[0].defaultIndex = 0;
    });
  },
  methods: {
    addressInfor() {
      //如果是编辑地址的操作
      //读取地址详情
      var _self = this;
      _self.common.get(
        _self.apiUrl.shopUrl +
          "index.php?ctl=Buyer_User&met=address&act=edit&typ=json",
        {
          k: _self.common.getCookie("user_key"),
          u: _self.common.getCookie("user_id"),
          id: _self.$route.query.addressId
        },
        data => {
          if (data.data.status == 200) {
            var userData = data.data.data.address_list;
            _self.inputData.userName = userData.user_address_contact;
            _self.inputData.userPhone = userData.user_address_phone;
            _self.inputData.user_address_area = userData.user_address_area;
            _self.inputData.userAddress = userData.user_address_address;
            _self.inputData.addressCode[0] = userData.user_address_province_id;
            _self.inputData.addressCode[1] = userData.user_address_city_id;
            _self.inputData.addressCode[2] = userData.user_address_area_id;
            if (userData.user_address_default == "1") {
              _self.inputData.user_address_default = true;
            } else {
              _self.inputData.user_address_default = false;
            }
          }
        }
      );
    },
    addAddress() {
      /**新增地址 */
      var _self = this;
      if (!_self.inputData.userName || _self.inputData.userName == "") {
        _self.common.openToast("收货人不能为空");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(_self.inputData.userPhone)) {
        _self.common.openToast("联系人格式不正确");
        return;
      }
      if (
        !_self.inputData.user_address_area ||
        _self.inputData.user_address_area == ""
      ) {
        _self.common.openToast("所在地区不能为空");
        return;
      }
      if (!_self.inputData.userAddress || _self.inputData.userAddress == "") {
        _self.common.openToast("详细地址不能为空");
        return;
      }
      var user_address_default = "";
      if (_self.inputData.user_address_default) {
        var user_address_default = "1";
      } else {
        var user_address_default = "0";
      }
      var userData = {
        k: _self.common.getCookie("user_key"),
        u: _self.common.getCookie("user_id"),
        user_address_contact: _self.inputData.userName,
        user_address_phone: _self.inputData.userPhone,
        province_id: _self.inputData.addressCode[0],
        city_id: _self.inputData.addressCode[1],
        area_id: _self.inputData.addressCode[2],
        user_address_address: _self.inputData.userAddress,
        address_area: _self.inputData.user_address_area,
        user_address_default: user_address_default
      };
      _self.common.post(
        _self.apiUrl.shopUrl +
          "/index.php?ctl=Buyer_User&met=addAddressInfo&typ=json",
        userData,
        function(data) {
          if (data) {
            if (data.data.status == 200) {
              _self.common.openToast("更新成功", "bottom");
              setTimeout(() => {
                _self.$router.back();
              }, 1000);
            } else {
            }
          }
        }
      );
    },
    editAddress() {
      //编辑地址
      var _self = this;
      var user_address_default = "";
      if (_self.inputData.user_address_default) {
        var user_address_default = "1";
      } else {
        var user_address_default = "0";
      }
      _self.common.post(
        _self.apiUrl.shopUrl +
          "index.php?ctl=Buyer_User&met=editAddressInfo&typ=json",
        {
          k: _self.common.getCookie("user_key"),
          u: _self.common.getCookie("user_id"),
          user_address_contact: _self.inputData.userName,
          user_address_phone: _self.inputData.userPhone,
          province_id: _self.inputData.addressCode[0],
          city_id: _self.inputData.addressCode[1],
          area_id: _self.inputData.addressCode[2],
          user_address_address: _self.inputData.userAddress,
          address_area: _self.inputData.user_address_area,
          user_address_default: user_address_default,
          user_address_id: _self.$route.query.addressId
        },
        data => {
          if (data) {
            _self.common.openToast("更新成功", "bottom");
          }
        }
      );
    },
    confoirmBtn() {
      var _self = this;
      var type = _self.$route.query.type;
      if (type == "edit") {
        _self.editAddress();
      } else { 
        _self.addAddress();
      }
    },
    openPicker() {
      var _self = this;
      _self.popupVisible = true;
    },
    onValuesChange(picker, values) {
      var _self = this;
      picker.setSlotValues(1, values[0].children);
      picker.setSlotValues(2, values[0].children[0].children);
       if (values[1]) {
        picker.setSlotValues(2, values[1].children);
      }
      _self.Picker = picker;
    },
    confirmPopup() {
      var _self = this;
      _self.popupVisible = false;
      var userSelectAddress = _self.Picker.getValues();
      var address = "";
      var addressCode = [];
      userSelectAddress.forEach(val => {
        address += val.name + " ";
        addressCode.push(val.code);
      });
      _self.inputData.user_address_area = address;
      _self.inputData.addressCode = addressCode;
    }
  }
};
</script>

<style scoped>
>>> .mint-cell-text,
>>> .mint-field-core {
  font-size: 13.5px;
}
>>> .picker-center-highlight:before,
>>> .picker-center-highlight:after {
  background-color: #ff0036;
}
>>> .mint-switch-input:checked + .mint-switch-core {
  border-color: #ff0036;
  background-color: #ff0036;
}
.meBtn {
  width: 90%;
  margin: 0 auto;
  display: block;
}
.mint-cell-allow-right::after {
  width: 8px;
  height: 8px;
  border: solid 2px #303030;
  border-bottom-width: 0;
  border-left-width: 0;
}
.mint-popup-bottom {
  width: 100%;
}
.m-input {
  position: relative;
}
.m-input-contetnt {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 99;
}
.BTNPopup {
  text-align: right;
  padding: 10px 10px;
}
.confirmPopup {
  background-color: #ff0036;
  color: #fff;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 10px;
}
.defaultAddress {
  padding: 10px 10px;
  line-height: 1;
  background-color: #fff;
  margin-top: 10px;
  min-height: inherit;
}
</style>
