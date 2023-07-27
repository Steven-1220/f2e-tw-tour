<template>
  <router-view v-if="isRouterAlive"/>
</template>

<script>
import getTdxAuthorize from '@/libs/TDXauthorize'

export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      console.log('reload')
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  mounted () {
    getTdxAuthorize()
  }
}
</script>
<style lang="scss">
@import './assets/stylesheets/all.scss';
</style>
