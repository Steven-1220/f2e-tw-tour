<template>
  <div class="mb-5">
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
      <!-- 景點卡片 -->
      <template v-if="isScenicSpot">
        <div class="col" v-for="item in currentPageData" :key="item.ScenicSpotID">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1" class="card-img" :alt="item.Picture?.PictureDescription1">
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
                <p class="location"><img src="../assets/images/location.svg" alt="位置"> {{ item.City }}</p>
                <router-link :to="{
                  path:'/tourdetail',
                  query: {
                    id: item.ScenicSpotID,
                    city: city,
                    category: category
                  }
                }"  class="stretched-link">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 餐廳卡片 -->
      <template v-if="isRestaurant">
        <div class="col" v-for="item in currentPageData" :key="item.RestaurantID">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1" class="card-img" :alt="item.Picture?.PictureDescription1">
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
                <p class="location"><img src="../assets/images/location.svg" alt="位置"> {{ item.City }}</p>
                <router-link :to="{
                  path:'/tourdetail',
                  query: {
                    id: item.RestaurantID,
                    city: city,
                    category: category
                  }
                }"  class="stretched-link">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 旅宿卡片 -->
      <template v-if="isHotel">
        <div class="col" v-for="item in currentPageData" :key="item.HotelID">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1" class="card-img" :alt="item.Picture?.PictureDescription1">
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
                <p class="location"><img src="../assets/images/location.svg" alt="位置"> {{ item.City }}</p>
                <router-link :to="{
                  path:'/tourdetail',
                  query: {
                    id: item.HotelID,
                    city: city,
                    category: category
                  }
                }"  class="stretched-link">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 活動卡片 -->
      <template v-if="isActivity">
        <div class="col" v-for="item in currentPageData" :key="item.ActivityID">
          <div class="card card-info position-relative border-0 h-100" >
            <img :src="item.Picture.PictureUrl1" class="card-img" :alt="item.Picture?.PictureDescription1">
            <div class="card-body card-info text-white shadow-layer">
              <div class="pin bg-white">
                <a class="d-flex justify-content-center align-items-center h-100" @click="switchPinItem(item.ActivityID, 'Activity')">
                  <span v-if="pin.find(pinItem => pinItem.id === item.ActivityID)"><img src="../assets/images/pin-active.png" alt="已釘選"></span>
                  <span v-else><img src="../assets/images/pin.png" alt="未釘選"></span>
                </a>
              </div>
              <div class="d-flex flex-column h-100 justify-content-end">
                <div class="tag mb-2"><span class="bg-success py-1 px-2 rounded">活動</span></div>
                <h5 class="card-title fw-bold">{{ item.ActivityName }}</h5>
                <p class="location"><img src="../assets/images/location.svg" alt="位置"> {{ item.City }}</p>
                <router-link :to="{
                  path:'/tourdetail',
                  query: {
                    id: item.ActivityID,
                    city: city,
                    category: category
                  }
                }"  class="stretched-link">
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <template v-if="currentPageData.length === 0">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="card">
              <div class="card-body text-center">
                <p class="mb-0">很抱歉，目前沒有相關資訊</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <template v-if="currentPageData.length !== 0">
    <PaginationView :all-pages-data="pageInfo" @emit-get-page="processPageData"></PaginationView>
  </template>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import emitter from '@/libs/emitter'

export default {
  components: {
    PaginationView
  },
  props: {
    cardData: {
      type: Array
    }
  },
  data () {
    return {
      filterData: [],
      currentPageData: [],
      pageInfo: {
        totalPages: 1,
        currentPage: 1,
        isFirstPage: true,
        isLastPage: false
      },
      isScenicSpot: false,
      isRestaurant: false,
      isHotel: false,
      isActivity: false,
      city: '',
      category: '',
      undefinedCard: require('../assets/images/card-list-page.jpg'),
      pin: JSON.parse(localStorage.getItem('pin-items')) || []
    }
  },
  watch: {
    cardData () {
      const filterApiData = this.cardData.map(item => {
        if (item.Picture.PictureUrl1 === undefined) {
          item.Picture.PictureUrl1 = this.undefinedCard
        }
        const pattern = /\/d\/([^/]+)\//
        const url = 'https://drive.google.com/uc?export=view&id='
        if (item.Picture.PictureUrl1.startsWith('https://drive.google.com/file/d/')) {
          const id = item.Picture.PictureUrl1.match(pattern)[1]
          item.Picture.PictureUrl1 = `${url}${id}`
        }
        if (item.Picture.PictureUrl1.startsWith('https://2022.art-taipei') || item.Picture.PictureUrl1.startsWith('https://mw/cufiles')) {
          item.Picture.PictureUrl1 = this.undefinedCard
        } else if (item.Picture.PictureUrl1.startsWith('https://www.facebook') || item.Picture.PictureUrl1.startsWith('https://www.taiwantourbus')) {
          item.Picture.PictureUrl1 = this.undefinedCard
        } else if (item.Picture.PictureUrl1.startsWith('https://www.eastcoast-nsa')) {
          item.Picture.PictureUrl1 = this.undefinedCard
        } else if (item.Picture.PictureUrl1.startsWith('https://ppt.cc')) {
          item.Picture.PictureUrl1 = this.undefinedCard
        }
        return item
      })
      this.filterData = filterApiData
      this.processPageData()
    },
    $route () {
      this.getCategoryInfo()
    }
  },
  methods: {
    processPageData (currentPage = 1) {
      const dataPerPage = 48
      this.pageInfo.totalPages = Math.ceil(this.filterData.length / dataPerPage)

      const minPerPageData = dataPerPage * currentPage - dataPerPage + 1
      const maxPerPageData = dataPerPage * currentPage
      this.currentPageData = []
      this.filterData.forEach((item, index) => {
        if (index + 1 >= minPerPageData && index + 1 <= maxPerPageData) {
          this.currentPageData.push(item)
        }
      })
    },
    getCategoryInfo () {
      const { city, category } = this.$route.query
      category !== 'ScenicSpot' ? this.isScenicSpot = false : this.isScenicSpot = true
      category !== 'Restaurant' ? this.isRestaurant = false : this.isRestaurant = true
      category !== 'Hotel' ? this.isHotel = false : this.isHotel = true
      category !== 'Activity' ? this.isActivity = false : this.isActivity = true
      this.city = city
      this.category = category
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
  mounted () {
    this.getCategoryInfo()
    emitter.on('get-pin-items', (pin) => {
      this.pin = pin
    })
  }
}
</script>

<style lang="scss">
.card-img {
  position: absolute;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.card-info {
  aspect-ratio: 2 / 3;
  z-index: 1;
}

@media (min-width: 420px) {
  .card-info {
    aspect-ratio: 4 / 5;
  }
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
