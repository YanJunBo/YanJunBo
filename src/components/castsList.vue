<template>
    <div class="castslist">
        <div class="castsImg">
            <img :src="imgSrc" alt="" width="100%">
        </div>
        <div class="castsName tx-c fs-12 ut-s">
            <span>{{name}}</span>
            <div class="c-666 mt-5">演员</div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:"castsList",
    props:{
        imgSrc:{
            type:String,
        },
        name:{
            type:String,
            default:"演员"
        }
    }
};
</script>

<style scoped>
.castslist {
    width: 20%;
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
    margin-top:5px;
}
.castsImg{
    position:relative;
    padding-top:130%;
    overflow: hidden;
}
.castsImg img{
    display: block;
    position:absolute;
    top:0;
    left:-100%;
    right:-100%;
    bottom:-100%;
    margin:0 auto;
    min-width: 100%;
    min-height:100%;
}
.castsName{
    padding-top:5px;
}
</style>
