<script lang="ts">
import { computed, defineComponent } from 'vue'
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
    options: {
      type: Array as () => Array<{ value: string; title: string }>,
      required: true,
    },
  },
  components: { Field },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    function getId(prefix: string, value: string) {
      return `${prefix}--${value.replace(/[^a-z0-9]/gi, '-')}`
    }

    function focus(el: HTMLElement, delta: number) {
      if (el && props.options.length) {
        const inputs = el.querySelectorAll<HTMLInputElement>(
          'input[type="radio"]',
        )
        const index = Array.from(inputs).indexOf(document.activeElement as any)
        const nextIndex =
          index < 0
            ? 0
            : (props.options.length + index + delta) % props.options.length
        inputs.item(nextIndex).focus()
      }
    }

    function focusPrevious(event: KeyboardEvent) {
      focus(event.currentTarget as HTMLElement, -1)
    }

    function focusNext(event: KeyboardEvent) {
      focus(event.currentTarget as HTMLElement, 1)
    }

    function selectFocused() {
      if (
        document.activeElement &&
        (document.activeElement as HTMLInputElement).click
      ) {
        ;(document.activeElement as HTMLInputElement).click()
      }
    }

    return { getId, value, focusPrevious, focusNext, selectFocused }
  },
})
</script>

<template>
  <Field :title="title" :shimmer="shimmer" v-slot="{ id }">
    <fieldset
      :id="id"
      @keydown.left="focusPrevious"
      @keydown.right="focusNext"
      @keydown.enter="selectFocused"
      class="mt-2"
      :class="{ 'u-placeholder-shimmer': shimmer }"
    >
      <div
        v-for="option of options"
        :key="option.value"
        class="font-semi rounded inline-block mr-1 mt-2 cursor-pointer"
        :class="{
          'text-black border-2 border-gray-300 hover:border-gray-900 focus-within:border-gray-900':
            modelValue === option.value,
          'text-gray-600 border-2 border-transparent hover:border-gray-900 focus-within:border-gray-900':
            modelValue !== option.value,
          'py-2 px-4 text-lg': appearance === 'large',
          'px-2 text-xs': appearance === 'base',
        }"
        v-bind="$attrs"
      >
        <input
          type="radio"
          :id="getId(id, option.value)"
          :tabindex="modelValue === option.value ? 0 : -1"
          class="opacity-0 w-0 h-0 overflow-hidden"
          v-model="value"
          :value="option.value"
        />
        <label :for="getId(id, option.value)" class="cursor-pointer">{{
          option.title
        }}</label>
      </div>
    </fieldset>
  </Field>
</template>
