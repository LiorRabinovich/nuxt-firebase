<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  // middleware: ['checkAuth', 'auth'],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmit(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push('/admin');
      }).catch((error) => {
        console.log({error});
        alert('d12fs5ad3');
      });
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>