<template>
  <div>
    <Navbar />
    <div class="home bg-light">
      <section id="citys"></section>
      <section id="actives" class="py-5">
        <div class="container">
          <h4 class="h5 mb-3">
            <img
              class="me-1"
              src="../assets/images/triango.svg"
              alt=""
              srcset=""
            />
            熱門活動
          </h4>
          <ul class="list-unstyled row g-4">
            <li
              class="sideShadowSm col-md-6"
              v-for="(item, index) in hotActives"
              :key="index"
            >
              <div class="aItem card">
                <div class="row h-100 p-3">
                  <div class="col-5">
                    <img
                      class="img-fluid aItemImg"
                      :src="
                        Object.keys(item.Picture).length > 0
                          ? item.Picture.PictureUrl1
                          : require('../assets/images/noImage.jpg')
                      "
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div class="col-7">
                    <h5 class="aItemTitle">{{ item.Name }}</h5>
                    <p class="aItemDec">{{ item.Description }}</p>

                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div
                        class="
                          location
                          d-flex
                          justify-content-around
                          align-items-center
                        "
                      >
                        <svg
                          class="me-3"
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

                        <span>{{ item.Location }}</span>
                      </div>
                      <a
                        href="#"
                        class="btn btn-outline-pink px-3 rounded-3"
                        data-bs-toggle="modal"
                        data-bs-target="#detailModal"
                        @click.prevent="
                          detailType = 'active';
                          detailData = item;
                        "
                        >活動詳情</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section id="restaurants" class="pb-5">
        <div class="container">
          <h4 class="h5 mb-3">
            <img
              class="me-1"
              src="../assets/images/square.svg"
              alt=""
              srcset=""
            />
            熱門餐飲
          </h4>
          <ul class="list-unstyled grid" style="--bs-columns: 10">
            <li
              class="sideShadowXs g-col-5 g-col-md-2"
              v-for="item in hotRestaurant"
              :key="item.ID"
              @click.prevent="
                detailType = 'restaurant';
                detailData = item;
              "
              data-bs-toggle="modal"
              data-bs-target="#detailModal"
            >
              <div class="rItem card">
                <div class="h-100 p-3">
                  <div>
                    <img
                      class="img-fluid rItemImg"
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
                    <h5 class="rItemTitle my-3">{{ item.Name }}</h5>

                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <div
                        class="
                          location
                          d-flex
                          justify-content-around
                          align-items-center
                        "
                      >
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

                        <span class="rItemLocation text-success">{{
                          item.City
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
    </div>
    <detail-modal :type="detailType" :data="detailData"></detail-modal>
  </div>
</template>


<script>
import { APIRequest } from "../assets/js/getAPI";
import Navbar from "../components/Navbar.vue";
import DetailModal from "../components/DetailModal.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    DetailModal,
  },
  data() {
    return {
      hotCitys: [],
      hotActives: [],
      hotRestaurant: [],
      detailType: "",
      detailData: {},
    };
  },
  methods: {
    getOrderColumn() {
      let columns = ["ID", "Name", "Address"];
      return columns[Math.floor(Math.random() * columns.length)];
    },
    getHotCitys() {
      let vm = this;
      let api = `v2/Tourism/ScenicSpot?$top=10&$filter=Picture/PictureUrl1%20ne%20null&$orderby=${vm.getOrderColumn()}%20asc&$format=JSON`;
      APIRequest(api).then((res) => {
        vm.hotCitys = res.data;
      });
    },
    getHotActives() {
      let vm = this;
      let api = `v2/Tourism/Activity?$filter=not%20contains(Name,'暫停')%20and%20not%20contains(Name,'延期')%20and%20not%20contains(Name,'取消')%20and%20City%20ne%20null%20&$orderby=${vm.getOrderColumn()}%20asc&$top=4&$format=JSON`;
      APIRequest(api).then((res) => {
        vm.hotActives = res.data;
      });
    },
    getHotRestaurant() {
      let vm = this;
      let api = `/v2/Tourism/Restaurant?$filter=City%20ne%20null&$top=10&$orderby=${vm.getOrderColumn()}%20asc&$format=JSON`;
      APIRequest(api).then((res) => {
        vm.hotRestaurant = res.data;
      });
    },
  },
  created() {
    document.title = "台灣旅遊景點導覽"
    this.getHotActives();
    this.getHotRestaurant();
  },
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 20px;
}
.aItem {
  position: relative;
  max-height: 230px;

  &Title {
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  &Dec {
    font-size: 0.875rem;
    color: rgba(172, 172, 172, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  &Img {
    height: 100%;
    object-fit: cover;
  }
}
.rItem {
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
  }
}
</style>