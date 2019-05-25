<template>
  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center mb-3">Sign Up</h3>
          <div class="form-group">
            <input
              :class="{'is-invalid': this.errors.name, 'is-valid': !this.errors.name && this.submitted}"
              v-model="name"
              type="text"
              placeholder="Name"
              class="form-control"
            >
            <div class="errors" v-if="errors.name">
              <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
            </div>
          </div>
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
            <button :disabled="loading" @click="registerUser()" class="btn btn-success float-right">
              <i class="fas fa-spin fa-spinner" v-if="loading"/>
              {{ loading ? '' : 'Signup' }}
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
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      axios
        .post("https://react-blog-api.bahdcasts.com/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.loading = false;
          this.submitted = true;
          localStorage.setItem("auth", JSON.stringify(res.data.data));
          this.$root.auth = res.data.data;
          this.$noty.success("Welcome!", { layout: "bottomRight" });
          // Redirect to Home page
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.$noty.error("Oops, something went wrong", {
            layout: "bottomRight"
          });
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    }
  }
};
</script>
