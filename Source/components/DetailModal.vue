<template>
  <div>
    <div
      class="modal fade"
      id="detailModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div
            class="btn modalClose"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <img
              src="../assets/images/close.png"
              class="img-fluid"
              alt=""
              srcset=""
            />
          </div>
          <div class="modal-body p-3 p-md-5">
            <div class="detailImg" v-if="pictures.length > 0">
              <img
                v-for="(pic, index) in pictures"
                :key="pic"
                class="img-fluid"
                :src="pic"
                v-show="index == picIndex"
              />
              <div
                class="d-flex justify-content-end mt-4"
                v-if="pictures.length > 1"
              >
                <div
                  class="btn imgChange imgChangePrev"
                  :class="{ disabled: picIndex == 0 }"
                  @click.prevent="imgChangePrev()"
                >
                  ◀
                </div>
                <div
                  class="btn imgChange imgChangeNext"
                  :class="{ disabled: picIndex == pictures.length - 1 }"
                  @click.prevent="imgChangeNext()"
                >
                  ▶
                </div>
              </div>
            </div>
            <div class="detailImg" v-else>
              <img src="../assets/images/noImage.jpg" alt="" srcset="" />
            </div>
            <h2 class="detailTitle h5 mt-4">{{ data.Name }}</h2>
            <div class="detailDec mt-4" v-html="data.Description"></div>

            <div class="d-flex flex-wrap justify-content-around mt-3">
              <div class="detailNotes mt-2 w-50">
                <img
                  class="img-fluid"
                  src="../assets/images/icon-time-pink.svg"
                />
                <span>{{
                  type == "active"
                    ? data.StartTime || "未提供"
                    : data.OpenTime || "未提供"
                }}</span>
              </div>
              <div class="detailNotes mt-2 w-50">
                <img
                  class="img-fluid"
                  src="../assets/images/icon-time-pink.svg"
                  v-show="type == 'active'"
                />
                <img
                  class="img-fluid"
                  src="../assets/images/icon-ticket-pink.svg"
                  v-show="type != 'active'"
                />
                <span>{{
                  type == "active"
                    ? data.EndTime || "未提供"
                    : data.TicketInfo || "未提供"
                }}</span>
              </div>
              <div class="detailNotes mt-2 w-50">
                <img
                  class="img-fluid"
                  src="../assets/images/icon-location-pink.svg"
                />
                <span>{{
                  type == "active"
                    ? data.Location || "未提供"
                    : data.Address || "未提供"
                }}</span>
              </div>
              <div class="detailNotes mt-2 w-50">
                <img
                  class="img-fluid"
                  src="../assets/images/icon-tel-pink.svg"
                />
                <span>{{
                  type == "active"
                    ? data.Organizer || "未提供"
                    : data.Phone || "未提供"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailModal",
  data() {
    return {
      picIndex: 0,
    };
  },
  props: {
    type: String,
    data: Object,
  },
  methods: {
    imgChangeNext() {
      let vm = this;
      if (vm.picIndex < this.pictures.length - 1) vm.picIndex++;
    },
    imgChangePrev() {
      let vm = this;
      if (vm.picIndex > 0) vm.picIndex--;
    },
  },
  computed: {
    pictures() {
      let vm = this;
      if (Object.keys(vm.data).length > 0) {
        return Object.keys(vm.data.Picture)
          .filter((item) => item.indexOf("Url") > -1)
          .map((item) => vm.data.Picture[item]);
      } else {
        return "";
      }
    },
  },
  watch: {
    data: function (N, O) {
      this.picIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &Close {
    position: absolute;
    right: -10%;
    transition: 0.3s all ease-in-out;
    &:hover {
      transform: scale(1.15);
    }
  }
  .imgChange {
    width: 32px;
    height: 32px;
    font-size: 0.5rem;
    display: flex;
    margin: 0 5px;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 1px 1px 5px #d8d8d8;
    &.disabled {
      background-color: #fff;
      color: #000;
      cursor: not-allowed;
    }
  }
}
.detail {
  &Img img {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
  &Dec,
  &Notes {
    font-size: 14px;
    & img {
      margin-right: 5px;
      height: 24px;
      width: 24px;
    }
  }
}
</style>