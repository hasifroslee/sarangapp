<template>
  <div id="app">
    <b-img class="mb-5" alt="Hydroganate" src="./assets/logo.png" fluid></b-img>
    <OrderPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import OrderPage from "./components/OrderPage.vue";

@Component({
  components: {
    OrderPage
  }
})
export default class App extends Vue.use(BootstrapVue) {}
</script>

<style>
html {
  background-color: #282e35;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #282e35;
}
</style>
