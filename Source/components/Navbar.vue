<template>
  <header>
    <div class="sideShadow">
      <nav
        class="
          navbar navbar-expand-lg navbar-light
          bg-white
          py-4
          w-md-75
          mx-md-auto
          sticky-top
        "
      >
        <div class="container">
          <div
            class="
              d-flex
              justify-content-around justify-content-md-start
              align-items-center
              w-100
            "
          >
            <div class="d-md-none"></div>
            <router-link
              class="d-block navbar-brand text-center text-md-start"
              to="/"
            >
              <img src="../assets/images/logo.png" class="img-fluid" alt="" />
            </router-link>
            <a
              href="#"
              class="
                mb-serach
                d-flex
                align-items-center
                justify-content-center
                d-md-none
                bg-pink
                p-1
              "
            >
              <img
                src="../assets/images/icon-search.svg"
                class="img-fluid"
                alt=""
              />
            </a>
          </div>

          <div class="d-none d-md-flex justify-content-end w-100">
            <div class="navbar-nav navbar-right d-grid gap-2 d-md-block">
              <router-link class="btn text-pink" to="/Type/ScenicSpot&Active/"
                ><img src="../assets/images/icon1.svg" alt="" />
                <span class="ms-2 border-bottom border-pink"
                  >台灣景點</span
                ></router-link
              >
              <router-link
                class="btn text-warning"
                to="/Type/Restaurant&Hotel/"
              >
                <img src="../assets/images/icon2.svg" alt="" />
                <span class="ms-2 border-bottom border-warning">美食住宿</span>
              </router-link>

              <a class="btn text-success" link="#">
                <img src="../assets/images/icon3.svg" alt="" />
                <span class="ms-2 border-bottom border-success">交通景點</span>
              </a>
            </div>
          </div>

          <div
            class="
              mb-filter
              d-flex
              flex-wrap
              justify-content-center
              d-md-none
              w-100
              mt-3
            "
            v-if="!this.$route.meta.bus"
          >
            <ul class="nav justify-content-around w-100 py-1 shadow rounded-3">
              <li class="nav-item">
                <router-link
                  class="nav-link text-pink"
                  to="/Type/ScenicSpot&Active/"
                  >景點活動</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Type/Restaurant&Hotel/"
                  >美食住宿</router-link
                >
              </li>
              <li class="nav-item">
                <a class="nav-link text-success" href="#">景點交通</a>
              </li>
            </ul>

            <div class="row mt-3 align-items-center w-75 mx-auto">
              <div class="col-5 h-100 ps-0">
                <select
                  name="type"
                  id="input_type"
                  class="h-100 w-100 rounded-3 border-0 shadow px-3"
                  v-model="userInput.type"
                >
                  <option
                    v-for="(text, type) in types"
                    :key="type"
                    :value="type"
                  >
                    {{ text }}
                  </option>
                </select>
              </div>
              <div class="col-5 h-100 pe-0">
                <select
                  name="type"
                  id="input_city"
                  class="h-100 w-100 rounded-3 border-0 shadow px-2"
                  v-model="userInput.city"
                >
                  <option value="all">不分縣市</option>
                  <option
                    v-for="(text, city) in citys"
                    :key="city"
                    :value="city"
                  >
                    {{ text }}
                  </option>
                </select>
              </div>
              <div class="col-2">
                <a
                  href="#"
                  class="
                    btn-location
                    bg-warning
                    rounded-3
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <img
                    src="../assets/images/icon-location.svg"
                    alt=""
                    srcset=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        class="pc-filter bg-white d-none d-md-block"
        v-if="!this.$route.meta.bus"
      >
        <div class="bg">
          <img
            :src="require(`../assets/images/${getBanner}`)"
            class="img-fluid w-100 p-5 pt-0 bg-white"
            alt=""
          />
        </div>
        <div class="pc-filter-block">
          <h1 class="text-white mb-0 display-3 fw-bolder">
            Welcome to <span class="text-pink">Taiwan°</span>
          </h1>
          <small class="text-white"
            >台北、台中、台南、屏東、宜蘭……遊遍台灣</small
          >
          <div class="row g-2 mt-2">
            <div class="col-10">
              <input
                type="text"
                class="form-control w-100"
                placeholder="搜尋關鍵字"
                v-model="userInput.keyword"
              />
            </div>
            <div class="col-2">
              <a
                href="#"
                class="
                  h-100
                  rounded-3
                  pc-serach
                  d-flex
                  align-items-center
                  justify-content-center
                  bg-pink
                  p-1
                "
                @click.prevent="doFilter()"
              >
                <img
                  src="../assets/images/icon-search.svg"
                  class="img-fluid"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div class="row g-2 mt-2 d-flex justify-content-around">
            <div class="col-5">
              <select
                name="type"
                id="input_type"
                class="w-100 rounded-3 border-0 shadow px-3"
                v-model="userInput.type"
              >
                <option v-for="(text, type) in types" :key="type" :value="type">
                  {{ text }}
                </option>
              </select>
            </div>
            <div class="col-5">
              <select
                name="type"
                id="input_city"
                class="w-100 rounded-3 border-0 shadow px-2"
                v-model="userInput.city"
              >
                <option value="all">不分縣市</option>
                <option v-for="(text, city) in citys" :key="city" :value="city">
                  {{ text }}
                </option>
              </select>
            </div>
            <div class="col-2">
              <a
                href="#"
                class="
                  btn-location
                  bg-warning
                  rounded-3
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <img
                  src="../assets/images/icon-location.svg"
                  alt=""
                  srcset=""
                  @click.prevent="getPosition()"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-filter bus bg-white" v-else>
        <div class="pc-filter-block d-none d-md-block">
          <div class="row g-2 mt-2">
            <div class="col-5">
              <select
                name="input_bus_city"
                id="input_bus_city"
                class="w-100 rounded-3 border-0 shadow px-2"
                v-model="busUserInput.city"
                @change="getBusRoute()"
              >
                <option v-for="(text, city) in citys" :key="city" :value="city">
                  {{ text }}
                </option>
              </select>
            </div>
            <div class="col-5">
              <select
                name="input_bus_route"
                id="input_bus_route"
                class="w-100 rounded-3 border-0 shadow px-2"
                v-model="busUserInput.routeName"
              >
                <option value="none">選擇路線</option>
                <option
                  v-for="item in busRoutes"
                  :key="item.RouteUID"
                  :value="item.RouteName.Zh_tw"
                >
                  {{ item.RouteID }}
                </option>
              </select>
            </div>
            <div class="col-2">
              <a
                href="#"
                class="
                  btn-location
                  bg-pink
                  rounded-3
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <img
                  src="../assets/images/icon-search.svg"
                  alt=""
                  srcset=""
                  @click.prevent="doFilter()"
                />
              </a>
            </div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-6 text-center">{{ direction["0"] }}</div>
            <div class="col-6 text-center">{{ direction["1"] }}</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { APIRequest } from "../assets/js/getAPI";

