<template>
  <div class="row mt-4">
    <Stock v-for="(stock, index) in stocks" :key="index" :stock="stock"></Stock>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "./Stock";

export default {
  components: {
    Stock,
  },
  computed: {
    ...mapGetters({
      stocks: "stockPortfolio",
    }),
  },
};
</script>
