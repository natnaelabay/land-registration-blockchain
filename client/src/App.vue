<template>
  <div id="app">
    <!-- <Navigation /> -->
    <router-view />
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
// import App from "./utils/web3";
// import Web12 from './libs/web3'
import Navigation from "./components/Nav.vue";
import TheFooter from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Navigation,
    TheFooter,
  },
  created() {
    this.$store.dispatch("BChain/init").then((a) => {
      console.log(this.$store.state.BChain.instance);
      this.$store.dispatch("BChain/getLands");
      this.$store.dispatch("BChain/getLandsWithOwnerDetail");
      this.$store.dispatch("BChain/getMyLands");
      this.$store.dispatch("BChain/getAllTransactions");
      this.$store.dispatch("BChain/getMyTransactions");
    });
  },
};
</script>

<style>
</style>
