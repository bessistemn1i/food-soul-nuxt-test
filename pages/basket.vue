<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="basket">
      <table class="basket__table">
        <thead>
          <tr>
            <th></th>
            <th>
              <span>Название</span>
            </th>
            <th>
              <span>Цена, $</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productsInBasket" :key="item.id">
            <td>
              <img
                class="basket__table-image"
                :src="item.image"
                :alt="item.title"
              />
            </td>
            <td>
              <span>{{ item.title }}</span>
            </td>
            <td>
              <span>{{ item.price }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="productsInBasket.length > 0" class="basket__result">
        <div class="basket__result-text">
          Общая стоимость:
          <span>{{ wholePrice }}</span>
        </div>
        <button class="btn" :disabled="isPopupVisible" @click="submitForm">
          Оформить заказ
        </button>
      </div>
    </div>
    <HelperMessage />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IProduct } from "~/services/services.i";
import HelperMessage from "@/components/HelperMessage.vue";
@Component({
  components: {
    HelperMessage,
  },
  computed: {
    isPopupVisible() {
      return this.$store.getters.isHelperMessageVisible;
    },
  },
})
export default class Catalog extends Vue {
  title: string = "Корзина";
  productsInBasket: IProduct[] = [];

  async getProduct() {
    try {
      this.productsInBasket = await this.$store.getters.productsInBasket;
    } catch (error) {
      console.log(error);
    }
  }

  get wholePrice() {
    const price = this.productsInBasket.reduce(
      (acc: number, item: IProduct) => {
        return (acc += +item.price);
      },
      0
    );
    return price.toFixed(2);
  }

  submitForm() {
    this.$store.commit("SET_HELPER_MESSAGE_STATUS", true);
  }
  created() {
    this.getProduct();
  }
}
</script>

<style lang="scss" scoped>
.basket {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      text-align: center;
      border: 1px solid rgb(117, 117, 133);
    }
  }
  &__table-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }

  &__result {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 60px;
  }

  &__result-text {
    margin-bottom: 15px;
  }
}
</style>
