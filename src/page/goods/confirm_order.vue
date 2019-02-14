<template>
  <div>
    <mt-header
      fixed
      title="确认订单"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>

      </div>

    </mt-header>
    <div class="content">
      <div class="df user_address f-ac">
        <div class=" icon-loaction"></div>
        <div class="fg-1 address_details">
          <div class="df address_name_phone">
            <div class="fg-1">收货人：颜俊波</div>
            <div class="fg-1">18205082594</div>
          </div>
          <div class="df f-ac pt-10">
            <div class="fg-1 address">
              江苏省南京市秦淮区御道街169号江苏省南京市秦淮区御道街169号江苏省南京市秦淮区御道街169号
            </div>
            <div class="icon-right"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmOrder",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    name() {}
  }
};
</script>

<style scoped>
.mint-header {
  background-color: #fff !important;
  color: #303030;
}
.user_address {
  padding: 10px;
  background-color: #fff;
  color: #303030;
  border-bottom: 3px solid;
  -webkit-border-image: url("../../assets/border.png") 0 1% 100% 1% repeat repeat;
  -o-border-image: url("../../assets/border.png") 0 1% 100% 1% repeat repeat;
  border-image: url("../../assets/border.png") 0 1% 100% 1% repeat repeat;
}
.icon-loaction {
  padding-right: 5px;
}
.address_name_phone {
  font-size: 18px;
  font-weight: bold;
}
.icon-right {
  color: #707070;
}
.address {
  font-size: 13px;
}
</style>
