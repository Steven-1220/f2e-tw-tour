<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col d-flex justify-content-center align-items-center">
          <GoHomeCircle></GoHomeCircle>
          <FixPinButton></FixPinButton>
        </div>
      </div>
    </div>
    <div class="container select-map-location">
      <LoadingView></LoadingView>
      <div class="row justify-content-center align-items-center">
        <div class="col-2">
          <select class="form-select rounded-pill text-center shadow mb-0 me-3 fw-bold" v-model="selectCity" @change="selectMapCity">
            <!-- <option value="all">全部</option> -->
            <template v-for="item in cities" :key="item.englishName">
              <option :value="item.englishName">{{ item.traditionalName }}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
    <div class="container select-map-group">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 d-flex justify-content-between">
          <select class="form-select rounded-pill text-center shadow mb-0 me-3 select-map-category fw-bold" v-model="selectCategory" @change="selectMapCategory">
            <option value="all">全部</option>
            <template v-for="item in categories" :key="item.englishName">
              <option :value="item.englishName">{{ item.traditionalName }}</option>
            </template>
          </select>
          <router-link :to="{
            path:'/tourlist',
            query: {
                city: this.$route.query.city,
                category: this.$route.query.category
              }
          }" class="btn rounded-circle bg-white">
            <img src="../assets/images/list.svg" alt="回到旅遊清單頁面">
          </router-link>
        </div>
      </div>
    </div>
    <CardMap :card-data="mapCardData"></CardMap>
    <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import CardMap from '@/components/CardMap.vue'
import GoHomeCircle from '@/components/GoHomeCircle.vue'
import FixPinButton from '@/components/FixPinButton.vue'
import LoadingView from '@/components/LoadingView.vue'
import emitter from '@/libs/emitter'

