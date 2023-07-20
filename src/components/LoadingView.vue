<template>
  <vue-loading :active="isLoading">
    <div class="loadingio-spinner-rolling-76bl6vnfwsh">
      <div class="ldio-9ibw1j20nel">
        <div></div>
      </div>
    </div>
  </vue-loading>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    startLoading () {
      this.isLoading = true
    },
    stopLoading () {
      this.isLoading = false
    }
  },
  mounted () {
    emitter.on('start-loading', () => {
      this.startLoading()
    })
    emitter.on('stop-loading', () => {
      this.stopLoading()
    })
  }
}
</script>

<style lang="scss">
@keyframes ldio-9ibw1j20nel {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.ldio-9ibw1j20nel div {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 10px solid #fdb44b;
  border-top-color: transparent;
  border-radius: 50%;
}
.ldio-9ibw1j20nel div {
  animation: ldio-9ibw1j20nel 1s linear infinite;
  top: 100px;
  left: 100px;
}
.loadingio-spinner-rolling-76bl6vnfwsh {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ldio-9ibw1j20nel {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-9ibw1j20nel div {
  box-sizing: content-box;
}
</style>
