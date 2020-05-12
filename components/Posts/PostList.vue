<template>
  <section class="post-list">
    <PostPreview
      id="1"
      thumbnail="https://africatechradio.com/wp-content/uploads/2020/04/Technology-industry-720x430-1.jpg"
      title="Hello 1"
      previewText="this my first post"
    />
    <PostPreview
      id="1"
      thumbnail="https://africatechradio.com/wp-content/uploads/2020/04/Technology-industry-720x430-1.jpg"
      title="Hello 2"
      previewText="this my first post 2"
    />
  </section>
</template>

<script>
import PostPreview from "~/components/Posts/PostPreview.vue";

export default {
  components: {
    PostPreview
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>