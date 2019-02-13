<template>
    <div class="products_reviews_content mt-10">
        <div class="df f-ac">
            <div class="headerPic"><img :src="headerImg" alt=""></div>
            <div class="nickname">{{nickname}}</div>
        </div>
        <div class="products_reviews_details">{{details}}</div>
        <div class="imageContent box-row" :imgArr="imgArr" v-if="imgArr!=''">
            <div v-for="(items,index) in imgArr" class="imageList box-col-xs-3 box-col-sm-2">
                <div>
                    <img :src="items" alt="" :preview="photoIndex">
                </div>

            </div>

        </div>
        <div class="line mt-10"></div>
    </div>
    
</template>
<script>
export default {
    name: "products_reviews_list",
    props: {
        nickname: {
            type: String,
            default: "用户昵称"
        },
        details: {
            type: String,
            default: "评论的详情"
        },
        headerImg: {
            type: String,
            default: require("../assets/default_user_header.png")
        },
        photoIndex:{
            type: Number,
            default: 0
        },
        imgArr: {
            type: Array
        }
    },
    data() {
        return {};
    }
};
</script>
<style scoped>
/* 评论的详情 */
.line {
    border-bottom: 1px solid #e4e4e4;
}
.products_reviews_details {
    font-size: 13px;
    color: #051b28;
    margin-top: 7px;
}
.headerPic {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
}
.nickname {
    font-size: 12px;
    margin-left:10px;
}
.headerPic img {
    height: 100%;
    width: 100%;
}
.imageList div {
    padding: 5px;
}

.imageList img {
    display: block;
    width: 100%;
    padding: 5px;
}
</style>
