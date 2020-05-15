<template>
  <div class="posts-page">
    <PostList :posts="loaddedPosts" />
  </div>
</template>


<script>
export default {
  computed: {
    loaddedPosts() {
      return this.$store.getters.loaddedPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>