<template>
  <nav class="nav">
    <RouterLink
        class="nav-link"
        v-for="(item, index) of items"
        :key="index"
        :title="item.title"
        :to="{name: item.nameRoute}">{{item.title}}</RouterLink>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    items: {
      required: true,
      type: Array,
    }
  }
})
</script>
<style scoped>
.nav {
  display: flex;
  align-content: center;
}

.nav-link {
  margin-right: 15px;
  text-decoration: none;
  color: #e2041d;
  font-family: "Roboto Light", sans-serif;
  font-weight: bold;
  border: 1px solid #e2041d;
  border-radius: 8px;
  padding: 8px 12px;
  transition: .3s;
}

.nav-link:hover {
  background: #e2041d;
  color: white;
  cursor: pointer;
}

.nav-link:last-child {
  margin-right: 0;
}
</style>
