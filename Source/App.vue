<template>
  <div id="app">
    <router-view />
    <div class="totop" @click.prevent="toTop()">
      <img src="./assets/images/icon1.svg" alt="" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footre.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {};
  },
  methods: {
    toTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap");
@import "./assets/scss/bootstrap";

.sideShadow,
.sideShadowSm,
.sideShadowXs {
  position: relative;
  z-index: 2;

  &::before,
  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 18px;
    left: 20px;
    width: 50%;
    top: 80%;
    max-width: 50%;
    background: #777;
    box-shadow: 0 15px 10px #777;
    transform: rotate(-3deg);
  }

  &::after {
    -webkit-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    -o-transform: rotate(3deg);
    -ms-transform: rotate(3deg);
    transform: rotate(3deg);
    right: 20px;
    left: auto;
  }
}

.sideShadowSm {
  &::before,
  &::after {
    max-width: 80%;
    width: 80%;
    bottom: 15px;
  }
}

.sideShadowXs {
  &::before {
    left: 5px;
  }
  &::after {
    right: 5px;
  }
  &::before,
  &::after {
    bottom: 10px;
  }
}
.totop {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 20px;
  bottom: 20px;
}
</style>
