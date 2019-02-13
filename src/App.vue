<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view />

    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            selected: "外卖"
        };
    }
};
</script>

<style>
a {
    text-decoration: none;
    color: #303030;
}
* {
    margin: 0px;
    padding: 0px;
}
.content {
    margin-top: 45px;
    margin-bottom: 60px;
}
html,
body {
    background-color: #f4f4f4;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
header,
footer {
    z-index: 2 !important;
}
.mint-header {
    background-color: #ff0036 !important;
    height: 45px !important;
}
</style>
