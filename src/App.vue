<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>

        <mt-tabbar v-model="selected">
            <mt-tab-item id="home">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                首页
            </mt-tab-item>
            <mt-tab-item id="order">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                订单
            </mt-tab-item>
            <mt-tab-item id="see">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                发现
            </mt-tab-item>
            <mt-tab-item id="main">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            selected: "home"
        };
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
    /* margin-top: 60px; */
}
</style>
