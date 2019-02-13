<template>
    <div class="musicImage bc-fff mb-5" @click="$emit('film-detils',id)">
        <div class="music df p-10">
            <div class="s_film_details">
                <div class="itemsImg"><img :src="imgSrc" alt="" width="100%" />
                </div>
            </div>
            <div class="p-5 s_film_content ml-5">
                <div class="fs-15 ut-s">{{name}}</div>
                <div v-if="rating > 0" class="average mt-5">
                    <slot></slot>

                </div>

                <div v-else class="fs-13 c-666">
                    暂无评分
                </div>
                <div class="c-303030">
                    <span v-for="(items,index) in genres" class="fs-12">{{items}}
                        <span v-if="index < genres.length-1">/</span>
                    </span>
                </div>
                <div class="c-303030 fs-12">
                    年份：{{year}}
                </div>
            </div>
            <div class="ratingContent">
                <div v-if="rating != 0" class="c-ff0036 mt-5">
                    <span class="fs-17 fw-blod">{{average}}</span><span class="fs-13">分</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id:Number,
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
        rating: {
            type: Number,
            default: 0.0
        },
        genres: {
            type: Array
        },
        year: {
            type: String,
            default: "0000"
        }
    }
};
</script>

<style scoped>
image[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
}
.musicImage {
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
.s_film_details {
    position: relative;
    width: 25%;
    overflow: hidden;
}
.s_film_content {
    width: 55%;
}
.ratingContent {
    width: 14%;
    text-align: center;
}
.s_film_details img {
    width: 100%;
}

.average {
    font-size: 13px;
}
</style>
