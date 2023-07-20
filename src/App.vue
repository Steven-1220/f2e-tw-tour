<template>
  <router-view v-if="isRouterAlive"/>
</template>

<script>
import getTdxAuthorize from '@/libs/TDXauthorize'
// import TdxAuthorize from '@/libs/authorize'
// import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { Tooltip } from 'bootstrap'

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
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    Array.from(tooltipTriggerList).map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
  }
}
</script>
<style lang="scss">
@import './assets/stylesheets/all.scss';
</style>
