<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div v-for="product in products" :key="product.id" class="col-md-6">
            <Products
              v-on:add-to-cart="addToCart(product)"
              :product="product"
              :isInCart="isInCart(product)"
            />
          </div>
        </div>
      </div>
      <div class="col-md-5 my-5">
        <Cart v-on:pay="pay()" v-on:remove-from-cart="removeFromCart($event)" :items="cart"/>
      </div>
    </div>
  </div>
</template>

<script>
import products from "@/products.json";
import Products from "./components/Products";
import Cart from "./components/Cart";

export default {
  name: "app",
  components: {
    Products,
    Cart
  },
  data() {
    return {
      products,
      cart: []
    };
  },
  methods: {
    addToCart(val) {
      this.cart.push(val);
    },
    isInCart(product) {
      const item = this.cart.find(item => item.id === product.id);
      if (item) {
        return true;
      } else {
        return false;
      }
    },
    removeFromCart(item) {
      const newCart = this.cart.filter(cartItem => cartItem.id !== item);
      this.cart = newCart;
    },
    pay() {
      (this.cart = []), alert("Shopping completed");
    }
  }
};
</script>

<style>
body {
  background-color: #fbf8f3;
}
</style>
