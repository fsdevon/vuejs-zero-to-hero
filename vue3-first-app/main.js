const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false
    };
  },
  methods: {
    updateCard(id) {
      this.cart.push(id);
    }
  }
});
