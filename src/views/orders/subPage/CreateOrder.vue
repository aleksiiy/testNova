<template>
  <div class="new-order">
    <div class="new-order__title">Create new order</div>
    <div class="new-order__form">
      <DefaultInput
          :value="form.numberOfOrder"
          :label="'Number*'"
          :placeholder="'Enter number'"
          :warningText="'Required'"
          :name="'numberOfOrder'"
          @response="callback($event)"></DefaultInput>
      <DefaultInput
          :value="form.name"
          :label="'Name'"
          :placeholder="'Enter Name'"
          :warningText="'Required'"
          :name="'name'"
          @response="callback($event)"></DefaultInput>
      <DefaultInput
          :value="form.phone"
          :label="'Phone'"
          :placeholder="'Enter phone'"
          :warningText="'Required'"
          :name="'phone'"
          @response="callback($event)"></DefaultInput>
      <DefaultInput
          :value="form.address"
          :label="'Address'"
          :placeholder="'Enter address'"
          :warningText="'Required'"
          :name="'address'"
          @response="callback($event)"></DefaultInput>
    </div>

    <div class="new-order__control">
      <DefaultButton :text="'create'" @response="create()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DefaultInput, {IResponse} from "@/components/DefaultInput.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import {INewOrder} from "@/interfaces/order";
export default defineComponent({
  components: {
    DefaultInput,
    DefaultButton
  },

  data: () => ({
    form: {
      name: '',
      numberOfOrder: '',
      phone: '',
      address: ''
    } as INewOrder,
    validate: ['numberOfOrder'],
    isValid: false
  }),
  methods: {
    callback(event: IResponse) {
      if (Object.keys(this.form).includes(event.name)) {
        const rawObject = JSON.parse(JSON.stringify(this.form));
        rawObject[event.name] = event.value;
        this.form = Object.assign({}, rawObject);
        this.validateValue();
      }
    },
    validateValue() {
      for (const value of this.validate) {
        const rawObject = JSON.parse(JSON.stringify(this.form));
        if (rawObject[value] === "") {
          this.isValid = false;
          break;
        }
        this.isValid = true;
      }
    },
    async create() {
      if (this.isValid) {
        this.$store.commit('SET_LOADER', true);
        await this.$store.dispatch('order/createOrder', this.form);
        this.form = this.$store.getters['order/defaultNewOrder'];
        this.$store.commit('SET_LOADER', false);
        this.$router.push({
          name: 'orders'
        })
      }
    }
  }
})
</script>

<style lang="scss">
  .new-order {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    &__title {
      font-family: "Roboto Light", sans-serif;
      font-size: 24px;
    }

    &__form {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      width: 400px;
    }

    &__control {
      display: flex;
      margin-top: 32px;
      width: 400px;
      justify-content: end;
    }
  }
</style>
