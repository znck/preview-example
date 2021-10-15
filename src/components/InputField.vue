<script lang="ts">
import { defineComponent, computed } from 'vue'
import Field from './Field.vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...Field.props,
    modelValue: {},
    appearance: {
      type: String,
      default: 'base',
    },
  },
  components: { Field },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    return { value }
  },
})
</script>

<template>
  <Field :title="title" :shimmer="shimmer" v-slot="{ id }">
    <input
      class="focus:outline-none font-extrabold block x-input-field__input mt-2"
      :id="id"
      :class="{
        'text-4xl': appearance === 'large',
        'text-xl': appearance === 'base',
        'u-placeholder-shimmer': shimmer,
      }"
      v-model="value"
      v-bind="$attrs"
    />
  </Field>
</template>

<style>
.x-input-field__input:invalid {
  box-shadow: none;
}
</style>
