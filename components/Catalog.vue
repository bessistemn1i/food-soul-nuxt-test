<template>
  <div>
    <header>
      <h1 class="catalog__title">{{ title }}</h1>
    </header>
    <div class="catalog" v-if="products && products.length > 0">
      <Product
        v-for="(product, productIndex) in products"
        :key="productIndex"
        :product="product"
      >
      </Product>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Product from "@/components/Product.vue";
import { RootState } from "@/store";
import { IProduct } from "~/services/services.i";
@Component({
  components: {
    Product,
  },
})
export default class Catalog extends Vue {
  title: string = "Каталог";
  productsList: IProduct[] = [];
  async getProductsList() {
    const productsInStore = (this.$store.state as RootState).products;
    if (Object.keys(productsInStore).length === 0) {
      this.productsList = await this.$store.dispatch("fetchProducts");
    }
  }
  get products() {
    return this.$store.getters["products"];
  }
  created() {
    this.getProductsList();
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  display: grid;
  grid-template-columns: repeat(3, 480px);
  grid-auto-rows: minmax(200px, auto);
  justify-content: space-between;
  gap: 30px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  &__title {
    font-family: Arial, sans-serif;
  }
}
</style>
