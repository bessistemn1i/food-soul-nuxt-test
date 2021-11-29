<template>
  <div class="card-container">
    <div class="card">
      <div class="card__image-container">
        <img :src="product.image" :alt="product.title" class="card__image" />
      </div>
      <div class="card__content">
        <h1>{{ product.title }}</h1>
        <h2>{{ product.category }}</h2>

        <p>{{ product.description }}</p>

        <div class="card__price">
          <p class="card__text-container">
            Цена: <span>{{ product.price }}</span>
          </p>
        </div>

        <div class="card__rating">
          <p class="card__text-container">
            Рейтинг: <span>{{ product.rating.rate }}</span
            ><span>из</span>
            <span>{{ RATING_MAX }}</span>
          </p>
          <p class="card__text-container">
            Количество оценок: <span>{{ product.rating.count }}</span>
          </p>
          <div class="underline"></div>
        </div>

        <button @click="sendToBasket(product.id)" class="card__submit">
          <div id="buy-btn">
            <h3>В корзину</h3>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { Prop } from "vue-property-decorator";
import { IProduct } from "~/services/services.i";

@Component({})
export default class extends Vue {
  @Prop({ type: Object as () => IProduct })
  public product!: IProduct;

  RATING_MAX: number = 5;

  private sendToBasket(id: number) {
    try {
      this.$store.dispatch("fetchProductForBasket", id);
    } catch (error) {
      error;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container,
.card__image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container {
  font-family: "Teko", sans-serif;
}
.card {
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  background: radial-gradient(rgb(50, 50, 50), black);
  box-shadow: 0 0 300px rgba(0, 0, 0, 0.3);
  h1,
  h4,
  h2 {
    text-decoration: underline;
    margin: 0;
  }
  &__image-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 150px;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
      transition: transform ease-out 0.4s;
    }
  }
  &__price {
    display: flex;
    // border: 1px solid white;
    align-items: center;
    p {
      margin-right: 10px;
    }
  }

  &__rating {
    display: inline-block;
    // border: 1px solid white;
    span {
      font-size: 20px;
      font-weight: 700;
    }
    .choices {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      & > * {
        width: 22px;
        height: 22px;
        font-family: sans-serif;
        font-size: 11px;
        font-weight: 700;
        background-color: white;
        border-radius: 15px;
        margin-right: 10px;
        color: black;
      }
    }
  }

  &__text-container {
    display: flex;
    align-items: center;
    font-size: 16px;
    span {
      margin-left: 15px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 52%;
    padding: 40px;
    color: white;
    h1 {
      font-size: 30px;
      margin: 0;
      margin-bottom: 15px;
      text-decoration: none;
    }
    p {
      margin: 5px 0;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 400;
    }

    .btn-row {
      display: flex;
      justify-content: center;
      .shopping-cart-btn,
      .buy-btn {
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.6);
      }
    }
  }

  &__submit {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    background-color: #fafafa;
    color: #000000;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: limegreen;
      transform: translateY(-3px);
      transition: all ease-out 0.3s;
    }
  }
}
</style>
