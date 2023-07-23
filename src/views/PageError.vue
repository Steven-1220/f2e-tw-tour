<template>
  <div class="wrap">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <h1 class="display-1 text-danger">
            <i class="bi bi-exclamation-triangle"></i> 404
          </h1>
          <p class="display-3">此頁面找不到資料</p>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <RouterLink to="/" class="btn btn-primary">回首頁</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
