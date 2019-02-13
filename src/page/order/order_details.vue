<template>
    <div>
        <mt-header title="订单详情">
            <div v-on:click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
        <div class="banner">
            <img src="../../assets/car.png" alt="">
            <div class="logistics">
                <div class="fs-15">卖家发货</div>
                <div class="fs-13 mt-5">还剩6天22时自动确认</div>
            </div>
        </div>
        <div class="p-10 bc-fff">
            <div class="df f-ac wuliu">
                <div class="fg-1 icon-car-wuliu fs-24 c-359a2b"></div>
                <div class="fg-2 p-10">
                    <div class="fs-14 c-359a2b wuliuDetails">您已在御水湾花园社区店完成取件，感谢使用菜鸟驿站，期待再次为您服务</div>
                    <div class="wuliuDate fs-12 mt-10">2015-07-12 15:20:30</div>
                </div>
                <div class="fg-1 nui mintui mintui-back"></div>
            </div>
            <div class="df f-ac c-666">
                <div class="icon-loaction fs-24"></div>
                <div class="fs-14 fg-1 p-10">
                    <div class="userInfo df">
                        <div class="fg-1 userInfo">收货人:颜俊波</div>
                        <div class="fg-1 tx-r">18052060534</div>
                    </div>
                    <div class="address mt-10">
                       收货地址：江苏省 南京市 秦淮区 大光路街道 江苏省南京市秦淮区御道街169号御水湾21幢303室   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
header {
    background-color: #ffffff !important;
    color: #303030;
}
.banner {
    height: 150px;
    background-color: #fa1945;
    position: relative;
}
.banner img {
    position: absolute;
    right: 20px;
    top: 15%;
    width: 30%;
}
.logistics {
    position: absolute;
    left: 20px;
    color: #fff;
    top: 40%;
}
.nui {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); /* Opera */
}
.wuliu{
    border-bottom:1px solid #eaeaea;
}
.wuliuDetails {
    line-height: 18px;
}
</style>
