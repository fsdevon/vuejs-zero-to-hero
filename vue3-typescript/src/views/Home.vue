<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world name="fsdevon" msg="Welcome to Your Vue.js + TypeScript App" />
    <user-repositories user="fsdevon" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import UserRepositories from "@/components/UserRepositories.vue";
@Options({
  components: {
    HelloWorld,
    UserRepositories
  }
})
export default class Home extends Vue {}
</script>
