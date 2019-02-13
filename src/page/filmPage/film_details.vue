<template>
  <div>
    <mt-header
      fixed
      title="Film"
    >
      <div
        v-on:click="$router.back()"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div
      class="content"
      style="margin-top:60px;"
    >
      <div class="df details f-ac">
        <div class="fg-1 filmImg">
          <img
            :src="images.medium"
            alt=""
          >
        </div>
        <div class="filmdetails fg-3 ml-10">
          <div class="filmName fs-16 c-303030">{{filmData.title}}</div>
          <div
            class="aka fs-12 mt-5"
            v-for="(items,index) in filmData.aka"
            v-if="index == filmData.aka.length-1"
          >{{items}}</div>
          <div
            v-if="rating.average > 0"
            class="mt-5"
          >
            <span class="fw-bold c-ffb712">{{rating.average}}</span>
            <stars-list
              class="stars"
              :rating="starNum(Math.round(parseFloat(rating.average * 5)))"
              :width="'4%'"
            ></stars-list>
          </div>
          <div
            v-else
            class="fs-13 c-666 mt-5"
          >
            暂无评分
          </div>
          <div class="c-303030">
            <span
              v-for="(items,index) in filmData.genres"
              class="fs-12"
            >{{items}}
              <span v-if="index < filmData.genres.length-1">/</span>
            </span>
          </div>
          <div class="c-303030">
            <span
              v-for="(items,index) in filmData.countries"
              class="fs-12"
            >{{items}}
              <span v-if="index < filmData.countries.length-1">/</span>
            </span>
          </div>
          <div class="wish_count df f-ac mt-10">
            <div class="fw-bold c-ffb712">{{filmData.wish_count}}</div>
            <div class="fs-14">人想看</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="summaryContent p-7">
        <div class="p-5 bc-fff">
          <div class="title fs-14">简介</div>
          <div
            class="summary fs-13 mt-5 p-lr-5 c-303030"
            v-bind:class="{'hideSummaty':hideSummaty}"
          >{{filmData.summary}}</div>
        </div>
        <div
          class="fs-13 c-666 bc-fff tx-c p-tb-5"
          v-on:click="ishideSummaty"
        >{{ishideSummatyText}}</div>
      </div>
      <div class="castsContent p-7">
        <div class="p-5 bc-fff">
          <div class="title fs-14">演员表</div>
        </div>
        <div class="c_list bc-fff">
          <casts-list
            v-for="(items,index) in casts"
            :imgSrc="items.avatars.small"
            :name="items.name"
          ></casts-list>
          <div class="p-5"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import stars from "../../components/stars";
import castsList from "../../components/castsList";
export default {
  name: "filmDetails",
  components: {
    "stars-list": stars,
    "casts-list": castsList
  },
  data() {
    return {
      filmData: {},
      images: {},
      rating: {},
      casts: [],
      hideSummaty: true,
      ishideSummatyText: "展开"
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      var _self = this;
      var filmId = this.$route.query.filmId;
      var $ajax = _self.common.httpJsonp;
      $ajax(
        "/v2/movie/subject/" + filmId,
        null,
        function(data) {
          _self.filmData = data;
          _self.images = data.images;
          _self.rating = data.rating;
          data.casts.forEach(val => {
            _self.casts.push(val);
          });
        },
        function(error) {}
      );
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
    ishideSummaty() {
      var ishideSummaty = this.hideSummaty;
      if (ishideSummaty) {
        this.hideSummaty = false;
        this.ishideSummatyText = "收起";
      } else {
        this.hideSummaty = true;
        this.ishideSummatyText = "展开";
      }
    }
  }
};
</script>

<style scoped>
.details {
  margin: 5px 7px 5px 7px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.filmImg {
  width: 30%;
}
.filmImg img {
  width: 100%;
}
.filmdetails {
  width: 70%;
}
.c_list {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.summary {
  line-height: 15px;
}
.hideSummaty {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
