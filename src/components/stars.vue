<template>
    <span style="display:inline-block;">
        
            
            <span v-for="items in rating" class="starsImg" :style="{backgroundImage:'url('+full+')'}"></span><span v-for="items in (5-rating)" class="starsImg" :style="{backgroundImage:'url('+gray+')'}"></span>
            
        
    </span>
</template>

<script>
export default {
    name: "stars",
    props: {
        rating: {
            type: Number,
            default: 0
        },
        gray:{
            type: String,
            default:require("../assets/star-gray.png")
        },
        full:{
            type: String,
            default:require("../assets/star-full.png")
        },
        width:{
            type:String,
            default:"10%"
        }
    }
};
</script>

<style scoped>
.starsImg{
    width:12px;
    height:12px;
    display:inline-block;
    background-size: 13px 13px;
    
}
</style>
