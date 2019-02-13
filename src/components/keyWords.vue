<template>
        <span @click="searchKey(keyWords)">{{keyWords}}</span>
</template>
<script>
export default {
    props:{
        keyWords:{
            type: String,
            default:"关键词"
        }
    },
    methods:{
        searchKey(keyWords){
            this.$emit("key-words",keyWords)
        }
    }
};
</script>
<style scoped>

span {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
    font-size: 13px;
    color: #303030;
    background-color: #fff;
    border: 1px solid #e2e2e2;
}
</style>
