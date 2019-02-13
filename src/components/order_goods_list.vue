<template>
    <div>
        <router-link to="order_details" class="df orderList">

            <div class="orderImage fg-1">
                <div class="bc-img-c" :style="{backgroundImage:'url('+goodsImage+')'}"></div>
            </div>
            <div class="orderDeilt fg-3 fs-13 ml-10">
                <div class="fs-13">{{goodsName}}</div>
            </div>
            <div class="orderPric fg-1 fs-13 ml-10">
                <div class="fs-13">￥{{goodsPric}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "order-goods-list",
    props: {
        goodsImage: {
            type: String
        },
        goodsName: {
            type: String,
            default: "商品名称"
        },
        goodsPric: {
            type: Number,
            default: "0"
        }
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
.orderImage {
    width: 25%;
}
.orderDeilt {
    background-color: #f5f5f5;
}
.orderImage div {
    width: 6.2rem;
    height: 6.2rem;
    margin: 0 auto;
}
.orderList {
    padding: 5px 5px;
    background-color: #f5f5f5;
    border-bottom: 3px solid #fff;
}
</style>
