<template>
  <div>
    <div class="d-flex mt-4 justify-content-between">
      <button
        @click="getPrevArticles()"
        :disabled="articles.prev_page_url === null"
        class="btn btn-warning"
      >Previous Page</button>
      <button
        @click="getNextArticles()"
        :disabled="articles.next_page_url === null"
        class="btn btn-warning"
      >Next Page</button>
    </div>
    <div class="row">
      <div v-if="!loading">
        <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
          <Article :article="article"/>
        </div>
      </div>
      <div class="loader text-center" v-else>
        <i class="fas fa-3x fa-spin fa-spinner"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import config from "@/config";
import Article from "../components/Articles";

export default {
  data() {
    return {
      articles: {},
      loading: true
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(url = `${config.apiUrl}/articles`) {
      this.loading = true;
      axios.get(url).then(res => {
        this.loading = false;
        this.articles = res.data.data;
      });
    },
    getNextArticles() {
      this.getArticles(this.articles.next_page_url);
    },
    getPrevArticles() {
      this.getArticles(this.articles.prev_page_url);
    }
  },
  components: {
    Article
  }
};
</script>
