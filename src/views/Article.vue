<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div class="card" v-if="!loading">
          <img :src="article.imageUrl" class="card-img-top">
          <div class="card-body">
            <h1 class="card-title my-3">{{article.title}}</h1>
            <div class="article-content" v-html="article.content"></div>
          </div>
          <div class="comments my-4">
            <vue-disqus
              shortname="community-blog"
              :identifier="article.slug"
              :url="`window.location.href`"
            ></vue-disqus>
          </div>
        </div>
        <div class="loader text-center" v-else>
          <i class="fas fa-3x fa-spin fa-spinner"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  data() {
    return {
      article: {},
      loading: true
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios
        .get(`${config.apiUrl}/article/${this.$route.params.id}`)
        .then(res => {
          this.loading = false;
          this.article = res.data.data;
        });
    }
  }
};
</script>
