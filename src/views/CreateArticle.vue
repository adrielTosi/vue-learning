<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <picture-input
              accept="image/jpeg, image/png"
              size="5"
              button-class="badge btn-success"
              @change="onChange"
            ></picture-input>
            <input :v-model="title" type="text" placeholder="Title" class="my-5 form-control">
            <wysiwyg :v-model="content"/>
            <select name class="form-control" v-model="category">
              <option selected>Select a Category</option>
              <option
                :key="category.id"
                :value="category.id"
                v-for="category in categories"
              >{{category.name}}</option>
            </select>

            <button @click="createArticle()" class="btn btn-success float-right mt-3">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import axios from "axios";
import config from "@/config";
export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next("/");
    }
    next();
  },
  data() {
    return {
      content: "",
      title: "",
      img: null,
      categories: [],
      category: []
    };
  },
  components: {
    PictureInput
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    onChange(img) {
      this.img = img;
    },
    createArticle() {
      const form = new FormData();
      form.append("file", this.img);
      form.append("upload_preset", env.process.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", env.process.VUE_APP_CLOUDINARY_PRESET_API_KEY);

      axios
        .post(env.process.VUE_APP_CLOUDINARY_PRESET_URL, form)
        .then(res => {
          axios
            .post(
              `${config.apiUrl}/articles`,
              {
                title: this.title,
                content: this.content,
                category_id: this.category,
                image_url: res.data.secure_url
              },
              {
                headers: {
                  Authorization: "Bearer " + this.$root.auth.token
                }
              }
            )
            .then(() => {
              this.$noty.success("Article created successfully");
              this.$router.push("/");
            })
            .catch(() => this.$noty.error("Something went wrong..."));
        })
        .catch(() => this.$noty.error("Something went wrong..."));
    },
    getCategories() {
      const categories = localStorage.getItem("categories");
      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }
      axios.get(`${config.apiUrl}/categories`).then(res => {
        this.categories = res.data.categories;
        localStorage.setItem("categories", JSON.stringify(this.categories));
      });
    }
  }
};
</script>
