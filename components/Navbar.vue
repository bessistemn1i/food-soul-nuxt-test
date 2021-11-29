<template>
  <div>
    <nav>
      <ul class="menu">
        <li
          class="menu__item"
          v-for="(link, linkIndex) in links"
          :key="linkIndex"
        >
          <nuxt-link class="menu__link" :to="link.link">{{
            link.name
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { InavLinks } from "@/services/services.i";
@Component
export default class Navbar extends Vue {
  links: InavLinks[] = [
    {
      name: "Каталог",
      link: "/",
    },
    {
      name: "Корзина",
      link: "basket",
    },
  ];
}
</script>

<style lang="scss" scoped>
nav {
  margin: 0 30px;
}
.menu {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  gap: 15px;

  &__link {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.2;
  }
}
</style>
