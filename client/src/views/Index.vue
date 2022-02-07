<template>
  <div>
    <Navigation />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
import Navigation from "../components/Nav.vue";
import TheFooter from "../components/Footer.vue";
export default {
  components: {
    Navigation,
    TheFooter,
  },
};
</script>