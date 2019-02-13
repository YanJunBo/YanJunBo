<template>

    <span v-if="type==0" v-bind:class="{typeActive:num == index,highOpinion}" :data-type="type" @click="typeProduct()">{{typeStr}}</span>
    
    <span v-else="" v-bind:class="{typeActive:num == index,highOpinion}" :data-type="type" @click="typeProduct()">{{typeStr}}</span>
    
    <!-- <span class="high_opinion">质量不错(64)</span>
            <span class="high_opinion">快递不错(51)</span>
            <span class="high_opinion">态度不错(50)</span>
            <span class="high_opinion">是正品(40)</span>
            <span class="high_opinion">性能好(6)</span>
            <span class="negative">物流太慢(18)</span> -->

</template>
<script>
export default {
    name: "productReviewsType",
    props: {
        typeStr: {
            type: String,
            default: "全部"
        },
        className: {
            type: String,
            default: "negative"
        },
        type: {
            type: String,
            default: ""
        },
        index:{
            type: Number,
            default: 0
        },
        num:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            negative: "negative",
            typeActive: false,
            highOpinion: "highOpinion"
        };
    },
    mounted(){
    },
    methods: {
        typeProduct() {
            this.$emit('type-product');          
        }
    }
};
</script>
<style scoped>
.products_reviews_type span {
    display: inline-block;
    font-size: 12px;
   
    padding: 10px;
    margin: 2px;
    border-radius: 10px;
}
/* 好评 */
.highOpinion {
    background-color: #FEE;
}
/* 差评 */
.negative {
    background-color: #f5f5f5;
}
.typeActive{
    background-color: #FF0036;
    color: #FFF !important;
}

</style>
