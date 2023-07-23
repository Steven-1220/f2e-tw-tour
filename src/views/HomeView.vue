<template>
  <div class="home">
    <div class="position-relative">
      <img src="../assets/images/ellipse.svg" class="orange-circle" alt="首頁橘色圓">
      <div class="container custom-select">
        <div class="row vh-100 justify-content-center">
          <div class="col-10 col-md-8">
            <img src="../assets/images/logo.svg"  class="lets-go" alt="let's go 文字圖片">
            <img src="../assets/images/rocket.png" class="rocket" alt="火箭">
            <img src="../assets/images/font-taiwan.svg" class="tw-logo" alt="台灣文字圖片">
          </div>
          <div class="col-10 col-md-4 d-flex flex-column justify-content-center mt-auto mt-md-0 pb-8 pb-md-0">
              <h1 class="text-white text-center mb-6">訂製你的專屬旅程</h1>
              <select class="form-select rounded-pill text-center mb-4 py-2 fs-5" v-model="selectCity">
                <option value="">選擇地點</option>
                <template v-for="item in cities" :key="item.englishName">
                  <option :value="item.englishName">{{ item.traditionalName }}</option>
                </template>
              </select>
              <select class="form-select rounded-pill text-center mb-4 py-2 fs-5" v-model="selectCategory">
                <option value="">類別</option>
                <template v-for="item in categories" :key="item.englishName">
                  <option :value="item.englishName">{{ item.traditionalName }}</option>
                </template>
              </select>
              <input type="text" class="form-control rounded-pill mb-4 py-2 fs-5"
              v-model="search" placeholder="以關鍵字找尋..">
              <ul class="search-list bg-white list-unstyled d-flex flex-column" v-if="isSearchList">
                <li v-for="item in processSearchWord" :key="item.id">
                  <router-link class="d-block text-decoration-none p-1" :to="{
                    path: '/tourdetail',
                    query: {
                      id: item.id,
                      city: item.engName,
                      category: item.category
                    }
                  }">
                    {{ item.titleName }}
                  </router-link>
                </li>
              </ul>
              <button class="btn btn-primary rounded-pill w-100 text-white fs-5" @click="searchTourInfo">
                <span class="d-flex justify-content-center align-items-center"><img src="../assets/images/search.svg" class="me-3" alt="搜尋按鈕">搜尋</span>
              </button>
              <div class="alert alert-danger mt-3" role="alert" v-if="isNotConfirmSearch">
                請選擇<span class="fw-bold">地點</span>和<span class="fw-bold">類別</span>，或是以<span class="fw-bold">關鍵字</span>找尋
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import getTdxAuthorize from '@/libs/TDXauthorize'

