<template>
    <div>
        <div class="df f-ac bc-ff0036 fixed" style="width:100%;top:0px;z-index:9">
            <div v-on:click="$router.back()" class="mintui mintui-back c-fff ml-10"></div>
            <div class="fg-3 p-5">
                <input type="text" class="search_ipt" v-model="inputData" @focus="handleinput">
                <!-- <mt-search placeholder="搜索">
                </mt-search> -->
            </div>
            <div class="search_txt" v-on:click="filmList.splice(0);searchData(inputData)">
                <div>搜索</div>
            </div>
        </div>
        <div class="content">
            <div class="keyWordContent p-5 bc-fff" v-show="hotKeyWord">
                <span v-for="(items,index) in keyWords" v-on:click="hotKeyWordItems(items.key)">{{items.key}}</span>
            </div>
            <div class="listContent mt-5" v-show="list">
                <search-list v-for="(items,index) in filmList" :genres="items.genres" :year="items.year" :imgSrc="items.images.medium" :name="items.title" :id="items.id" :average="items.rating.average" :rating="starNum(Math.round(parseFloat(items.rating.average * 5)))" v-on:film-detils="filmDetils">
                    <stars-list :rating="starNum(Math.round(parseFloat(items.rating.average * 5)))" :width="'5%'"> </stars-list>
                </search-list>
            </div>
        </div>
    </div>
</template>

<script>
import searchList from "../../components/searchList";
import stars from "../../components/stars";
export default {
    components: {
        "search-list": searchList,
        "stars-list": stars
    },
    data() {
        return {
            hotKeyWord: true,
            list: false,
            inputData: "",
            keyWords: [
                {
                    key: "复仇者联盟3"
                },
                { key: "徐峥" }
            ],
            filmList: []
        };
    },
    methods: {
        hotKeyWordItems(key) {
            var _self = this;
            _self.searchData(key);
            this.filmList.splice(0);
        },
        starNum(number) {
            //计算评分的星级
            var num;
            if (!number || number == "" || number == undefined || number == 0) {
                num = 0;
            }
            if (number > 0) {
                var str = String(number).split("");
                num = str[0];
            }
            return parseInt(num);
        },
        searchData(key) {
            var _self = this;
            var $ajax = this.common.httpJsonp;
            _self.list = true;
            _self.hotKeyWord = false;
            $ajax(
                "/v2/movie/search?q=" + key + "&start=1&count=10",
                null,
                function(data) {
                    var data = data.subjects;
                    for (var i = 0; i < data.length; i++) {
                        _self.filmList.push(data[i]);
                    }
                },
                function(error) {}
            );
        },
        handleinput() {
            var _self = this;
            _self.list = false;
            _self.hotKeyWord = true;
        },
        filmDetils(id) {
            this.$router.push({
                path: "../filmPage/film_details",
                query: {
                    filmId: id
                }
            });
        },
    }
};
</script>
 <style scoped>
.mint-search {
    height: auto !important;
}
.keyWordContent span {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
    font-size: 13px;
    color: #303030;
    background-color: #fff;
    border: 1px solid #e2e2e2;
}
.search_ipt {
    width: 100%;
    border: none;
    padding: 8px 0px;
    border-radius: 10px;
}
.search_txt {
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding-right: 5px;
}
</style>
 
