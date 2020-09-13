<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "Default",
  data() {
    return {
      displaySidenav: false,
    };
  },
};
</script>
<style>
html,
body {
  font-family: "Open Sans", sans-serif;
}
body {
  margin: 0;
}
</style>
