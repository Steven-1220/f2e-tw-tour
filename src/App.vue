<template>
  <router-view v-if="isRouterAlive"/>
</template>

<script>
import getTdxAuthorize from '@/libs/TDXauthorize'
// import TdxAuthorize from '@/libs/authorize'

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
    // TdxAuthorize()
    getTdxAuthorize()
  }
}
</script>
<style lang="scss">
@import './assets/stylesheets/all.scss';
</style>
