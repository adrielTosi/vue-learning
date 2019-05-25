<template>
  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center mb-3">Login</h3>
          <div class="form-group">
            <input
              :class="{'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}"
              v-model="email"
              type="text"
              placeholder="email"
              class="form-control"
            >
            <div class="errors" v-if="errors.email">
              <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              :class="{'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted}"
              v-model="password"
              type="password"
              placeholder="password"
              class="form-control"
            >
            <div class="errors" v-if="errors.password">
              <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <button :disabled="loading" @click="loginUser()" class="btn btn-success float-right">
              <i class="fas fa-spin fa-spinner" v-if="loading"/>
              {{loading ? '' : 'Login'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next("/");
    }
    next();
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      loading: false,
      submitted: false
    };
  },
  methods: {
    loginUser() {
      this.loading = true;
      this.submitted = true;
      axios
        .post("https://react-blog-api.bahdcasts.com/api/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.loading = false;
          this.$root.auth = res.data.data;
          localStorage.setItem("auth", JSON.stringify(res.data.data));
          this.$noty.success("Welcome back!", { layout: "bottomRight" });
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.$noty.error("Oops, something went wrong", {
            layout: "bottomRight"
          });
          if (response.status === 401) {
            this.errors = {
              email: ["These credentials do not match."]
            };
          } else {
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
