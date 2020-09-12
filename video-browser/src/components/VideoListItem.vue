<template>
  <li class="media list-group-item" @click="onVideoSelect">
    <img :src="thumbnaiUrl" class="mr-3" />
    <div class="media-body">
      {{ video.snippet.title }}
    </div>
  </li>
</template>

<script>
export default {
  name: "VideoListItem",
  props: ["video"],
  computed: {
    thumbnaiUrl() {
      return this.video.snippet.thumbnails.default.url;
    }
  },
  methods: {
    onVideoSelect() {
      this.$emit("videoSelect", this.video);
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  cursor: pointer;
}

li:hover {
  background-color: #eee;
}
</style>
