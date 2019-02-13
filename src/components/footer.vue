<template>
    <div>
        <footer class="df" ref="footer">

            <div v-for="(items,index) in tabsItems" class="fg-1" v-on:click="tabs(index,items.path)">
                <div v-bind:class="{'c-ff0036':current == index}">
                    <div class="fs-27" v-bind:class="items.className"></div>
                </div>
                <div class="fs-13" v-bind:class="{'c-ff0036':current == index}">{{items.title}}</div>
            </div>

        </footer>

    </div>

</template>
<script type="text/ecmascript-6">
export default {
    name: "tab",
    props: {
        current: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabsItems: [
                {
                    title: "首页",
                    path: "/",
                    className: "icon-homePage",
                },
                {
                    title: "分类",
                    path: "/classify",
                    className: "icon-classify",
                },
                {
                    title: "电影",
                    path: "/film",
                    className: "icon-seePage",
                },
                {
                    title: "我的",
                    path: "/Main",
                    className: "icon-mainPage",
                }
            ]
        };
    },
    methods: {
        tabs(idx, path) {
            this.$router.push({
                path: path
            });
        },
        thisRoute() {}
    },
    created() {},
    watch: {}
};
</script>
<style scoped>
footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    text-align: center;
    color: #303030;
    background-color: #fff;
    padding-top:5px;
}
</style>
