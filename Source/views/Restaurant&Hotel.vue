<template>
  <div>
    <Navbar />
    <div class="bg-light">
      <section class="py-5">
        <div class="container">
          <h4 class="h5 mb-3">
            <img
              class="me-1"
              src="../assets/images/square.svg"
              alt=""
              srcset=""
            />
            熱門美食
          </h4>
          <ul class="list-unstyled grid" style="--bs-columns: 10">
            <lottie-animation path="./loading.json" v-show="isLoading" />
            <li
              class="sideShadowXs g-col-5 g-col-md-2"
              v-for="item in hotRestaurants"
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
      <section class="py-5">
        <div class="container">
          <h4 class="h5 mb-3">
            <img
              class="me-1"
              src="../assets/images/square.svg"
              alt=""
              srcset=""
            />
            熱門住宿
          </h4>
          <ul class="list-unstyled grid" style="--bs-columns: 10">
            <lottie-animation path="./loading.json" v-show="isLoading" />
            <li
              class="sideShadowXs g-col-5 g-col-md-2"
              v-for="item in hotHotels"
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
    </div>
    <detail-modal :type="detailType" :data="detailData"></detail-modal>
  </div>
</template>

<script>
import { APIRequest } from "../assets/js/getAPI";
import Navbar from "../components/Navbar.vue";
import DetailModal from "../components/DetailModal.vue";

export default {
  name: "Restaurant&Hotel",
  components: {
    Navbar,
    DetailModal,
  },
  data() {
    return {
      hotHotels: [],
      hotRestaurants: [],
      detailType: "",
      detailData: {},
      filterData: [],
    };
  },
  methods: {
    getOrderColumn() {
      let columns = ["ID", "Name", "Address"];
      return columns[Math.floor(Math.random() * columns.length)];
    },
    getHotRestaurants() {
      let vm = this;
      let api = `v2/Tourism/Restaurant?$filter=Picture/PictureUrl1%20ne%20null&$orderby=${vm.getOrderColumn()}%20asc&$top=10&$format=JSON`;
      APIRequest(api).then((res) => {
        vm.hotRestaurants = res.data;
      });
    },
    getHotHotels() {
      let vm = this;
      let api = `v2/Tourism/Hotel?$filter=Picture/PictureUrl1%20ne%20null&$orderby=${vm.getOrderColumn()}%20asc&$top=10&$format=JSON`;
      APIRequest(api).then((res) => {
        vm.hotHotels = res.data;
      });
    },
  },
  created() {
    document.title = "美食住宿 - 台灣旅遊景點導覽";
    this.getHotRestaurants();
    this.getHotHotels();
  },
};
</script>

<style  lang="scss">
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