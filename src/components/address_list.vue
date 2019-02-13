<template>
  <div class="p-10 bc-fff addressList">
    <div class="df pb-10">
      <div class="fg-1 userName">{{userName}}</div>
      <div class="userPhone">{{userPhone}}</div>
    </div>
    <div class="df pt-10 pb-20 userAddress">{{user_address_area}}{{userAddress}}</div>
    <div class="df f-ac">
      <div class="fg-1">
        <input
          :id="'option'+index"
          name="addressDefault"
          type="radio"
          value=""
          :checked="isChecked"
          @change="$emit('address-default')"
        />
        <label :for="'option'+index" >默认地址</label>
      </div>
      <div class="fg-1 df f-end f-ac">

        <div
          class="p-10 edit"
          @click="$emit('address-edit')"
        >编辑</div>
        <div
          class="p-10 del"
          @click="$emit('address-delete')"
        >删除</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "address_list",
  props: {
    index: {
      default: 0,
      type: Number
    },
    userName: {
      default: "",
      type: String
    },
    userPhone: {
      default: "",
      type: String
    },
    user_address_area: {
      default: "",
      type: String
    },
    userAddress: {
      default: "",
      type: String
    },
    isChecked:{
      default: false,
      type: Boolean
    }
  }
};
</script>
<style scoped>
.addressList {
  font-size: 13.5px;
  margin: 10px 0px;
}
.userAddress {
  border-bottom: 1px solid #e7e7e7;
}
.edit,
.del {
  font-size: 13px;
}
.edit {
  color: #464646;
}
.del {
  color: #ff476f;
}
input[name="addressDefault"] {
  display: none;
}
input[name="addressDefault"],label{
  font-size: 13px;
}
input[name="addressDefault"]+label {
  display: block;
  height: 16px;
  width: 200px;
  text-indent: 20px;
  background: url("../assets/radio.png") no-repeat left center;
  background-size: 8%;
}
input[name="addressDefault"]:checked+label {
  background: url("../assets/radioChecked.png") no-repeat left center;
  background-size: 8%;
}
</style>
