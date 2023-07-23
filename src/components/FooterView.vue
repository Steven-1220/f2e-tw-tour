<template>
  <footer class="footer position-relative">
    <img src="../assets/images/ellipse.svg" class="orange-circle-left" alt="橘色圓">
    <img src="../assets/images/ellipse.svg" class="orange-circle-right" alt="橘色圓">
    <div class="container pt-6 pt-md-10 mt-md-10">
      <div class="row">
        <div class="col-md-4">
          <img src="../assets/images/logo.svg" class="logo-bottom" alt="logo">
        </div>
        <div class="col-md-8 position-relative bottom-info">
          <div class="social-media mb-4 mt-6 mt-md-0">
            <img src="../assets/images/line.png" class="me-3" alt="line">
            <img src="../assets/images/fb.png" class="me-3" alt="facebook">
            <img src="../assets/images/ig.png" alt="instagram">
          </div>
          <p class="text-white mb-2">聯絡專線：02xx-xxx-xxx</p>
          <p class="text-white mb-4">服務據點：台北市中山區明水路636號</p>
          <ul class="list-unstyled text-white mb-8 text-nowrap d-none d-sm-flex">
            <li>
              |<a href="#" class="link-light text-decoration-none fw-bold mx-4">我的行程</a>
            </li>
            <li>
              |<router-link to="/" class="link-light text-decoration-none fw-bold mx-4">找美食</router-link>
            </li>
            <li>
              |<router-link to="/" class="link-light text-decoration-none fw-bold mx-4">找景點</router-link>
            </li>
            <li>
              |<router-link to="/" class="link-light text-decoration-none fw-bold mx-4">找旅宿</router-link>
            </li>
            <li>
              |<router-link to="/" class="link-light text-decoration-none fw-bold mx-4">找活動</router-link>|
            </li>
          </ul>
          <small class="text-white ps-4">© 2023 Copyright LET’S GO | Web by Rey Chang</small>
        </div>
      </div>
    </div>
  </footer>

  <div class="go-top-area text-center">
    <div class="go-top" @click="goToTop">
      <img src="../assets/images/go-top.svg" class="d-block" alt="回到頂端">
    </div>
    <p class="text-white fw-bold py-2">TOP</p>
  </div>
</template>

<script>
export default {
  methods: {
    goToTop () {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
.footer {
  background-image: url('../assets/images/footer.png');
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  height: 490px;
  z-index: 1;
}

.orange-circle-left {
  width: 320px;
  position: absolute;
  bottom: -16%;
  left: -20%;
  z-index: 2;
}

.orange-circle-right {
  width: 120px;
  position: absolute;
  bottom: 50%;
  right: -4%;
  z-index: 2;
}

@media (min-width: 576px ) {
  .orange-circle-left {
    width: 400px;
    bottom: -43%;
    left: -6%;
  }

  .orange-circle-right {
    width: 200px;
    bottom: 15%;
    right: 5%;
  }
}

.logo-bottom {
  max-width: 220px;
  max-height: 160px;
  position: relative;
  z-index: 3;
}

.bottom-info {
  z-index: 4;
}

.social-media > img {
  width: 30px;
  height: 30px;
}

.go-top-area {
  position: fixed;
  z-index: 15;
  right: 12px;
  bottom: 25px;
}

.go-top {
  width: 44px;
  height: 44px;
  border: 2px solid #fff;
  border-radius: 50px;
  padding: 8px;
  cursor: pointer;
}

@media (min-width: 576px ) {
  .go-top-area {
  right: 55px;
  bottom: 240px;
  }
}
</style>
