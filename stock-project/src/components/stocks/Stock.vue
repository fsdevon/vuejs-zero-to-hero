<template>
  <div class="col-md-6 col-md-4">
    <div class="card mb-3">
      <div class="card-header">
        {{ stock.name }}
        <small>(Price: {{ stock.price }})</small>
      </div>
      <div class="card-body">
        <div class="d-flex">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger: insufficientFunds}"
          />
          <button
            class="btn btn-success ml-3"
            @click="buyStock"
            :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(+quantity)"
          >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
<script>
export default {
  props: {
    stock: Object,
  },
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: +this.quantity,
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
  },
};
</script>
