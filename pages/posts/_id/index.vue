<template>
  <div class="single-post-page" v-if="loaddedPost">
    <section class="post">
      <h1>{{loaddedPost.title}}</h1>
      <div class="post-details">
        <div>Last updated on {{loaddedPost.updatedDate | date}}</div>
        <div>Written by {{loaddedPost.author}}</div>
      </div>
      <p class="post-content">{{loaddedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send a mail to
        <a
          href="mailto://bla@gmail.com"
        >bla@gmail.com</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$fireStore
      .collection("posts")
      .doc(context.params.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          context.error(doc);
          return {
            loaddedPost: {}
          };
        } else {
          return {
            loaddedPost: doc.data()
          };
        }
      })
      .catch(e => {
        context.error(e);
      });
  },
  head: {
    title: "Single blog"
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>