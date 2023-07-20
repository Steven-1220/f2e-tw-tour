<template>
    <header class="tourlist-banner">
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="col d-flex justify-content-center align-items-center">
            <GoHomeCircle></GoHomeCircle>
            <div class="main-title d-flex justify-content-center align-items-center mt-8 mt-md-0">
              <h1 class="display-2 fw-bold text-white d-flex align-items-center">{{ selectCityChinese.slice(0,1) }}
                <span class="h3 px-6">{{selectCity}}</span>{{ selectCityChinese.slice(1,2) }}
              </h1>
            </div>
            <FixPinButton></FixPinButton>
          </div>
        </div>
      </div>

      <div class="container select">
        <div class="row">
          <div class="col d-flex justify-content-center align-items-center">
            <select class="form-select rounded-pill text-center select-location shadow mb-0 me-3" v-model="selectCity">
              <option value="">選擇地點</option>
              <template v-for="item in cities" :key="item.englishName">
                <option :value="item.englishName">{{ item.traditionalName }}</option>
              </template>
            </select>
            <select class="form-select rounded-pill text-center select-category shadow mb-0 me-3" v-model="selectCategory">
              <option value="">類別</option>
              <template v-for="item in categories" :key="item.englishName">
                <option :value="item.englishName">{{ item.traditionalName }}</option>
              </template>
            </select>
            <button class="btn btn-primary rounded-pill text-white search-btn shadow" @click="getCustomTourismInfo">
              <img src="../assets/images/search.svg" alt="搜尋按鈕">
            </button>
          </div>
          <button class="btn rounded-pill  map-btn d-inline-block shadow bg-white"
            data-bs-toggle="tooltip" data-bs-placement="right" title="查看地圖"
            @click="lookMap">
            <img src="../assets/images/map.svg" class="img-fluid" alt="地圖按鈕">
          </button>
        </div>
      </div>
    </header>

    <div class="main">
      <LoadingView></LoadingView>
      <div class="container py-10">
        <CardView :card-data="tourData"></CardView>
      </div>
    </div>

    <FooterView></FooterView>
</template>

<script>

import FooterView from '@/components/FooterView.vue'
import CardView from '@/components/CardView.vue'
import FixPinButton from '@/components/FixPinButton.vue'
import GoHomeCircle from '@/components/GoHomeCircle.vue'
import LoadingView from '@/components/LoadingView.vue'
import emitter from '@/libs/emitter'

export default {
  components: {
    FooterView,
    CardView,
    FixPinButton,
    GoHomeCircle,
    LoadingView
  },
  data () {
    return {
      selectCity: '',
      selectCategory: '',
      selectCityChinese: '台灣',
      isLoading: false,
      tourData: [],
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
      token: JSON.parse(localStorage.getItem('TdxToken')) || [],
      pin: JSON.parse(localStorage.getItem('pin-items')) || []
    }
  },
  methods: {
    getCustomTourismInfo () {
      if (this.selectCity === '' || this.selectCategory === '') return
      emitter.emit('start-loading')
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${this.selectCategory}/${this.selectCity}?%24top=50&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.tourData = res.data
          this.$router.replace({
            name: '旅遊清單頁面',
            query: {
              city: this.selectCity,
              category: this.selectCategory
            }
          })
          emitter.emit('stop-loading')
          emitter.emit('first-page')
        })
        .catch(err => {
          console.log(err)
        })
    },
    firstEnterTourList () {
      const { city, category } = this.$route.query
      this.selectCity = city
      this.selectCategory = category
      emitter.emit('start-loading')
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}/${city}?%24top=50&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          this.tourData = res.data
          emitter.emit('stop-loading')
        })
        .catch(err => {
          console.log(err)
        })
    },
    openPinItems () {
      this.$refs.pinItemsModalRef.openModal()
    },
    lookMap () {
      this.$router.push({
        name: 'map',
        query: {
          city: this.selectCity,
          category: this.selectCategory
        }
      })
    }
  },
  watch: {
    selectCity () {
      this.cities.forEach(item => {
        if (item.englishName === this.selectCity) {
          this.selectCityChinese = item.traditionalName
        }
      })
    },
    pin: {
      handler () {
        localStorage.setItem('pin-items', JSON.stringify(this.pin))
      },
      deep: true
    }
  },
  mounted () {
    this.firstEnterTourList()
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

.tourlist-banner {
  background-image: url('../assets/images/banner.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: -1;
  height: 32vh;
}

.select {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
}

.select-location,.select-category {
  max-width: 140px;
}

.search-btn {
  max-width: 70px;
}

.map-btn {
  width: 50px;
}
</style>