export default {
  data () {
    return {
      selectCity: '',
      selectCategory: '',
      search: '',
      allData: [],
      scenicSpotData: [],
      restaurantData: [],
      hotelData: [],
      activityData: [],
      unifyStandardData: [],
      isSearchList: false,
      isNotConfirmSearch: true,
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
      token: JSON.parse(localStorage.getItem('TdxToken')) || []
    }
  },
  methods: {
    searchTourInfo () {
      if (this.selectCity !== '' && this.selectCategory !== '' && this.search.trim() === '') {
        this.$router.push({
          name: '旅遊清單頁面',
          query: {
            city: this.selectCity,
            category: this.selectCategory
          }
        })
      } else if (this.search.trim() !== '') {
        this.keyWordSearch()
      } else {
        this.isNotConfirmSearch = true
      }
    },
    keyWordSearch () {
      console.log('unifyStandardData', this.unifyStandardData)
      const keyWord = this.unifyStandardData.filter(item => {
        return item.titleName.includes(this.search)
      })
      if (keyWord.length === 0) {
        return null
      } else if (keyWord[0].titleName === this.search) {
        this.$router.push({
          name: 'detail',
          query: {
            id: keyWord[0].id,
            city: keyWord[0].engName,
            category: keyWord[0].category
          }
        })
      }
    },
    transformAllCategoryData () {
      const newAry = []
      this.allData.forEach(categoryAry => {
        categoryAry.forEach(item => {
          const obj = {}
          if (item.ScenicSpotID !== undefined && item.City !== undefined) {
            obj.id = item.ScenicSpotID
            obj.titleName = item.ScenicSpotName
            this.addEnglishName(obj, item)
            obj.city = item.City
            obj.category = 'ScenicSpot'
            newAry.push(obj)
          } else if (item.RestaurantID !== undefined && item.City !== undefined) {
            obj.id = item.RestaurantID
            obj.titleName = item.RestaurantName
            this.addEnglishName(obj, item)
            obj.city = item.City
            obj.category = 'Restaurant'
            newAry.push(obj)
          } else if (item.HotelID !== undefined && item.City !== undefined) {
            obj.id = item.HotelID
            obj.titleName = item.HotelName
            this.addEnglishName(obj, item)
            obj.city = item.City
            obj.category = 'Hotel'
            newAry.push(obj)
          } else if (item.ActivityID !== undefined && item.City !== undefined) {
            obj.id = item.ActivityID
            obj.titleName = item.ActivityName
            this.addEnglishName(obj, item)
            obj.city = item.City
            obj.category = 'Activity'
            newAry.push(obj)
          }
        })
      })
      this.unifyStandardData = newAry
      console.log('unifyStandardData', this.unifyStandardData)
    },
    addEnglishName (newObj, categoryObj) {
      this.cities.forEach(city => {
        if (city.traditionalName === categoryObj.City) {
          newObj.engName = city.englishName
        }
      })
    },

    async getAllInfo () {
      try {
        await Promise.all([this.getScenicSpotInfo(), this.getRestaurantInfo(), this.getHotelInfo(), this.getActivityInfo()])
        this.transformAllCategoryData()
      } catch (err) {
        console.log(err)
      }
    },
    async getScenicSpotInfo () {
      const url = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=500&%24format=JSON'
      return this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.scenicSpotData = res.data
          const categoryData = this.scenicSpotData
          this.allData.push(categoryData)
          // console.log('allData', 'ScenicSpot', this.allData)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    async getRestaurantInfo () {
      const url = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=500&%24format=JSON'
      return this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.restaurantData = res.data
          const categoryData = this.restaurantData
          this.allData.push(categoryData)
          // console.log('allData', 'Restaurant', this.allData)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    async getHotelInfo () {
      const url = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=500&%24format=JSON'
      return this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.hotelData = res.data
          const categoryData = this.hotelData
          this.allData.push(categoryData)
          // console.log('allData', 'Hotel', this.allData)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    async getActivityInfo () {
      const url = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=500&%24format=JSON'
      return this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.activityData = res.data
          const categoryData = this.activityData
          this.allData.push(categoryData)
          // console.log('allData', 'Activity', this.allData)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    processSearchWord () {
      const word = this.search
      return this.unifyStandardData.filter(item => {
        return item.titleName.includes(word)
      })
    }
  },
  watch: {
    search () {
      if (this.search.trim() !== '') {
        this.isSearchList = true
        this.isNotConfirmSearch = false
      } else if (this.search.trim() === '') {
        this.isSearchList = false
        this.isNotConfirmSearch = true
      }
    },
    selectCity () {
      if (this.selectCity !== '' && this.search.trim() === '') {
        this.isNotConfirmSearch = false
      } else {
        this.isNotConfirmSearch = true
      }
    },
    selectCategory () {
      if (this.selectCategory !== '' && this.search.trim() === '') {
        this.isNotConfirmSearch = false
      } else {
        this.isNotConfirmSearch = true
      }
    }
  },
  mounted () {
    this.getAllInfo()
  }
}
</script>

<style lang="scss">
.home {
  background-image: url('../assets/images/bg-home.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -2;
}

.orange-circle {
  width: 800px;
  height: 800px;
  position: absolute;
  top: -15%;
  left: -30%;
  z-index: 1;
}

.custom-select {
  position: relative;
  z-index: 5;
}

.lets-go {
  width: 60vw;
  height: 35vw;
  position: absolute;
  top: 10%;
}

.rocket {
  width:60vw;
  position: absolute;
  display: block;
  top: 24%;
  left: 30%;
  &::after {
    position: absolute;
    content: '';
    background-image: url('../assets/images/cloud.png');
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
  }
}

.tw-logo {
  width: 45vw;
  height: 20vw;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
}

@media (min-width: 768px) {
  .lets-go {
    width: 30vw;
    height: 20vw;
  }
  .rocket {
    width: 40vw;
  }
  .tw-logo {
    width: 28vw;
    height: 15vw;
    top: 70%;
    left: 5%;
    transform: translateX(0);
  }
}

@media (min-width: 992px) {
  .orange-circle {
    width: 1200px;
    height: 1200px;
    left: -50%;
  }
  .lets-go {
    left: 0%;
  }
  .rocket {
    top: 25%;
    left: 9%;
  }
  .tw-logo {
    left: 0%;
  }
}

@media (min-width: 1440px) {
  .orange-circle {
    left: -20%;
  }
}

@media (min-width: 1600px) {
  .lets-go {
    left: -9%;
  }
  .rocket {
    top: 25%;
    left: 9%;
  }
  .tw-logo {
    left: -8%;
  }
}

.form-select {
  background-image: url(../assets/images/caret-down-fill.svg);
}

.search-list {
  max-height: 250px;
  overflow-y: auto;
}
</style>
