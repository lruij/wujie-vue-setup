import { defineComponent, h, getCurrentInstance, onMounted, onBeforeUnmount, watch } from 'vue'
import { startApp, bus } from 'wujie'

import type { PropType, App } from 'vue'
import { Props } from './type'

const WuJie = defineComponent({
  props: {
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    name: { type: String, default: "", required: true },
    loading: { type: HTMLElement, default: undefined },
    url: { type: String, default: "", required: true },
    sync: { type: Boolean, default: undefined },
    prefix: { type: Object, default: undefined },
    alive: { type: Boolean, default: undefined },
    props: { type: Object, default: undefined },
    attrs: { type: Object, default: undefined },
    replace: { type: Function as PropType<Props['replace']>, default: undefined },
    fetch: { type: Function as PropType<Props['fetch']>, default: undefined },
    fiber: { type: Boolean, default: undefined },
    degrade: { type: Boolean, default: undefined },
    plugins: { type: Array as PropType<Props['plugins']>, default: null },
    beforeLoad: { type: Function as PropType<Props['beforeLoad']>, default: null },
    beforeMount: { type: Function as PropType<Props['beforeMount']>, default: null },
    afterMount: { type: Function as PropType<Props['afterMount']>, default: null },
    beforeUnmount: { type: Function as PropType<Props['beforeUnmount']>, default: null },
    afterUnmount: { type: Function as PropType<Props['afterUnmount']>, default: null },
    activated: { type: Function as PropType<Props['activated']>, default: null },
    deactivated: { type: Function as PropType<Props['deactivated']>, default: null },

  },
  setup(props: Props, { emit }) {
    const instance = getCurrentInstance();

    const handleEmit = (event: string, ...args: any[]) => {
      emit(event, ...args)
    }

    const init = () => {
      bus.$onAll(handleEmit)

      startApp({
        name: props.name,
        url: props.url,
        el: instance?.refs.wujie as HTMLElement,
        loading: props.loading,
        alive: props.alive,
        fetch: props.fetch,
        props: props.props,
        attrs: props.attrs,
        replace: props.replace,
        sync: props.sync,
        prefix: props.prefix,
        fiber: props.fiber,
        degrade: props.degrade,
        plugins: props.plugins,
        beforeLoad: props.beforeLoad,
        beforeMount: props.beforeMount,
        afterMount: props.afterMount,
        beforeUnmount: props.beforeUnmount,
        afterUnmount: props.afterUnmount,
        activated: props.activated,
        deactivated: props.deactivated,
      })
    }

    onMounted(() => {
      init()
    })

    watch([props.name, props.url], () => {
      init()
    })

    onBeforeUnmount(() => {
      bus.$offAll(handleEmit)
    })

    return () => h('div', {
      style: {
        width: 200,
        height: 200
      },
      ref: 'wujie'
    }, '')
  }
})

WuJie.install = (app: App) => {
    app.component('wujie', WuJie)
}

export default WuJie
