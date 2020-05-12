<template>
  <div class="single-post-page">
    <section class="post">
      <h1>{{loaddedPost.title}}</h1>
      <div class="post-details">
        <div>Last updated on {{loaddedPost.updatedDate}}</div>
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
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loaddedPost: {
          id: "1",
          title: `First Post (ID: ${context.params.id})`,
          previewText: "This id out first post",
          author: "Lior",
          updatedDate: new Date(),
          thumbnail:
            "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          content: "Content of the post"
        }
      });
    }, 1000);
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