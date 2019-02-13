<template>
    <div>
        <mt-header fixed title="登陆">
            <div v-on:click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
        <div class="content">
            <div class="logincontent">
                <div class="login_logo"><img src="../../assets/login_logo.png" alt=""></div>
                <div class="df"><input placeholder="手机号/邮箱/会员名" type="text" v-model="inputData.user_account"></div>
                <div class="df"><input placeholder="请输入密码" type="password" v-model="inputData.user_password"></div>

                <mt-button type="danger" v-on:click="userLogin">LOGIN</mt-button>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            inputData:{
               user_account:"",
               user_password:""
            }
        };
    },
    mounted() {
        
    },
    methods: {
        userLogin() {
            var _self = this;
            _self.common.post(
                _self.apiUrl.centerUrl +
                    "/index.php?ctl=Login&met=login&typ=json",
                {
                    user_account: _self.inputData.user_account,
                    user_password: _self.inputData.user_password,
                },
                function(data) {
                    if(data){
                        if(data.data.status == 200){
                            _self.common.setCookie("user_id",data.data.data.id);
                            _self.common.setCookie("user_key",data.data.data.k);
                            _self.$router.go(-1);
                            // _self.common.setCookie("user_id");
                        }else{
                            _self.common.openToast(data.data.msg)
                        }
                    }
                }
            );
        }
    }
};
</script>
<style scoped>
input {
    width: 100%;
    padding: 12px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    font-size: 16px;
    border-radius: 10px;
}
.logincontent {
    width: 85%;
    margin: auto;
    padding-top: 20px;
}
.login_logo img {
    width: 25%;
    display: block;
    margin: 0 auto;
    padding-bottom: 15px;
}
.logincontent button {
    margin-top: 20px;
    width: 100%;
}
</style>
