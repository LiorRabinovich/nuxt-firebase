<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loaddedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm
  },
  layout: 'admin',
  data() {
    return {
      loaddedPost: {
        author: "Lior",
        title: "Test Post",
        thumbnailLink:
          "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        content: "TEXT TEXT TEXT test post"
      }
    };
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>