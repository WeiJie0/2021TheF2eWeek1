<template>
  <div class="container">
    <h4 class="h5 mb-3">
      <img class="me-1" src="../assets/images/square.svg" alt="" srcset="" />
      {{ title }}
    </h4>
    <ul class="list-unstyled grid" style="--bs-columns: 10">
      <li
        class="sideShadowXs g-col-5 g-col-md-2"
        v-for="item in data"
        :key="item.ID"
        @click.prevent="
          detailType = 'filter';
          detailData = item;
        "
        data-bs-toggle="modal"
        data-bs-target="#detailModal"
      >
        <div class="fItem card">
          <div class="h-100 p-3">
            <div>
              <img
                class="img-fluid fItemImg"
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
              <h5 class="fItemTitle my-3">{{ item.Name }}</h5>

              <div class="d-flex justify-content-start align-items-center">
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

                  <span class="fItemLocation text-success">{{
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
</template>

<script>
export default {
  name: "FilterContent",
  data() {
    return {
      picIndex: 0,
    };
  },
  props: {
    title: String,
    data: Object,
  },
};
</script>

<style>
</style>