<template>
  <div>
    <Navbar :direction="getRouteDerectionStop" />
    <div class="bg-light">
      <div class="container">
        <div
          class="busContent bg-white p-3"
          v-for="item in newBusData"
          :key="item.PlateNumb"
        >
          <ul class="busContentInfo p-3 d-flex flex-column flex-wrap list-unstyled">
            <li
              class="p-3 w-50"
              v-for="item in newRouteData[0].Stops"
              :key="item.StopID"
            >
              {{ item.StopName.Zh_tw }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIRequest } from "../assets/js/getAPI";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Bus",
  components: {
    Navbar,
  },
  data() {
    return {
      isLoading: false,
      routeData: [],
      busData: [],
    };
  },
  methods: {
    getFilterData() {
      let vm = this;
      let city, routeID, busApi, routeApi;

      if (this.$route.params.city && this.$route.params.routeID) {
        city = this.$route.params.city;
        routeID = this.$route.params.routeID;

        busApi = `v2/Bus/RealTimeNearStop/City/${city}/${routeID}?$top=30&$format=JSON`;
        routeApi = `v2/Bus/DisplayStopOfRoute/City/${city}/${routeID}?$top=30&$format=JSON`;

        vm.routeData = [];
        vm.isLoading = true;

        APIRequest(routeApi).then((res) => {
          vm.routeData = res.data;
          APIRequest(busApi).then((res) => {
            vm.busData = res.data;
            vm.isLoading = false;
          });
        });
      }
    },
  },
  created() {
    this.getFilterData();
  },
  computed: {
    getRouteDerectionStop() {
      let vm = this;
      let result = {};
      if (vm.routeData.length != 0) {
        result = {
          0: vm.routeData[0]["Stops"][0]["StopName"]["Zh_tw"],
          1: vm.routeData[1]["Stops"][0]["StopName"]["Zh_tw"],
        };
      }
      return result;
    },
    newRouteData() {
      let vm = this;
      let result = [];
      if (vm.routeData.length != 0) {
        result = vm.routeData.filter(
          (item) => item.Direction == this.$route.params.direction
        );
      }
      return result;
    },
    newBusData() {
      let vm = this;
      let result = [];
      if (vm.busData.length != 0) {
        result = vm.busData.filter(
          (item) => item.Direction == this.$route.params.direction
        );
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.busContent {
  width: 80%;
  margin: 0 auto;
  &Info{
      max-height: 1500px;
      li{
          border: 1px solid #000;
          border-radius: 15px;
      }
  }
}
</style>