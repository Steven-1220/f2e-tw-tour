<template>
  <div class="mt-5 me-5 favorite">
    <button class="d-block position-relative bg-secondary rounded-circle border-0 p-1" @click="openPinItems">
      <img src="../assets/images/pin.png" class="favorite-pin" alt="">
      <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle-x">{{ pin.length }}</span>
    </button>
  </div>

  <PinItemsModal ref="pinItemsModalRef"></PinItemsModal>
</template>

<script>
import PinItemsModal from '@/components/PinItemsModal.vue'
import emitter from '@/libs/emitter'

export default {
  components: {
    PinItemsModal
  },
  data () {
    return {
      pin: JSON.parse(localStorage.getItem('pin-items')) || []
    }
  },
  methods: {
    openPinItems () {
      this.$refs.pinItemsModalRef.openModal()
    }
  },
  mounted () {
    emitter.on('get-pin-items', (pin) => {
      this.pin = pin
    })
    emitter.on('delete-pin-items', (pin) => {
      this.pin = pin
    })
  }
}

</script>

<style lang="scss">
.favorite {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
}

.favorite-pin {
  width: 36px;
}
</style>
