<template>
  <div class="posts-page">
    <PostList :posts="loaddedPosts" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      loaddedPosts: [
        {
          id: "1",
          title: "First Post",
          previewText: "This id out first post",
          thumbnail:
            "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          content: "Content of the post"
        },
        {
          id: "2",
          title: "First Post",
          previewText: "This id out first post",
          thumbnail:
            "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          content: "Content of the post"
        }
      ]
    };
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