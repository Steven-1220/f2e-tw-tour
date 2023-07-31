<template>
  <div class="container my-3">
    <!-- 鄰近景點 -->
    <div class="d-flex justify-content-between my-4">
      <h4 class="fw-bold">鄰近景點</h4>
      <router-link class="text-decoration-none" :to="{
        path:'/tourlist',
        query: {
          city: this.$route.query.city,
          category: 'ScenicSpot'
        }
      }"><i class="bi bi-caret-right-fill"></i>更多景點
      </router-link>
    </div>
    <div class="row g-3">
      <template v-if="renderPageScenicSpotData.length >= 1">
        <div class="col-6 col-md-4 col-lg-3" v-for="(item, index) in renderPageScenicSpotData" :key="index + '123'">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-img.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
            <div class="card-body card-info text-white shadow-layer">
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
                <router-link class="stretched-link" to="/tourdetail" @click="enterTourismDetail(item.ScenicSpotID, currentPageCity,'ScenicSpot')">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="renderPageScenicSpotData.length === 0">
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card  position-relative border h-100" >
            <div class="card-title text-dark fw-bold p-2 mb-0">
              無鄰近景點<i class="bi bi-emoji-frown ps-2"></i>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 鄰近美食 -->
    <div class="d-flex justify-content-between my-4">
      <h4 class="fw-bold">鄰近美食</h4>
      <router-link class="text-decoration-none" :to="{
        path:'/tourlist',
        query: {
          city: this.$route.query.city,
          category: 'Restaurant'
        }
      }"><i class="bi bi-caret-right-fill"></i>更多美食
      </router-link>
    </div>
    <div class="row g-3">
      <template v-if="renderPageRestaurantData.length >= 1">
        <div class="col-6 col-md-4 col-lg-3" v-for="(item, index) in renderPageRestaurantData" :key="index + '123'">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-img.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
            <div class="card-body card-info text-white shadow-layer">
              <div class="pin bg-white">
                <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.RestaurantID, 'Restaurant')">
                  <span v-if="pin.find(pinItem => pinItem.id === item.RestaurantID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                  <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                </a>
              </div>
              <div class="d-flex flex-column h-100 justify-content-end">
                <div class="tag mb-2"><span class="bg-danger py-1 px-2 rounded">美食</span></div>
                <h5 class="card-title fw-bold">{{ item.RestaurantName }}</h5>
                <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                <router-link class="stretched-link" to="/tourdetail" @click="enterTourismDetail(item.RestaurantID, currentPageCity,'Restaurant')">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="renderPageRestaurantData.length === 0">
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card  position-relative border h-100" >
            <div class="card-title text-dark fw-bold p-2 mb-0">
              無鄰近美食<i class="bi bi-emoji-frown ps-2"></i>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 鄰近旅宿 -->
    <div class="d-flex justify-content-between my-4">
      <h4 class="fw-bold">鄰近旅宿</h4>
      <router-link class="text-decoration-none" :to="{
        path:'/tourlist',
        query: {
          city: this.$route.query.city,
          category: 'Hotel'
        }
      }"><i class="bi bi-caret-right-fill"></i>更多旅宿
      </router-link>
    </div>
    <div class="row g-3">
      <template v-if="renderPageHotelData.length >= 1">
        <div class="col-6 col-md-4 col-lg-3" v-for="(item, index) in renderPageHotelData" :key="index + '123'">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1 || require('@/assets/images/card-img.jpg')" class="card-img" :alt="item.Picture?.PictureDescription1">
            <div class="card-body card-info text-white shadow-layer">
              <div class="pin bg-white">
                <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.HotelID, 'Hotel')">
                  <span v-if="pin.find(pinItem => pinItem.id === item.HotelID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                  <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                </a>
              </div>
              <div class="d-flex flex-column h-100 justify-content-end">
                <div class="tag mb-2"><span class="bg-secondary py-1 px-2 rounded">旅宿</span></div>
                <h5 class="card-title fw-bold">{{ item.HotelName }}</h5>
                <p class="location"><img src="../assets/images/location.svg" alt="位置">{{ item.City }}</p>
                <router-link class="stretched-link" to="/tourdetail" @click="enterTourismDetail(item.HotelID, currentPageCity,'Hotel')">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="renderPageHotelData.length === 0">
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card  position-relative border h-100" >
            <div class="card-title text-dark fw-bold p-2 mb-0">
              無鄰近旅宿<i class="bi bi-emoji-frown ps-2"></i>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  props: {
    nearByCard: {
      type: Object
    }
  },
  data () {
    return {
      relatedNearbyInfos: { },
      randomScenicSpotData: [],
      randomScenicSpotId: [],
      renderPageScenicSpotData: [],
      randomRestaurantData: [],
      randomRestaurantId: [],
      renderPageRestaurantData: [],
      randomHotelData: [],
      randomHotelId: [],
      renderPageHotelData: [],
      currentPageId: this.$route.query.id,
      currentPageCity: this.$route.query.city,
      token: JSON.parse(localStorage.getItem('TdxToken')) || [],
      pin: JSON.parse(localStorage.getItem('pin-items')) || []
    }
  },
  methods: {
    getNearByScenicSpotId (category) {
      const randomScenicSpotData = this.processData(category)
      this.randomScenicSpotId = randomScenicSpotData.map(item => {
        return item.ScenicSpotID
      })
      this.constructNewRenderData(this.randomScenicSpotId, 'ScenicSpot')
    },
    getNearByRestaurantId (category) {
      const randomRestaurantData = this.processData(category)
      this.randomRestaurantId = randomRestaurantData.map(item => {
        return item.RestaurantID
      })
      this.constructNewRenderData(this.randomRestaurantId, 'Restaurant')
    },
    getNearByHotelId (category) {
      const randomHotelData = this.processData(category)
      this.randomHotelId = randomHotelData.map(item => {
        return item.HotelID
      })
      this.constructNewRenderData(this.randomHotelId, 'Hotel')
    },
    constructNewRenderData (randomCategoryId, category) {
      randomCategoryId.forEach((id) => {
        this.switchId(id, category)
      })
    },
    processData (category) {
      const categoryData = JSON.parse(JSON.stringify(this.relatedNearbyInfos[`${category}`]))
      const isSameID = categoryData.some(item => item[`${category}ID`] === this.currentPageId)

      if (isSameID) {
        const currentPageIndex = categoryData.findIndex(item => {
          return item[`${category}ID`] === this.currentPageId
        })
        categoryData.splice(currentPageIndex, 1)
      }
      let randomCategoryData = []
      if (categoryData.length >= 4) {
        for (let i = 1; i <= 4; i++) {
          const randomIndex = Math.floor(Math.random() * categoryData.length)
          const arr = categoryData.splice(randomIndex, 1)
          randomCategoryData.push(arr[0])
        }
      } else if (categoryData.length < 4 && categoryData.length >= 1) {
        randomCategoryData = categoryData
      }
      return randomCategoryData
    },
    switchId (id, category) {
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}?%24filter=contains%28${category}ID%2C%27${id}%27%29&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          if (category === 'ScenicSpot' && res.data.length !== 0) {
            this.renderPageScenicSpotData.push(res.data[0])
          } else if (category === 'Restaurant' && res.data.length !== 0) {
            this.renderPageRestaurantData.push(res.data[0])
          } else if (category === 'Hotel' && res.data.length !== 0) {
            this.renderPageHotelData.push(res.data[0])
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    enterTourismDetail (id, city, category) {
      this.$emit('emit-nearby-info', id, city, category)
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
    nearByCard: {
      handler () {
        this.relatedNearbyInfos = this.nearByCard
        this.$nextTick(() => {
          this.getNearByScenicSpotId('ScenicSpot')
          this.getNearByRestaurantId('Restaurant')
          this.getNearByHotelId('Hotel')
        })
      },
      deep: true
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
.card {
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
</style>
