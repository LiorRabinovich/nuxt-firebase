<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loaddedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm
  },
  layout: "admin",
  asyncData(context) {
    return axios
      .get(
        `https://nuxt-firebase-226d5.firebaseio.com/posts/${context.params.postId}.json`
      )
      .then(res => {
        if (!res.data) {
          context.error(new Error());
          return;
        }

        return {
          loaddedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => {
        context.error(e);
      });
  },
  methods: {
    onSubmit(postData) {
      this.$store.dispatch("editPost", postData).then(() => {
        this.$router.push("/admin");
      });
    }
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