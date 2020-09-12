<template>
  <div class="ui secondary pointing menu">
    <a class="item">
      Home
    </a>

    <div class="right menu">
      <a class="ui item active" @click="login">
        Login
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppHeader",
  methods: {
    ...mapActions(["login"])
  }
};
</script>

<style scoped></style>