export default {
  props: {
    filterOption: Object,
  },
  data() {
    return {
      userInput: {
        keyword: "",
        type: "ScenicSpot",
        city: "all",
      },
      bannerUrl: "",
      busUserInput: {
        city: "Hsinchu",
        routeName: "none",
      },
      types: {
        ScenicSpot: "景點",
        Restaurant: "餐飲",
        Hotel: "住宿",
        Activity: "活動",
      },
      citys: {
        Taichung: "臺中市",
        MiaoliCounty: "苗栗縣",
        Keelung: "基隆市",
        Taoyuan: "桃園市",
        PingtungCounty: "屏東縣",
        YunlinCounty: "雲林縣",
        ChanghuaCounty: "彰化縣",
        Chiayi: "嘉義市",
        NewTaipei: "新北市",
        TaitungCounty: "臺東縣",
        HualienCounty: "花蓮縣",
        Taipei: "臺北市",
        LienchiangCounty: "連江縣",
        Kaohsiung: "高雄市",
        Tainan: "臺南市",
        HsinchuCounty: "新竹縣",
        ChiayiCounty: "嘉義縣",
        NantouCounty: "南投縣",
        Hsinchu: "新竹市",
        YilanCounty: "宜蘭縣",
        KinmenCounty: "金門縣",
        PenghuCounty: "澎湖縣",
      },
      busRoutes: [],
      position: {
        latitude: 0,
        longitude: 0,
      },
    };
  },
  methods: {
    doFilter() {
      let vm = this;
      let newPath;
      if (!this.$route.meta.bus)
        newPath = `/Search/${vm.userInput.type}/${vm.userInput.city}/${vm.userInput.keyword}`;
      else
        newPath = `/Bus/${vm.busUserInput.city}/${vm.busUserInput.routeName}/0`;

      this.$router.push(newPath);
    },
    getBusRoute() {
      let vm = this;
      let api = `v2/Bus/Route/City/${vm.busUserInput.city}?$top=10&$format=JSON`;
      vm.busRoutes = [];
      APIRequest(api).then((res) => {
        vm.busRoutes = res.data;
      });
    },
    getPosition() {
      let vm = this;

      if (!("geolocation" in navigator)) {
        result = "您的裝置未支援定位系統";
        return result;
      }

      navigator.geolocation.getCurrentPosition(
        function (pos) {
          let newPath = `/Location/${vm.userInput.type}/?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
          vm.$router.push(newPath);
        },
        function (err) {
          console.log(err.message);
        }
      );
    },
  },
  created() {
    if (this.$route.meta.bus) this.getBusRoute();
  },
  mounted() {
    if (this.filterOption) {
      this.userInput = {
        keyword: this.filterOption.keyword,
        type: this.filterOption.type,
        city: this.filterOption.city == "" ? "all" : this.filterOption.city,
      };
    }
  },
  computed: {
    getBanner() {
      let hour = new Date().getHours();
      let pics;
      if (hour >= 5 && hour < 18) pics = [1, 2];
      else pics = [3, 4];

      let pic = pics[Math.floor(Math.random() * pics.length)];
      return `bannerBg${pic}.jpg`;
    },
  },
};
</script>

<style lang="scss" scoped>
$pink: #ff1d6c;

.bg {
  max-height: 700px;
  img {
    max-height: 700px;
    object-fit: cover;
  }
}

.mb-serach {
  height: 30px;
  width: 30px;
  box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
  border-radius: 4px;
}

.btn-location,
.pc-serach {
  height: 40px;
  width: 40px;
}

.active {
  color: $pink;
}

.pc-filter {
  position: relative;
  &.bus {
    height: 20vh;
  }
  &-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    input,
    select {
      height: 40px;
      border: none;
      box-shadow: 1px 1px 5px #000;
    }
  }
}
</style>