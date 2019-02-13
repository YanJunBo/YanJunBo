<template>
    <div>
        <!-- <div class="mt-10 bc-fff" v-for="(items,index) in orderList"> -->
        <div class="mt-10 bc-fff">
            <div class="df f-ac p-10">
                <div class="icon-shop c-ff0036"></div>
                <div class="fs-13">{{shopName}}</div>
            </div>
            
            <slot></slot>
          
            <div class="fs-12 tx-r p-10">共{{goodsLength}}件商品合计￥
                <span>{{orderTotalPrice}}</span>(含运费￥5.00)
            </div>
            <div class="orderStateBtn tx-r fs-13 p-10">
                <span class="" @click="">查看物流</span>
                <span class="" @click="">延长收货</span>
                <span class="take_goods" :data-id="orderId" @click="$emit('take-goods',orderId)">确认收货</span>
                <!-- <span></span> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "orderList",
    props: {
        index: {
            type: Number,
            default: 0
        },
        shopName: {
            type: String,
            default: "商户名称"
        },
        goodsLength: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        orderId: {
            type: Number,
            default: 0
        },
        orderTotalPrice:{
            type:String,
            default:0
        }
    },
    data() {
        return {};
    },
    methods: {
        //
    }
};
</script>
<style scoped>

.orderStateBtn span {
    display: inline-block;
    border: 1px solid #e1e1e1;
    padding: 6px;
}
.take_goods {
    border-color: #ff0036 !important;
    color: #ff0036;
}
</style>
