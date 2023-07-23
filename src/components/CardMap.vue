<template>
  <div class="container card-map-area">
    <!-- 景點卡片 -->
    <template v-if="this.$route.query.category === 'ScenicSpot'">
      <swiper
        :modules="modules"
        :navigation="true"
        :slides-per-view="1"
        :space-between="40"
        :breakpoints="{
          '576': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          '1200': {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          '1400': {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }"
      >
        <swiper-slide v-for="item in mapFilterData" :key="item.ScenicSpotID">
          <div class="row flex-nowrap vw-100">
            <div class="col pb-2 card-map-center">
              <div class="card card-info card-map-item position-relative border-0 h-100">
                <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-list-page.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
                <div class="card-body card-info text-white shadow-layer">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.ScenicSpotID, 'ScenicSpot')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.ScenicSpotID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex  flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-primary py-1 px-2 rounded">景點</span></div>
                    <h5 class="card-title fw-bold">{{ item.ScenicSpotName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link :to="{
                      path:'/tourdetail',
                      query: {
                        id: item.ScenicSpotID,
                        city: this.$route.query.city,
                        category: this.$route.query.category
                      }
                    }"  class="stretched-link">
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </template>

    <!-- 餐廳卡片 -->
    <template v-if="this.$route.query.category === 'Restaurant'">
      <swiper
        :modules="modules"
        :navigation="true"
        :slides-per-view="1"
        :space-between="40"
        :breakpoints="{
          '576': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          '1200': {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          '1400': {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }"
      >
        <swiper-slide v-for="item in mapFilterData" :key="item.RestaurantID">
          <div class="row flex-nowrap vw-100">
            <div class="col pb-2 card-map-center">
              <div class="card card-info card-map-item position-relative border-0 h-100">
                <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-list-page.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
                <div class="card-body card-info text-white shadow-layer">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.RestaurantID, 'Restaurant')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.RestaurantID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex  flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-danger py-1 px-2 rounded">餐廳</span></div>
                    <h5 class="card-title fw-bold">{{ item.RestaurantName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link :to="{
                      path:'/tourdetail',
                      query: {
                        id: item.RestaurantID,
                        city: this.$route.query.city,
                        category: this.$route.query.category
                      }
                    }"  class="stretched-link">
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </template>

    <!-- 旅宿卡片 -->
    <template v-if="this.$route.query.category === 'Hotel'">
      <swiper
        :modules="modules"
        :navigation="true"
        :slides-per-view="1"
        :space-between="40"
        :breakpoints="{
          '576': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          '1200': {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          '1400': {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }"
      >
        <swiper-slide v-for="item in mapFilterData" :key="item.HotelID">
          <div class="row flex-nowrap vw-100">
            <div class="col pb-2 card-map-center">
              <div class="card card-info card-map-item position-relative border-0 h-100">
                <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-list-page.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
                <div class="card-body card-info text-white shadow-layer">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.HotelID, 'Hotel')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.HotelID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex  flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-secondary py-1 px-2 rounded">旅宿</span></div>
                    <h5 class="card-title fw-bold">{{ item.HotelName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link :to="{
                      path:'/tourdetail',
                      query: {
                        id: item.HotelID,
                        city: this.$route.query.city,
                        category: this.$route.query.category
                      }
                    }"  class="stretched-link">
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </template>

    <!-- 活動卡片 -->
    <template v-if="this.$route.query.category === 'Activity'">
      <swiper
        :modules="modules"
        :navigation="true"
        :slides-per-view="1"
        :space-between="40"
        :breakpoints="{
          '576': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          '1200': {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          '1400': {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }"
      >
        <swiper-slide v-for="item in mapFilterData" :key="item.ActivityID">
          <div class="row flex-nowrap vw-100">
            <div class="col pb-2 card-map-center">
              <div class="card card-info card-map-item position-relative border-0 h-100">
                <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-list-page.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
                <div class="card-body card-info text-white shadow-layer">
                  <div class="pin bg-white">
                    <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.ActivityID, 'Activity')">
                      <span v-if="pin.find(pinItem => pinItem.id === item.ActivityID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                      <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                    </a>
                  </div>
                  <div class="d-flex  flex-column h-100 justify-content-end">
                    <div class="tag mb-2"><span class="bg-success py-1 px-2 rounded">活動</span></div>
                    <h5 class="card-title fw-bold">{{ item.ActivityName }}</h5>
                    <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                    <router-link :to="{
                      path:'/tourdetail',
                      query: {
                        id: item.ActivityID,
                        city: this.$route.query.city,
                        category: this.$route.query.category
                      }
                    }"  class="stretched-link">
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </template>

  </div>
</template>

<script>
import emitter from '@/libs/emitter'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import Swiper core and required modules
import { Navigation, Scrollbar } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    cardData: {
      type: Array
    }
  },
  data () {
    return {
      mapFilterData: [],
      modules: [Navigation, Scrollbar],
      pin: JSON.parse(localStorage.getItem('pin-items')) || []
    }
  },
  methods: {
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
    cardData () {
      this.mapFilterData = this.cardData
      if (this.mapFilterData.length === 0) {
        this.$swal.fire({
          icon: 'info',
          title: '不好意思',
          text: '目前沒有相關資訊',
          confirmButtonColor: '#FDB44B'
        })
      }
      console.log('watch', this.mapFilterData)
    }
  },
  mounted () {
    this.filterData = this.cardData
    console.log('mapFilterData', this.mapFilterData)
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
.card-map-area {
  position: absolute;
  bottom: 0%;
  right: 0;
  left: 0;
  max-width: 100%;
  z-index: 10;
}

// .card-scroll-set {
//   overflow-x: auto;
// }

.card-map-item {
  width: 200px;
  border-radius: 20px;
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

@media (max-width: 576px) {
  .card-map-item {
    width: 70%;
  }
  .card-info {
    aspect-ratio: 6/4;
  }
  .card-map-center {
    display: flex;
    justify-content: center;
  }
}

.shadow-layer {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 80%);
  border-radius: 20px;
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

.swiper-button-prev::after , .swiper-button-next::after {
  color: rgb(241, 70, 64);
}
</style>
