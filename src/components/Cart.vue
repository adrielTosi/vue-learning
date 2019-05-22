<template>
  <div>
    <ul class="list-group">
      <li v-for="item in items" :key="item.id" class="list-group-item">
        {{ item.title }} - $ {{ item.price }}
        <button
          @click="$emit('remove-from-cart', item.id)"
          class="btn badge badge-danger float-right"
        >Remove.</button>
      </li>
    </ul>
    <Total :total="total"/>
    <button
      :disabled="items.length === 0"
      @click="$emit('pay')"
      class="btn-btn-info form-control"
    >Pay now.</button>
  </div>
</template>

<script>
import Total from "./Total";

export default {
  props: ["items"],
  components: {
    Total
  },
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>
