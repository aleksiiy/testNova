<template>
  <tr>
    <td v-for="(field, index) of fields" :key="index">
      <span v-if="field.type === 'text'">
        {{ item[field.nameFiled] }}
      </span>

      <span
          v-if="field.type === 'process'"
          :class="{
        process: true,
        'in-progress': item.process === 'in_progress',
        'accepted': item.process === 'accepted',
        'canceled': item.process === 'canceled',
        'postponed': item.process === 'postponed'
      }">
        {{item.process}}
      </span>

      <DefaultButton v-if="field.type === 'control'" :text="'edit'" @response="$emit('edit', item.id)" />
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DefaultButton from "@/components/DefaultButton.vue";

export interface IField {
  type: string
  nameFiled?: string
}

export default defineComponent({
  components: {DefaultButton},

  props: {
    item: {
      required: true,
      type: Object,
    },
    fields: {
      required: true,
      type: Array
    }
  }
})
</script>

<style lang="scss">
  .process {
    color: white;
    border-radius: 8px;
    padding: 6px 10px;

    &.in-progress {
      background: #2c2ce3;
     }

    &.accepted {
      background: #00b003;
    }

    &.canceled {
      background: #fa0404;
    }

    &.postponed {
      background: #c9a301;
    }
  }
</style>
