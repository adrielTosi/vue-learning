<template>
  <div class="card my-3">
    <div class="card-header font-weight-bolder">{{article.title}}</div>
    <div class="card-body">
      <p class="my-3">{{ article.content.substring(0,200) + "..." }}</p>
      <router-link :to="`/article/${article.slug}`" class="badge btn-success">Read more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"]
};
</script>
