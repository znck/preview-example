<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'
import { useId } from '../utilities'

export default defineComponent({
  inheritAttrs: false,
  props: {
    align: {
      type: String,
      default: 'left',
    },
    disabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const isOpen = ref(false)
    const el = ref<HTMLDivElement | null>(null)

    function onClickOutside(event: MouseEvent) {
      if (!event.composedPath().includes(el.value!)) {
        isOpen.value = false
        deregister()
      }
    }

    function register() {
      document.addEventListener('mousedown', onClickOutside, {
        capture: true,
        passive: true,
      })
    }

    function deregister() {
      document.removeEventListener('mousedown', onClickOutside, {
        capture: true,
      })
    }

    function onClick() {
      if (props.disabled) return
      isOpen.value = !isOpen.value

      if (isOpen.value) {
        register()
      } else {
        deregister()
      }
    }

    onUnmounted(deregister)

    return { el, isOpen, onClick, close: onClick, id: useId() }
  },
})
</script>

<template>
  <div class="relative" ref="el">
    <div
      style="display: contents"
      :style="disabled ? { cursor: 'not-allowed' } : {}"
      @click="onClick"
      @keydown.space="onClick"
      @keydown.enter="onClick"
      aria-haspopup="true"
      :id="id('trigger')"
      :aria-controls="id('popup')"
      :aria-disabled="disabled"
      role="button"
    >
      <slot name="trigger" v-bind="{ isOpen }" />
    </div>
    <div
      class="absolute bg-white shadow rounded border -mt-px z-50"
      :class="{
        'left-0': align === 'left',
        'right-0': align === 'right',
      }"
      v-if="isOpen"
      role="dialog"
      :id="id('popup')"
      :aria-labelledby="id('popup')"
      v-bind="$attrs"
      aria-modal="true"
    >
      <slot name="content" v-bind="{ isOpen, close }" />
    </div>
  </div>
</template>
