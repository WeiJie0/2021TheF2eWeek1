<template>
  <div>
    <Navbar :filterOption="filterOption" />
    <div class="content bg-light">
      <section class="py-5">
        <div class="container">
          <h4 class="h5 mb-3">
            <img
              class="me-1"
              src="../assets/images/triango.svg"
              alt=""
              srcset=""
              v-if="typeName == '景點資料'"
            />
            <img
              class="me-1"
              src="../assets/images/square.svg"
              alt=""
              srcset=""
              v-else
            />
            {{ typeName }}
          </h4>
          <ul class="list-unstyled grid" style="--bs-columns: 10">
            <lottie-animation path="./loading.json" v-show="isLoading" />
            <li
              class="sideShadowXs g-col-5 g-col-md-2"
              v-for="item in datas"
              :key="item.ID"
              @click.prevent="
                detailType = 'citys';
                detailData = item;
              "
              data-bs-toggle="modal"
              data-bs-target="#detailModal"
            >
              <div class="Item card">
                <div class="h-100 p-3">
                  <div>
                    <img
                      class="img-fluid ItemImg"
                      :src="
                        Object.keys(item.Picture).length > 0
                          ? item.Picture.PictureUrl1
                          : require('../assets/images/noImage.jpg')
                      "
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div>
                    <h5 class="ItemTitle my-3">{{ item.Name }}</h5>

                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <div class="location d-flex justify-content-around">
                        <svg
                          class="me-1"
                          width="17"
                          height="21"
                          viewBox="0 0 17 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.5 20.2777C8.5 20.2777 16.5 14.9444 16.5 8.72217C16.5 6.60044 15.6571 4.56561 14.1569 3.06531C12.6566 1.56502 10.6217 0.722168 8.5 0.722168C6.37827 0.722168 4.34344 1.56502 2.84315 3.06531C1.34285 4.56561 0.5 6.60044 0.5 8.72217C0.5 14.9444 8.5 20.2777 8.5 20.2777ZM11.1676 8.72236C11.1676 10.1951 9.97364 11.389 8.50088 11.389C7.02812 11.389 5.83421 10.1951 5.83421 8.72236C5.83421 7.2496 7.02812 6.05569 8.50088 6.05569C9.97364 6.05569 11.1676 7.2496 11.1676 8.72236Z"
                            fill="#FF1D6C"
                          />
                        </svg>

                        <span class="ItemLocation text-success">{{
                          item.Address
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <infinite-loading class="bg-light" @infinite="infiniteHandler">
        <div slot="spinner">
          <lottie-animation path="./loading.json" :width="256" :height="256" />
        </div>
        <div slot="no-more">已經沒有更多資料了</div>
        <div slot="no-results">
          <div class="d-flex justify-content-center">
            <div>
              <img class="img-fluid" src="../assets/images/Union.svg" />
            </div>
            <div
              class="d-flex flex-column align-items-start p-1"
              style="line-height: 0.5"
            >
              <b class="text-warning p-2">Oop！</b>
              <span class="p-2 text-gray"
                >很抱歉，找不到符合此搜尋相關的內容</span
              >
            </div>
          </div>
        </div>
      </infinite-loading>
    </div>

    <detail-modal :type="detailType" :data="detailData"></detail-modal>
  </div>
</template>

<script>
import { APIRequest } from "../assets/js/getAPI";
import Navbar from "../components/Navbar.vue";
import DetailModal from "../components/DetailModal.vue";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  name: "Search",
  components: {
    Navbar,
    DetailModal,
    LottieAnimation,
  },
  data() {
    return {
      isLoading: false,
      loadtimes: 0,
      dataType: "",
      datas: [],
      detailType: "",
      detailData: {},
      filterData: [],
      filterOption: {},
      currentAPI: "",
    };
  },

  methods: {
    getFilterData(IsFirst) {
      let vm = this;

      if (!this.$route.meta.useLocation) {
        let type, filterStr, city, keyword;
        if (this.$route.params.keyword) {
          filterStr = `%20and%20contains(Name,'${this.$route.params.keyword}')%20or%20contains(Description,'${this.$route.params.keyword}')%20`;
          keyword = this.$route.params.keyword;
        } else {
          filterStr = "";
          keyword = "";
        }
        if (this.$route.params.type && this.$route.params.type != "none")
          type = this.$route.params.type;

        if (this.$route.params.city && this.$route.params.city != "all")
          city = this.$route.params.city;
        else city = "";

        vm.filterOption = { keyword, city, type };

        vm.currentAPI = `v2/Tourism/${type}/${city}?$top=25&$filter=Picture/PictureUrl1%20ne%20null${filterStr}&$format=JSON`;
      } else {
        let type = this.$route.params.type;
        let latitude = this.$route.query.lat;
        let longitude = this.$route.query.lon;

        vm.currentAPI = `v2/Tourism/${type}?$top=25&$filter=Picture/PictureUrl1%20ne%20null&$spatialFilter=nearby(Position,${latitude},${longitude},1000)&$format=JSON`;
      }

      vm.datas = [];
      vm.loadtimes = 0;
      if (!IsFirst) {
        vm.isLoading = true;
        APIRequest(vm.currentAPI).then((res) => {
          vm.datas = res.data;
          vm.loadtimes++;
          vm.isLoading = false;
        });
      }
    },
    infiniteHandler($state) {
      let vm = this;
      let skipCount = 25 * parseInt(vm.loadtimes);
      let api = `${vm.currentAPI}&$skip=${skipCount}`;
      APIRequest(api).then((res) => {
        if (res.data.length) {
          vm.loadtimes++;
          vm.datas.push(...res.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      this.loadtimes = 0;
      this.getFilterData(false);
    },
  },
  created() {
    document.title = `搜尋 - 台灣旅遊景點導覽`;
    this.getFilterData(true);
  },
  computed: {
    typeName() {
      let type = this.$route.params.type;
      if (type == "ScenicSpot") return "景點資料";
      else if (type == "Restaurant") return "美食資料";
      else if (type == "Hotel") return "旅宿資料";
      else if (type == "Active") return "活動資料";
    },
  },
};
</script>

<style  lang="scss">
.content {
  min-height: 60vh;
}
.Item {
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: 0.3s all ease-in-out;
  }
  &Title {
    font-size: 14px;
    font-weight: bolder;
    line-height: 21px;
    height: 24px;
  }
  &Img {
    height: 150px;
    max-height: 150px;
    width: 100%;
    object-fit: cover;
  }
  &Location {
    font-size: 12px;
    line-height: 14px;
    height: 28px;
  }
}
</style>