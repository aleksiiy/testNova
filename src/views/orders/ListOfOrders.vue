<template>
  <table class="table">
    <thead>
      <tr>
        <th>number of order</th>
        <th>name</th>
        <th>address</th>
        <th>status</th>
        <th>option</th>
      </tr>
    </thead>
    <tbody>
      <vLineOfOrder
          v-for="(order, index) of getOrders"
          :key="index"
          :item="order"
          @edit="edit"
          :fields="tableFields"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import vLineOfOrder, {IField} from "../../components/lineOfOrder.vue";
import {IOrder} from "../../interfaces/order";
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    vLineOfOrder
  },
  data: () => ({
    tableFields: [
      {
        type: 'text',
        nameFiled: 'numberOfOrder'
      },
      {
        type: 'text',
        nameFiled: 'name'
      },
      {
        type: 'text',
        nameFiled: 'phone'
      },
      {
        type: 'process',
      },
      {
        type: 'control'
      }
    ] as IField[]
  }),
  methods: {
    edit(id: string) {
      this.$router.push({
        name: 'editOrder',
        params: {
          id
        }
      })
    }
  },
  computed: {
    getOrders(): IOrder[] {
      return this.$store.getters['order/getOrders'];
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
