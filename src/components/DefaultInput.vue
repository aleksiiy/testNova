<template>
  <div class="input">
    <label class="input-label">{{label}}</label>
    <input
        autocomplete="off"
        class="input-space"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('response',{
          name: name,
          value: $event.target.value
        })"
        :value="value"
        />
    <span class="input-warning" :data-warningText="warningText" ></span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export interface IResponse {
  name: string
  value: string | number
}

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: 'Enter value',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    warningText: {
      type: String,
      default: 'is required',
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    }
  }
})

</script>

<style lang="scss">
.input {
  height: 40px;
  padding: 8px 13px 0px;
  border-bottom: 2px solid red;
  position: relative;
  display: flex;
  align-items: center;
  transition: 0.3s;
  width: calc(100% - 26px);

  &-label {
    color: gray;
    font-size: 16px;
    font-family: "Roboto Light", sans-serif;
  }

  &-space {
    margin-left: 8px;
    background: transparent;
    height: 100%;
    border-width: 0;
    outline: none;
    width: 100%;
    color: red;
    padding: 0;
    margin-bottom: -3px;
    z-index: 2;

    &::placeholder {
      color: gray;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: red !important;
    }
  }

  &-warning {
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
    width: 100%;
    overflow: hidden;
    height: 40px;

    &::before {
      content: attr(data-warningText);
      position: absolute;
      left: 0;
      opacity: 0;
      margin-top: -70px;
      color: #22fce8;
      font-size: 14px;
      line-height: normal;
      transition: 0.3s;
      text-transform: lowercase;
      letter-spacing: 1px;
    }
  }

  &.warning {
    border-bottom: 2px solid #fc222a;

    .input-warning {
      top: calc(100% + 2px);

      &::before {
        margin-top: 0;
        opacity: 1;
      }
    }
  }
}
</style>
