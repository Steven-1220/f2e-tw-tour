<template>
  <div class="home-area">
    <router-link to="/" class="d-inline-block position-relative">
      <img
        src="../assets/images/ellipse.svg"
        class="orange-circle"
        alt="橘色圓"
      />
      <img src="../assets/images/logo.svg" class="logo-go-home" alt="logo圖" />
    </router-link>
  </div>
</template>

<style lang="scss">
.home-area {
  position: absolute;
  z-index: 5;
  top: -11%;
  left: -20%;
  a {
    width: 250px;
    height: 250px;
  }
  .orange-circle {
    width: 100%;
    height: 100%;
    position: static;
  }
}

@media (min-width: 576px) {
  .home-area {
    top: -11%;
    left: -17%;
  }
}

@media (min-width: 768px) {
  .home-area {
    top: -6%;
    left: -5%;
  }
}

.logo-go-home {
  max-width: 120px;
  max-height: 90px;
  position: absolute;
  left: 45%;
  bottom: 17%;
  z-index: 2;
}
</style>
