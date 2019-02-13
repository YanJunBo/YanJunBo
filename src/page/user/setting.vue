<template>
  <div>
    <mt-header
      fixed
      title="设置"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>

      </div>

    </mt-header>
    <div class="content">

        <div v-on:click="out">退出登陆</div>

    </div>
  </div>
</template>

<script>
export default {
    name:"setting",
    data(){
        return{

        }
    },
    methods: {
        out() {
            this.common.foreachDelCookie();
            this.$router.back();
        },
    },
};
</script>

<style scoped>
</style>
