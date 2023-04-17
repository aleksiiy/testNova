<template>
  <DefaultLoader />
  <header class="header">
    <NavigationHeader :items="navs" />
  </header>

  <div class="content">
    <router-view></router-view>
  </div>

  <div class="footer">
    footer
  </div>
</template>

<script lang="ts">
import type {INavigation} from "./interfaces/navigation";
import NavigationHeader from "./components/NavigationHeader.vue";
import DefaultLoader from "@/components/DefaultLoader.vue";
import {defineComponent} from "vue";
export default defineComponent({
  components: {
    NavigationHeader,
    DefaultLoader
  },
  data: () => ({
    loading: false,
    navs: [
      {
        title: 'List of orders',
        nameRoute: 'orders'
      },
      {
        title: 'Statistics',
        nameRoute: 'statistics'
      },
      {
        title: 'Create',
        nameRoute: 'createOrder'
      },
      {
        title: 'Def',
        nameRoute: 'def'
      }
    ] as INavigation[]
  }),
  async beforeCreate() {
    // await this.$store.dispatch('order/getAllOrders');
    this.loading = true;
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

#app * {
  font-family: "Roboto Light", sans-serif;
}

.header {
  display: flex;
  height: 60px;
  border-radius: 0 0 8px 8px;
  border-width: 0 0 2px 0;
  border-color: red;
  border-style: solid;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  padding: 0 40px;
  width: calc(100% - 80px);
  height: 100%;
  justify-content: center;
}

.footer {
  display: flex;
  width: 100%;
}

</style>
