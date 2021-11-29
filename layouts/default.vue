<template>
  <div>
    <Navbar />
    <main class="main-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  margin: 0 30px;
}
</style>
