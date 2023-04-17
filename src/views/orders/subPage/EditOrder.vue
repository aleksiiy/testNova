<template>
  <div class="edit-order">
    <div class="edit-order__title">Edit order, {{form.numberOfOrder}}</div>
    <div class="edit-order__form">
      <DefaultInput
          :value="form.numberOfOrder"
          :label="'Number*'"
          :placeholder="'Enter number'"
          :warningText="'Required'"
          :name="'numberOfOrder'"
          @response="callback($event)"
      />
      <DefaultInput
          :value="form.name"
          :label="'Name'"
          :placeholder="'Enter Name'"
          :warningText="'Required'"
          :name="'name'"
          @response="callback($event)"
      />
      <DefaultInput
          :value="form.phone"
          :label="'Phone'"
          :placeholder="'Enter phone'"
          :warningText="'Required'"
          :name="'phone'"
          @response="callback($event)"
      />
      <DefaultInput
          @response="callback($event)"
          :value="form.address"
          :label="'Address'"
          :placeholder="'Enter address'"
          :name="'address'"
          :warningText="'Required'"/>
      <div class="edit-order__form-option">
        <select @change="form.process = $event.target.value">
          <option
              v-for="(option, index) in processStatus"
              :key="index"
              :selected="option === form.process"
              :disabled="!isValid && option === 'accepted'"
          >{{option}}</option>
        </select>
        <span class="edit-order__form-option__help" v-if="!isValid">param "accepted" will be enabled if all fields are filled</span>
      </div>
    </div>
    <div class="edit-order__control">
      <DefaultButton :text="'Save'" @response="save()"/>
      <DefaultButton :text="'Cansel'" @response="cansel()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DefaultInput, {IResponse} from "@/components/DefaultInput.vue";
import DefaultButton from "@/components/DefaultButton.vue";
import {IOrder} from "@/interfaces/order";
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
    } as IOrder,
    processStatus: {},
    validate: ['numberOfOrder', 'name', 'phone', 'address'],
    isValid: false,
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
    async save() {
      if (!this.isValid && this.form.process === "accepted") {
        return;
      }
      this.$store.commit('SET_LOADER', true);
      await this.$store.dispatch('order/updateOrder', {
        id: this.form.id,
        payload: this.form
      });
      this.$store.commit('SET_LOADER', false);
      this.$router.push({
        name: 'orders'
      });
    },
    cansel() {
      this.$router.push({name: 'orders'});
    }
  },
  mounted() {
    this.processStatus = this.$store.getters.getProcessStatus;
    const id = this.$route.params.id;
    const order = this.$store.getters['order/showOrder'](id);
    if (order.length === 1) {
      this.form = Object.assign({}, order[0]);
    } else {
      this.$router.push({name: 'orders'});
    }
    this.validateValue();
  }
})
</script>

<style lang="scss">
.edit-order {
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

    .edit-order__form-option {
      display: flex;
      flex-direction: column;
      position: relative;

      .edit-order__form-option__help {
        top: calc(100% + 8px);
        position: absolute;
        font-size: 12px;
        color: gray;
        text-transform: lowercase;
      }
    }
  }

  &__control {
    display: flex;
    margin-top: 32px;
    width: 400px;
    justify-content: end;
    column-gap: 15px;
  }
}
</style>
