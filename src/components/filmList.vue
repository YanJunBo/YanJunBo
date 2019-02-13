<template>

    <div class="musicImage" @click="$emit('film-detils',id)">
        <div class="music">
            <div class="musicdetails p-10"><div class="itemsImg"><img  v-lazy="imgSrc" alt="" width="100%" />
                </div>
            </div>
            <div class="p-5 tx-c ">
                <div v-if="rating > 0" class="average">
                    <slot></slot>
                    
                    <span>{{average}}</span>
                </div>
                <div v-else class="fs-13 c-666">
                    暂无评分
                </div>
                <div class="fs-13 ut-s pt-5">{{name}}</div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    
    props: {
        id: {
            type: String,
            default: 0
        },
        imgSrc: {
            type: String
        },
        name: {
            type: String,
            default: "音乐名称"
        },
        average: {
            type: Number,
            default: 0.0
        },
        rating:{
            type:Number,
            default:0.0
        }
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.musicImage {
    float: left;
    width: 33.33333%;
}
/* .filmImg {
    padding: 4.8rem 0em;
} */
.itemsImg {
    position: relative;
    padding-top: 130%;
}
.itemsImg img {
    display: block;
    position: absolute;
    left: -100%;
    right: -100%;
    top: -100%;
    bottom: -100%;
    margin: auto;
    min-height: 100%;
    min-width: 100%;
}
.musicdetails {
    position: relative;
    overflow: hidden;
}
.musicdetails img {
    width: 100%;
}

.average {
    font-size: 13px;
}

</style>
