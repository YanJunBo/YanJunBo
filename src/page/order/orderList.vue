
<template>
    <div class="">
        <mt-header fixed title="我的订单">
            <div v-on:click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
        <div class="orderTypeContent df">
            <div class="fg-2 p-10-15 fs-13 c-303030" v-on:click="orderSelect(items.type)" v-bind:class="{typeActive:current == items.type}" v-for="(items,index) in orderType">{{items.orderName}}</div>
        </div>
        <!-- :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" -->
        <div class="" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <order-list v-for="(items,index) in orderItems" :orderId="items.id" :orderTotalPrice="total_price(index)" :shopName="items.shopName" :index="index" :goodsLength="items.goods.length" v-on:take-goods="takeGoods">
                <!-- goodsImage: {
            type: String
        },
        goodsName: {
            type: String,
            default: "商品名称"
        },
        goodsPric: {
            type: String,
            default: "0"
        } -->
                <order-goods-list v-for="(goodsItems,index) in items.goods" :goodsImage="goodsItems.image" :goodsName="goodsItems.name" :goodsPric="goodsItems.pric"></order-goods-list>   
            </order-list>
        </div>
    </div>

</template>

<script>
import orderlist from "../../components/orderList_comp";
import orderGoodsList from "../../components/order_goods_list"
export default {
    name: "orderList",
    components: {
        "order-list": orderlist,
        "order-goods-list": orderGoodsList
    },
    data() {
        return {
            allLoaded: true,
            current: 0,
            orderTotalPrice: 0,
            loading: false,
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
            //订单列表
            orderItems: [
                {
                    id: 1,
                    shopName: "天猫电器",
                    goods: [
                        {
                            name:
                                "任天堂Nintendo Switch家用游戏机掌机NS智能体感游戏主机",
                            image: require("../../assets/switch.png"),
                            pric: 1205.22
                        },
                        {
                            name:
                                "任天堂Nintendo Switch家用游戏机掌机NS智能体感游戏主机",
                            image: require("../../assets/erji.jpg"),
                            pric: 1205
                        }
                    ]
                },
                {
                    id: 2,
                    shopName: "天猫电器",
                    goods: [
                        {
                            name:
                                "任天堂Nintendo Switch家用游戏机掌机NS智能体感游戏主机",
                            image: require("../../assets/xiezi.jpg"),
                            pric: 1205
                        }
                    ]
                },
                {
                    id: 1,
                    shopName: "天猫电器",
                    goods: [
                        {
                            name:
                                "任天堂Nintendo Switch家用游戏机掌机NS智能体感游戏主机",
                            image: require("../../assets/switch.png"),
                            pric: 1205.22
                        },
                        {
                            name:
                                "任天堂Nintendo Switch家用游戏机掌机NS智能体感游戏主机",
                            image: require("../../assets/erji.jpg"),
                            pric: 1205
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.current = this.$route.query.type;
    },
    methods: {
        loadTop: function() {},
        loadBottom: function() {
            // this.$refs.loadmore.onBottomLoaded();
        },
        orderSelect: function(type) {
            this.current = type;
        },
        total_price(idx) {
            //计算订单中商品的总价格
            var orderItems = this.orderItems[idx].goods;
            var totalRrice = 0;
            for (var i = 0; i < orderItems.length; i++) {
                totalRrice += orderItems[i].pric;
            }
            return totalRrice.toFixed(2);
        },
        takeGoods() {
            //确认收货
            var common = this.common;
            common.openMessage("小提示", "确认收货吗？", true, function() {
                common.openIndicator();
                setTimeout(function() {
                    common.closeIndicator();
                    common.openAlert("操作成功！", "小提示");
                }, 2000);
            });
        },
        order_details(event) {
            event.cancelBubble = true;
        },
        loadMore() {
            this.loading = true;
            var common = this.common;
            common.openIndicator();
            //模拟ajax请求数据
            setTimeout(() => {
                common.closeIndicator();
                this.loading = false;
                this.orderItems.forEach(element => {
                    this.orderItems.push(element);
                });
            }, 3000);
        }
    }
};
</script>

<style scoped>
.orderTypeContent {
    margin-top: 45px;
    background-color: #fff;

    text-align: center;
}
.typeActive {
    color: #ff0036;
    border-bottom: 2px solid #ff0036;
}
.orderContent {
    margin-top: 45px;
}
</style>
