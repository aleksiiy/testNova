<template>
  <input type="hidden" v-model="getStatus">
  <div :class="{
    loading: true,
    active: show,
    hidden: collapse
  }">
    <div class="loading__animation">

    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from "vue";
  export default defineComponent({
    data: () => ({
      show: false,
      collapse: false
    }),
    watch: {
      getStatus(status) {
        if (status) {
          this.show = true;
        } else {
          this.collapse = true;
          setTimeout(() => {
            this.show = false;
            this.collapse = false;
          }, 500)
        }
      }
    },
    computed: {
      getStatus(){
        return this.$store.getters['getStatusLoader']
      }
    }
  });
</script>
<style scoped lang="scss">
.loading {
  display: flex;
  position: absolute;
  width: 100%;
  height: 0px;
  left: 0;
  top: 0;
  opacity: 0;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  transition: .3s;

  &.active {
    opacity: 1;
    height: 4px;
    animation: gradient 5s ease infinite;
  }

  &.hidden {
    left: auto;
    height: 0px;
    opacity: 0;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
