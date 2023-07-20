<template>
    <header>
      <div class="container-fluid px-0">
        <LoadingView></LoadingView>
        <div class="carousel-area">
          <template  v-if="bannerImages.length !== 0">
            <transition-group :name="transitionName">
              <div class="carousel-img-item" v-for="(item, index) in bannerImages" :key="index + '123'" v-show="showBanner === index" >
                <img :src="item" alt="旅遊相關圖片" class="carousel-img" :onerror="defaultImg">
              </div>
            </transition-group>
            <div class="carousel-btns d-flex justify-content-center align-items-end">
              <template v-if="bannerImages.length >= 2">
                <button type="button" class="border-0 bg-transparent" v-for="(num, index) in bannerImages.length" :key="num +'123'" @click="showBannerImg(num - 1)">
                  <span v-if="showBanner === index"><i class="bi bi-circle-fill"></i></span>
                  <span v-else><i class="bi bi-circle"></i></span>
                </button>
              </template>
            </div>
          </template>
          <!-- <transition-group :name="transitionName">
            <div class="carousel-img-item" v-for="(item, index) in bannerImages" :key="index + '123'" v-show="showBanner === index" >
              <img :src="item" alt="旅遊相關圖片" class="carousel-img">
            </div>
          </transition-group>
          <div class="carousel-btns d-flex justify-content-center align-items-end">
            <button type="button" class="border-0 bg-transparent" v-for="(num, index) in bannerImages.length" :key="num +'123'" @click="showBannerImg(num - 1)">
              <span v-if="showBanner === index"><i class="bi bi-circle-fill"></i></span>
              <span v-else><i class="bi bi-circle"></i></span>
            </button>
          </div> -->

          <template  v-if="bannerImages.length === 0">
            <div class="carousel-img-item">
              <img src="@/assets/images/banner-city.jpg" alt="旅遊相關圖片" class="carousel-img">
            </div>
          </template>
        </div>

        <div class="row">
          <div class="col d-flex justify-content-center align-items-center">
            <GoHomeCircle></GoHomeCircle>
            <FixPinButton></FixPinButton>
          </div>
        </div>
      </div>
    </header>
    <div class="main mt-9 mb-10">
      <div class="container position-relative">
        <div class="tourism-pin-area bg-white border d-flex justify-content-center align-items-center">
          <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(this.$route.query.id, this.$route.query.category)">
            <span v-if="pin.find(pinItem => pinItem.id === this.$route.query.id)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
            <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
          </a>
        </div>
        <h2 v-if="tourismInfo['ScenicSpotName'] !== undefined" class="fw-bold mb-6">{{tourismInfo.ScenicSpotName}}</h2>
        <h2 v-if="tourismInfo['RestaurantName'] !== undefined" class="fw-bold mb-6">{{tourismInfo.RestaurantName}}</h2>
        <h2 v-if="tourismInfo['HotelName'] !== undefined" class="fw-bold mb-6">{{tourismInfo.HotelName}}</h2>
        <h2 v-if="tourismInfo['ActivityName'] !== undefined" class="fw-bold mb-6">{{tourismInfo.ActivityName}}</h2>
        <div class="row flex-column-reverse flex-md-row tourism-contact-infos">
          <div class="col-12 col-md-8">
            <p class="text px-3 px-md-0" v-if="tourismInfo['DescriptionDetail'] !== undefined">
              {{ tourismInfo.DescriptionDetail }}
            </p>
            <p v-else class="text px-3 px-md-0">
              {{ tourismInfo.Description }}
            </p>
          </div>
          <div class="col-12 col-md-4">
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body d-flex align-items-start">
                <img src="../assets/images/address.svg" class="me-3 flex-grow-0" alt="地址">
                <span v-if="tourismInfo.Address">{{ tourismInfo.Address }}</span>
                <span v-else>無地址資訊</span>
              </div>
            </div>
            <div  v-if="tourismInfo['Phone'] !== undefined"  class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <img src="../assets/images/telephone.svg" class="me-3" alt="電話">
                {{tourismInfo.Phone}}
              </div>
            </div>
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <template v-if="tourismInfo['StartTime'] !== undefined">
                  <img src="../assets/images/time.svg" class="me-3 flex-grow-0" alt="活動時間">
                  <span>活動時間</span>
                </template>
                <template v-else>
                  <img src="../assets/images/time.svg" class="me-3 flex-grow-0" alt="活動時間">
                  <span>營業時間</span>
                </template>
                <div class="time">
                  <p v-if="tourismInfo['OpenTime'] !== undefined" class="mb-0 text-danger">{{ tourismInfo.OpenTime }}</p>
                  <p v-if="tourismInfo['HotelName'] !== undefined" class="mb-0 text-danger">全年無休</p>
                </div>
                <template v-if="tourismInfo['StartTime'] !== undefined">
                  <p class="mb-0 ms-5 text-danger">{{ tourismInfo.StartTime.slice(0,10) }}</p>
                  <p class="mb-0 ms-5 text-danger">{{ tourismInfo.EndTime.slice(0,10) }}</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="other-same-category d-flex justify-content-between mb-4">
          <template v-if="currentPageCategory === 'ScenicSpot'">
            <h4 class="fw-bold">其他景點</h4>
            <router-link :to="{
              path:'/tourlist',
              query: {
                city: currentPageCity,
                category: currentPageCategory
              }
            }" class="text-decoration-none"><i class="bi bi-caret-right-fill"></i>更多景點
            </router-link>
          </template>
          <template v-if="currentPageCategory === 'Restaurant'">
            <h4 class="fw-bold">其他美食</h4>
            <router-link :to="{
              path:'/tourlist',
              query: {
                city: currentPageCity,
                category: currentPageCategory
              }
            }" class="text-decoration-none"><i class="bi bi-caret-right-fill"></i>更多美食
            </router-link>
          </template>
          <template v-if="currentPageCategory === 'Hotel'">
            <h4 class="fw-bold">其他旅宿</h4>
            <router-link :to="{
              path:'/tourlist',
              query: {
                city: currentPageCity,
                category: currentPageCategory
              }
            }" class="text-decoration-none"><i class="bi bi-caret-right-fill"></i>更多旅宿
            </router-link>
          </template>
          <template v-if="currentPageCategory === 'Activity'">
            <h4 class="fw-bold">其他活動</h4>
            <router-link :to="{
              path:'/tourlist',
              query: {
                city: currentPageCity,
                category: currentPageCategory
              }
            }" class="text-decoration-none"><i class="bi bi-caret-right-fill"></i>更多活動
            </router-link>
          </template>
        </div>
        <div class="row g-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="(item,index) in randomOtherData" :key="index + '123'">
            <div class="card card-info position-relative border-0 h-100" >
              <img :src="item.Picture?.PictureUrl1 || require('@/assets/images/card-img.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
              <div class="card-body card-info text-white shadow-layer">
                <template v-if="currentPageCategory === 'ScenicSpot'">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.ScenicSpotID, 'ScenicSpot')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.ScenicSpotID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-primary py-1 px-2 rounded">景點</span></div>
                    <h5 class="card-title fw-bold">{{ item.ScenicSpotName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link class="stretched-link" to="/tourdetail"
                      @click="enterTourismDetail(item.ScenicSpotID, currentPageCity,currentPageCategory)">
                    </router-link>
                  </div>
                </template>
                <template v-if="currentPageCategory === 'Restaurant'">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.RestaurantID, 'Restaurant')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.RestaurantID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-primary py-1 px-2 rounded">美食</span></div>
                    <h5 class="card-title fw-bold">{{ item.RestaurantName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link class="stretched-link" to="/tourdetail"
                      @click="enterTourismDetail(item.RestaurantID, currentPageCity,currentPageCategory)">
                    </router-link>
                  </div>
                </template>
                <template v-if="currentPageCategory === 'Hotel'">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.HotelID, 'Hotel')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.HotelID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-primary py-1 px-2 rounded">旅宿</span></div>
                    <h5 class="card-title fw-bold">{{ item.HotelName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link class="stretched-link" to="/tourdetail"
                      @click="enterTourismDetail(item.HotelID, currentPageCity,currentPageCategory)">
                    </router-link>
                  </div>
                </template>
                <template v-if="currentPageCategory === 'Activity'">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.ActivityID, 'Activity')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.ActivityID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-primary py-1 px-2 rounded">活動</span></div>
                    <h5 class="card-title fw-bold">{{ item.ActivityName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link class="stretched-link" to="/tourdetail"
                      @click="enterTourismDetail(item.ActivityID, currentPageCity,currentPageCategory)">
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardNearby :near-by-card="nearByInfos" @emit-nearby-info="enterTourismDetail"></CardNearby>
    </div>

    <FooterView></FooterView>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import CardNearby from '@/components/CardNearby.vue'
import GoHomeCircle from '@/components/GoHomeCircle.vue'
import FixPinButton from '@/components/FixPinButton.vue'
import LoadingView from '@/components/LoadingView.vue'
import emitter from '@/libs/emitter'

// eslint-disable-next-line no-unused-vars
let timer
export default {
  components: {
    FooterView,
    CardNearby,
    GoHomeCircle,
    FixPinButton,
    LoadingView
  },
  inject: ['reload'],
  data () {
    return {
      tourismInfo: {},
      pictureData: {},
      bannerImages: [],
      categoryData: [],
      randomOtherData: [],
      currentPageCategory: this.$route.query.category,
      currentPageCity: this.$route.query.city,
      // currentPageId: this.$route.query.id,
      currentTourismPosition: {},
      nearByInfos: {
        ScenicSpot: [],
        Restaurant: [],
        Hotel: []
      },
      showBanner: 0,
      transitionName: 'slide-left-in',
      token: JSON.parse(localStorage.getItem('TdxToken')) || [],
      pin: JSON.parse(localStorage.getItem('pin-items')) || [],
      defaultImg: 'this.src="' + require('@/assets/images/banner-city.jpg') + '"'
    }
  },
  methods: {
    // https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/Taichung?%24format=JSON
    getFilterInfo () {
      const { id, city, category } = this.$route.query
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}/${city}?&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.categoryData = res.data
          const currentPageTourismIndex = this.categoryData.findIndex(item => {
            return item[`${category}ID`] === id
          })
          this.categoryData.splice(currentPageTourismIndex, 1)
          this.randomOtherData = []
          // 隨機取 4 筆資料
          for (let i = 1; i <= 4; i++) {
            const randomIndex = Math.floor(Math.random() * this.categoryData.length)
            const arr = this.categoryData.splice(randomIndex, 1)
            this.randomOtherData.push(arr[0])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTourismContent () {
      const { id, city, category } = this.$route.query
      console.log(id, city, category)
      emitter.emit('start-loading')
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}/${city}?%24filter=contains%28${category}ID%2C%27${id}%27%29&%24format=JSON`
      // const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/Taichung?%24filter=contains%28HotelID%2C%27C4_315080000H_003044%27%29&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.tourismInfo = res.data[0]
          this.pictureData = res.data[0].Picture
          this.currentTourismPosition = res.data[0].Position
          const arrPics = Object.values(this.pictureData)
          console.log('arrPics', arrPics)
          this.bannerImages = arrPics.filter((item, index) => {
            return index % 2 === 0 ? item : null
          })
          emitter.emit('stop-loading')
          const { PositionLon, PositionLat } = res.data[0].Position
          this.getNearbyInfo(PositionLon, PositionLat)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // longitude 表示經度，latitude 表示緯度
    getNearbyInfo (longitude, latitude) {
      const url = `https://tdx.transportdata.tw/api/advanced/V3/Map/GeoLocating/Tourism/Nearby/LocationX/${longitude}/LocationY/${latitude}/Distance/1000?%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          console.log(res.data[0])
          this.nearByInfos.ScenicSpot = res.data[0].ScenicSpots.ScenicSpotList
          this.nearByInfos.Restaurant = res.data[0].Restaurants.RestaurantList
          this.nearByInfos.Hotel = res.data[0].Hotels.HotelList
          console.log(this.nearByInfos.ScenicSpot, this.nearByInfos.Restaurant, this.nearByInfos.Hotel)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showBannerImg (index) {
      // if (index < 0) {
      //   this.transitionName = 'slide-left-in'
      //   this.showBanner = this.bannerImages.length - 1
      // } else if (index > this.bannerImages.length - 1) {
      //   this.transitionName = 'slide-right-in'
      //   this.showBanner = 0
      // } else {
      //   this.transitionName = this.showBanner < index ? 'slide-right-in' : 'slide-left-in'
      //   this.showBanner = index
      // }
      // if (index > this.bannerImages.length - 1) {
      //   this.transitionName = 'slide-right-in'
      //   this.showBanner = 0
      // } else {
      //   this.transitionName = this.showBanner < index ? 'slide-right-in' : 'slide-left-in'
      //   this.showBanner = index
      // }
      // this.transitionName = this.showBanner < index ? 'slide-right-in' : 'slide-right-in'
      this.showBanner = index
      clearInterval(timer)
      timer = setInterval(this.slideShow, 2500)
    },
    slideShow () {
      this.bannerImages.length >= 2 ? this.showBanner += 1 : this.showBanner = 0
      if (this.showBanner > 2) {
        this.showBanner = 0
      }
    },
    enterTourismDetail (id, city, category) {
      this.$router.push({
        name: 'detail',
        query: {
          id: id,
          city: city,
          category: category
        }
      })
    },
    openPinItems () {
      this.$refs.pinItemsModalRef.openModal()
    },
    switchPinItem (id, category) {
      const obj = {
        id: id,
        category: category
      }
      const pinItemIndex = this.pin.findIndex((item) => item.id === obj.id)
      pinItemIndex === -1 ? this.pin.push(obj) : this.pin.splice(pinItemIndex, 1)
      emitter.emit('get-pin-items', this.pin)
    }
  },
  watch: {
    showBanner (newVal, oldVal) {
      if (newVal < 0) {
        this.transitionName = 'slide-left-in'
        this.showBanner = this.bannerImages.length - 1
      } else if (newVal > this.bannerImages.length - 1) {
        this.transitionName = 'slide-right-in'
        this.showBanner = 0
      } else {
        this.transitionName = newVal > oldVal ? 'slide-right-in' : 'slide-left-in'
      }
    },
    $route: {
      handler () {
        this.getTourismContent()
        this.getFilterInfo()
        this.reload()
        // location.reload()
      },
      deep: true
    }
    // pin: {
    //   handler () {
    //     localStorage.setItem('pin-items', JSON.stringify(this.pin))
    //   },
    //   deep: true
    // }
  },
  mounted () {
    this.getTourismContent()
    timer = setInterval(this.slideShow, 2500)
    this.getFilterInfo()
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
.main {
  min-height: calc(100vh - (32vh + 400px));
}

.tourism-pin-area {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: -90px;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
}

.tourism-contact-infos {
  img {
    width: 20px;
    height: 20px;
  }
}

.card {
  border-radius: 20px;
}

.carousel-area {
  width: 100%;
  height: 32vh;
  position: relative;
  overflow: hidden;
}

.carousel-img-item {
  position: absolute;
  height: 100%;
}

.carousel-img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
}

// 右側滑入
.slide-right-in-enter-from {
  left: 100%;
}

.slide-right-in-enter-active, .slide-right-in-leave-active {
  transition: left 0.5s;
}

.slide-right-in-enter-to, .slide-right-in-leave-from {
  left: 0;
}
.slide-right-in-leave-to {
  left: -100%;
}

// 左側滑入
.slide-left-in-enter-from {
  left: -100%;
}

.slide-left-in-enter-active, .slide-left-in-leave-active {
  transition: left 0.5s;
}

.slide-left-in-enter-to, .slide-left-in-leave-from {
  left: 0;
}
.slide-left-in-leave-to {
  left: 100%;
}

.carousel-btns {
  position: relative;
  height: 100%;
  padding-bottom: 20px;
}

.card-img {
  position: absolute;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.card-info {
  aspect-ratio: 4 / 5;
  z-index: 1;
}

.pin {
  width: 60px;
  height: 60px;
  border-radius:0 20px 0 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
}

.shadow-layer {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 80%);
  border-radius: 20px;
}

.time p {
  padding-left: 35px;
}
</style>
