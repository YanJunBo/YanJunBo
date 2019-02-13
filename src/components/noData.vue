<template>
    <div class="noData">
        <!-- <img :src="images" alt="" srcset=""> -->
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"noData",
}
</script>
<style scoped>
.noData{
    margin-top:10px;
    width:60%;
    margin:0 auto;
    padding-top:20px;
}
.noData img{
    width:100%;
}
.noData p{
    text-align: center;
    font-size: 14px;
    color:#a2a2a2;
    padding-top:10px;
}
</style>
