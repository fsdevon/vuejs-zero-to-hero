<template>
  <div class="col-md-6 col-md-4">
    <div class="card mb-3">
      <div class="card-header">
        {{ stock.name }}
        <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
      </div>
      <div class="card-body">
        <div class="d-flex">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
            :class="{danger: insufficientQuantity}"
          />
          <button
            class="btn btn-primary ml-3"
            @click="sellStock"
            :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(+quantity)"
          >{{ insufficientQuantity ? 'Not enough Stocks' : 'Sell' }}</button>
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
import { mapActions } from "vuex";
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
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    },
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock",
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    },
  },
};
</script>
