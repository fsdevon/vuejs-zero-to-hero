<template>
  <div id="app" class="container">
    <Header :quoteCount="quotes.length" :maxQuotes="maxQuotes" />
    <NewQuote @quoteAdded="newQuote" />
    <QuoteGrid :quotes="quotes" @quoteDeleted="deleteQuote" />
    <div class="row mt-3">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">Info: Click on a Quote to delete it!</div>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteGrid from "./components/QuoteGrid";
import NewQuote from "./components/NewQuote";
import Header from "./components/Header";

export default {
  name: "App",
  data: function () {
    return {
      quotes: ["Just a Quote to see something"],
      maxQuotes: 10,
    };
  },
  methods: {
    newQuote(quote) {
      if (this.quotes.length >= this.maxQuotes) {
        return alert("Please delete Quotes first!");
      }
      this.quotes.push(quote);
    },
    deleteQuote(index) {
      this.quotes.splice(index, 1);
    },
  },
  components: {
    QuoteGrid,
    NewQuote,
    Header,
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
