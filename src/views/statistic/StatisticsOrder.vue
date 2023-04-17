<template>
  <table class="table">
    <thead>
    <tr>
      <th>In Progress</th>
      <th>Accepted</th>
      <th>Canceled</th>
      <th>Postponed</th>
    </tr>
    </thead>
    <tbody>
    <vLineOfOrder
        v-for="(order, index) of getStatistics"
        :key="index"
        :item="order"
        :fields="tableFields"
    />
    </tbody>
  </table>
</template>

<script lang="ts">
import vLineOfOrder, {IField} from "../../components/lineOfOrder.vue";
import {defineComponent} from "vue";
export default defineComponent({
  components: {
    vLineOfOrder
  },
  data: () => ({
    tableFields: [
      {
        type: 'text',
        nameFiled: 'inProgressOrder'
      },
      {
        type: 'text',
        nameFiled: 'acceptedOrder'
      },
      {
        type: 'text',
        nameFiled: 'canceledOrder'
      },
      {
        type: 'text',
        nameFiled: 'postponedOrder'
      }
    ] as IField[]
  }),
  async mounted() {
    this.$store.commit('SET_LOADER', true);
    await this.$store.dispatch('statistic/getStatistics');
    this.$store.commit('SET_LOADER', false);
  },
  computed: {
    getStatistics(){
      return this.$store.getters['statistic/getStatistics']
    }
  }
})
</script>

<style lang="scss">
.table {
  height: max-content;
  border-collapse: collapse;
  margin-top: 30px;
}
table, th, td {
  padding: 4px 8px;
  border: 1px solid;
}
</style>
