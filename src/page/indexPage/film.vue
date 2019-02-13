<template>
  <div>

    <mt-header
      fixed
      title="Film"
    ></mt-header>
    <router-link
      class="search"
      to="../page/search/search"
    >
      <div class="f-ac df">
        <div class="fg-3 searchIpt">
          <div class="icon-search p-10 fs-13 c-5f646e"></div>
        </div>
        <div class="c-fff ml-5 fs-14">搜索</div>
      </div>
    </router-link>
    <div
      class="content"
      style="margin-top:90px;"
    >
      <!-- <div v-for="(items,index) in musicList">{{items}}</div> -->
      <div
        class="muisicContent df"
        style="flex-wrap:wrap;"
      >
        <film-list
          v-for="(items,index) in filmList"
          :imgSrc="items.images.medium"
          :name="items.title"
          :id="items.id"
          :average="items.rating.average"
          :rating="starNum(Math.round(parseFloat(items.rating.average * 5)))"
          v-on:film-detils="filmDetils"
        >
          <stars-list :rating="starNum(Math.round(parseFloat(items.rating.average * 5)))"> </stars-list>
        </film-list>
      </div>
    </div>
    <myFooter :current="2"></myFooter>
  </div>
</template>

<script>
import film from "../../components/filmList";
import stars from "../../components/stars";
import myFooter from "../../components/footer";
export default {
  components: {
    "film-list": film,
    "stars-list": stars,
    myFooter: myFooter
  },
  name: "film",
  mounted() {
    this.loadData();
  },
  data() {
    return {
      filmList: []
    };
  },
  methods: {
    loadData() {
      var _self = this;
      // _self.common.openIndicator();
      _self.common.httpJsonp(
        "/v2/movie/in_theaters",
        null,
        function(data) {
          // _self.common.closeIndicator();
          var data = data.subjects;
          for (var i = 0; i < data.length; i++) {
            _self.filmList.push(data[i]);
          }
        },
        function(error) {
          // _self.common.closeIndicator();
          console.log(error);
        }
      );
    },
    filmDetils(id) {
      this.$router.push({
        path: "../page/filmPage/film_details",
        query: {
          filmId: id
        }
      });
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
    }
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
}
.search {
  position: fixed;
  top: 45px;
  width: 100%;
  background-color: #ff0036;
  z-index: 99;
}
.search .df {
  padding: 5px 10px;
}
.muisicContent {
  overflow: hidden;
}
.searchIpt {
  background-color: #fff;
  border-radius: 10px;
}
</style>
