<script lang="ts">
import { defineComponent, h, resolveComponent, DefineComponent } from 'vue'
import { RouterLinkProps as BaseRouterLinkProps } from 'vue-router'
import Loading from './LoadingSVG.vue'

interface BaseProps {
  appearance?: 'primary' | 'secondary' | 'cta'
  isLoading?: boolean
}

type AnchorProps = BaseProps & { as: 'a' } & JSX.IntrinsicElements['a']
type ButtonProps = BaseProps & {
  as: 'button'
} & JSX.IntrinsicElements['button']
type RouterLinkProps = BaseProps & { as: 'RouterLink' } & BaseRouterLinkProps &
  JSX.IntrinsicElements['div']

export default defineComponent<AnchorProps | ButtonProps | RouterLinkProps>({
  props: {
    appearance: {
      type: String,
      default: 'secondary',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: 'button',
    },
  },
  setup(props, { attrs, slots }) {
    const component = (/[A-Z]/.test(props.as)
      ? resolveComponent(props.as)
      : props.as) as any
    const asChildren = (items: any[]) =>
      typeof component === 'string' ? items : { default: () => items }

    return () =>
      h(
        component,
        {
          ...attrs,
          type: props.as === 'button' ? attrs.type || 'button' : null,
          class: [
            attrs.class,
            'uppercase py-2 px-5 text-sm font-bold rounded focus:outline-none hover:shadow-md focus:shadow-md active:shadow-inner duration-150 transition-shadow border-2',
            {
              'border-primary-600 bg-primary-600 text-white':
                props.appearance === 'cta',
              'border-primary-600 text-primary-600':
                props.appearance === 'primary',
              'border-transparent text-gray-700':
                props.appearance === 'secondary',
              'relative cursor-wait': props.isLoading,
            },
          ],
        },
        asChildren([
          h(
            'div',
            {
              class: 'contents',
              style: props.isLoading ? 'visibility: hidden' : null,
            },
            [slots.default ? slots.default() : null],
          ),
          props.isLoading ? h(Loading) : null,
        ]),
      )
  },
})
</script>
