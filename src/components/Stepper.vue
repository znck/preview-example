<script lang="ts">
import { defineComponent, watch, ref, toRef } from 'vue'

const hasFormatter = typeof Intl !== 'undefined' && Intl.NumberFormat

function format(value: number, precision: number): string {
  return hasFormatter
    ? new Intl.NumberFormat(undefined, {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
      }).format(value)
    : value.toFixed(precision)
}

function nextFrame() {
  return new Promise((resolve) => window.setTimeout(resolve, 1000 / 30))
}

function asNumber(value: number | undefined): number {
  return value ?? 0
}

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    precision: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 500,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = ref(format(props.value, props.precision))
    const defaultValue = props.immediate ? 0 : props.value
    const value = toRef(props, 'value')

    watch(
      value,
      async (currentValue, previousValue) => {
        previousValue = asNumber(previousValue ?? defaultValue)
        currentValue = asNumber(currentValue)
        const start = Date.now()
        let end = Date.now()
        const duration = props.duration
        const precision = props.precision
        const change = currentValue - previousValue
        const final = format(currentValue, precision)

        while (end - start < duration) {
          const delta = change * ((end - start) / duration)

          state.value = format(previousValue + delta, precision).padStart(
            final.length,
            ' ',
          )

          await nextFrame()
          end = Date.now()
        }

        state.value = final
      },
      {
        immediate: props.immediate,
      },
    )

    return () => state.value
  },
})
</script>