let osmMap = {}
export default {
  components: {
    CardMap,
    GoHomeCircle,
    FixPinButton,
    LoadingView
  },
  data () {
    return {
      mapCardData: [],
      selectCity: '',
      selectCategory: '',
      cities: [
        {
          traditionalName: '臺北市',
          englishName: 'Taipei'
        },
        {
          traditionalName: '新北市',
          englishName: 'NewTaipei'
        },
        {
          traditionalName: '桃園市',
          englishName: 'Taoyuan'
        },
        {
          traditionalName: '臺中市',
          englishName: 'Taichung'
        },
        {
          traditionalName: '臺南市',
          englishName: 'Tainan'
        },
        {
          traditionalName: '高雄市',
          englishName: 'Kaohsiung'
        },
        {
          traditionalName: '基隆市',
          englishName: 'Keelung'
        },
        {
          traditionalName: '新竹市',
          englishName: 'Hsinchu'
        },
        {
          traditionalName: '新竹縣',
          englishName: 'HsinchuCounty'
        },
        {
          traditionalName: '苗栗縣',
          englishName: 'MiaoliCounty'
        },
        {
          traditionalName: '彰化縣',
          englishName: 'ChanghuaCounty'
        },
        {
          traditionalName: '南投縣',
          englishName: 'NantouCounty'
        },
        {
          traditionalName: '雲林縣',
          englishName: 'YunlinCounty'
        },
        {
          traditionalName: '嘉義縣',
          englishName: 'ChiayiCounty'
        },
        {
          traditionalName: '嘉義市',
          englishName: 'Chiayi'
        },
        {
          traditionalName: '屏東縣',
          englishName: 'PingtungCounty'
        },
        {
          traditionalName: '宜蘭縣',
          englishName: 'YilanCounty'
        },
        {
          traditionalName: '花蓮縣',
          englishName: 'HualienCounty'
        },
        {
          traditionalName: '臺東縣',
          englishName: 'TaitungCounty'
        },
        {
          traditionalName: '金門縣',
          englishName: 'KinmenCounty'
        },
        {
          traditionalName: '澎湖縣',
          englishName: 'PenghuCounty'
        },
        {
          traditionalName: '連江縣',
          englishName: 'LienchiangCounty'
        }
      ],
      categories: [
        {
          traditionalName: '觀光景點',
          englishName: 'ScenicSpot'
        },
        {
          traditionalName: '道地美食',
          englishName: 'Restaurant'
        },
        {
          traditionalName: '特色旅宿',
          englishName: 'Hotel'
        },
        {
          traditionalName: '精彩活動',
          englishName: 'Activity'
        }
      ],
      ScenicSpotIcon: new L.Icon({
        iconUrl: require('../assets/images/icon-C1.svg'),
        iconSize: [38, 50]
      }),
      RestaurantIcon: new L.Icon({
        iconUrl: require('../assets/images/icon-C3.svg'),
        iconSize: [38, 50]
      }),
      HotelIcon: new L.Icon({
        iconUrl: require('../assets/images/icon-C4.svg'),
        iconSize: [38, 50]
      }),
      ActivityIcon: new L.Icon({
        iconUrl: require('../assets/images/icon-C2.svg'),
        iconSize: [38, 50]
      }),
      specificCity: {
        ScenicSpotData: [],
        RestaurantData: [],
        HotelData: [],
        ActivityData: []
      },
      token: JSON.parse(localStorage.getItem('TdxToken')) || []
    }
  },
  methods: {
    showMap () {
      osmMap = L.map('map', {
      // 預設台北座標
        center: [25.03, 121.55],
        zoom: 10
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(osmMap)
    },
    getCustomTourismInfo () {
      emitter.emit('start-loading')
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${this.selectCategory}/${this.selectCity}?%24top=50&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          // this.mapData = res.data
          this.mapCardData = res.data
          const data = res.data
          this.determineMarkerCategory(data)
          emitter.emit('stop-loading')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCityAllCategories () {
      emitter.emit('start-loading')
      const categories = ['ScenicSpot', 'Restaurant', 'Hotel', 'Activity']
      categories.forEach(category => {
        const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}/${this.selectCity}?%24top=50&%24format=JSON`
        this.$http.get(url, {
          headers: {
            authorization: 'Bearer ' + this.token
          }
        })
          .then(res => {
            setTimeout(() => {
              emitter.emit('stop-loading')
            }, 1500)
            if (category === 'ScenicSpot') {
              this.specificCity.ScenicSpotData = res.data
              const data = this.specificCity.ScenicSpotData
              this.setScenicSpotMarker(data)
            } else if (category === 'Restaurant') {
              this.specificCity.RestaurantData = res.data
              const data = this.specificCity.RestaurantData
              this.setRestaurantMarker(data)
            } else if (category === 'Hotel') {
              this.specificCity.HotelData = res.data
              const data = this.specificCity.HotelData
              this.setHotelMarker(data)
            } else if (category === 'Activity') {
              this.specificCity.ActivityData = res.data
              const data = this.specificCity.ActivityData
              this.setActivityMarker(data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    determineMarkerCategory (data) {
      if (this.$route.query.category === 'ScenicSpot') this.setScenicSpotMarker(data)
      if (this.$route.query.category === 'Restaurant') this.setRestaurantMarker(data)
      if (this.$route.query.category === 'Hotel') this.setHotelMarker(data)
      if (this.$route.query.category === 'Activity') this.setActivityMarker(data)
    },
    setScenicSpotMarker (data) {
      // PositionLat 緯度 ，PositionLon 經度
      data.forEach(item => {
        L.marker([item.Position?.PositionLat, item.Position?.PositionLon], { icon: this.ScenicSpotIcon })
          .addTo(osmMap).bindPopup(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-bold">${item.ScenicSpotName}</h5>
              <p class="card-text">
                <a href="https://www.google.com/maps/place/${item.Address}" target="_blank" 
                  class="text-decoration-none link-primary">
                  ${item.Address}
                </a>
              </p>
            </div>
          </div>
          `)
      })
      this.moveLocation(data[0])
    },
    setRestaurantMarker (data) {
      if (data.length === 0) return
      data.forEach(item => {
        L.marker([item.Position?.PositionLat, item.Position?.PositionLon], { icon: this.RestaurantIcon })
          .addTo(osmMap).bindPopup(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-bold">${item.RestaurantName}</h5>
              <p class="card-text">
                <a href="https://www.google.com/maps/place/${item.Address}" target="_blank" 
                  class="text-decoration-none link-danger">
                  ${item.Address}
                </a>
              </p>
            </div>
          </div>
          `)
      })
      this.moveLocation(data[0])
    },
    setHotelMarker (data) {
      data.forEach(item => {
        L.marker([item.Position?.PositionLat, item.Position?.PositionLon], { icon: this.HotelIcon })
          .addTo(osmMap).bindPopup(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-bold">${item.HotelName}</h5>
              <p class="card-text">
                <a href="https://www.google.com/maps/place/${item.Address}" target="_blank" 
                  class="text-decoration-none link-secondary">
                  ${item.Address}
                </a>
              </p>
            </div>
          </div>
          `)
      })
      this.moveLocation(data[0])
    },
    setActivityMarker (data) {
      if (data.length === 0) return
      data.forEach(item => {
        L.marker([item.Position?.PositionLat, item.Position?.PositionLon], { icon: this.ActivityIcon })
          .addTo(osmMap).bindPopup(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-bold">${item.ActivityName}</h5>
              <p class="card-text">
                <a href="https://www.google.com/maps/place/${item.Address}" target="_blank" 
                  class="text-decoration-none link-success">
                  ${item.Address}
                </a>
              </p>
            </div>
          </div>
          `)
      })
      this.moveLocation(data[0])
    },
    moveLocation (item) {
      osmMap.panTo([item.Position.PositionLat, item.Position.PositionLon])
    },
    deleteMarker () {
      osmMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          osmMap.removeLayer(layer)
        }
      })
    },
    selectMapCity () {
      this.deleteMarker()
      if (this.selectCategory !== 'all') {
        this.$router.replace({
          name: 'map',
          query: {
            city: this.selectCity,
            category: this.selectCategory
          }
        })
        this.getCustomTourismInfo()
      } else if (this.selectCategory === 'all') {
        this.getCityAllCategories()
      }
    },
    selectMapCategory () {
      this.deleteMarker()
      console.log(this.selectCategory)
      if (this.selectCategory !== 'all') {
        this.$router.replace({
          name: 'map',
          query: {
            city: this.selectCity,
            category: this.selectCategory
          }
        })
        this.getCustomTourismInfo()
      } else if (this.selectCategory === 'all') {
        this.getCityAllCategories()
      }
    }
  },
  mounted () {
    this.showMap()
    const { city, category } = this.$route.query
    this.selectCity = city
    this.selectCategory = category
    this.getCustomTourismInfo()
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100vh;
  z-index: 0;
}

.select-map-location {
  position: absolute;
  top: 10%;
  right: 0;
  left: 0;
  z-index: 10;
  select {
    min-width: 120px;
  }
}

.select-map-group {
  position: absolute;
  bottom: 30%;
  right: 0;
  left: 0;
  z-index: 10;
}

.select-map-category {
  max-width: 140px;
}
</style>
