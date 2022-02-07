<template>
  <div>
    <TheHeader />

    <Cards />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";

import TheHeader from "@/components/Header.vue";

export default {
  components: {
    Cards,
    TheHeader,
  },
};
</script>