<template>
  <form>
    <div class="row">
      <div class="col-md-6 offset-md-3 form-group">
        <label>Quote</label>
        <textarea class="form-control" rows="3" v-model="quote"></textarea>
      </div>
      <div class="col-md-6 offset-md-3 form-group">
        <button class="btn btn-primary" @click.prevent="createNew">Add Quote</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      quote: "",
    };
  },
  methods: {
    createNew() {
      this.$emit("quoteAdded", this.quote);
      this.quote = "";
    },
  },
};
</script>

<style scoped>
</style>