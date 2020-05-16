<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loaddedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  components: {
    AdminPostForm
  },
  layout: "admin",
  // middleware: ['checkAuth', 'auth'],
  asyncData(context) {
    return context.app.$fireStore
      .collection("posts")
      .doc(context.params.postId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          context.error(doc);
          return {
            loaddedPost: {}
          };
        } else {
          return {
            loaddedPost: { ...doc.data(), id: context.params.postId }
          };
        }
      })
      .catch(e => {
        context.error(e);
      });
  },
  methods: {
    onSubmit(postData) {
      this.$store
        .dispatch("editPost", postData)
        .then(() => {
          this.$router.push("/admin");
        })
        .catch(error => {
          console.log({ error });
          alert("d12fs5ad3");
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