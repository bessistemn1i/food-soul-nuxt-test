<template>
  <div>
    <Catalog />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Catalog from "@/components/Catalog.vue";
@Component({
  components: {
    Catalog,
  },
})
export default class Main extends Vue {
  title: string = "Каталог";
}
</script>
