<template>
  <button class="button" @click="$emit('response')">{{text}}</button>
</template>

<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    props: {
      text: {
        type: String,
        default: 'Click'
      }
    }
  })
</script>

<style lang="scss">
  .button {
    border: 1px solid #cb8400;
    border-radius: 8px;
    padding: 8px 12px;
    font-family: "Roboto Light", sans-serif;
    background: transparent;
    color: #cb8400;
    cursor: pointer;
    transition: .3s;
    font-weight: bold;

    &:hover {
      background: #cb8400;
      color: white;
    }
  }
</style>
