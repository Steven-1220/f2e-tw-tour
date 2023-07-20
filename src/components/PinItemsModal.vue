<template>
  <div class="modal fade" id="exampleModal" ref="pinItemsRef" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">我的釘選內容</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table align-middle table-hover">
              <thead>
                <tr>
                  <th>旅遊圖片</th>
                  <th class="w-25">名稱</th>
                  <th>類別</th>
                  <th>地點</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <!-- 景點 -->
                <template v-if="renderPinScenicSpotData.length !== 0">
                  <tr v-for="(item, index) in renderPinScenicSpotData" :key="item.ScenicSpotID">
                    <td style="max-width: 180px; height: 120px;" class="position-relative">
                      <router-link to="/tourdetail" class="stretched-link"
                        @click="enterPinItemDetail(item.ScenicSpotID, item.City, 'ScenicSpot')">
                        <img :src="item.Picture.PictureUrl1 || require('@/assets/images/banner-city.jpg')"
                          class="img-pin" :alt="item.Picture?.PictureDescription1">
                      </router-link>
                    </td>
                    <td>{{ item.ScenicSpotName }}</td>
                    <td >景點</td>
                    <td>{{ item.City }}</td>
                    <td>
                      <button class="btn btn-warning" @click="deletePinItem(item.ScenicSpotID, 'ScenicSpot',index)">取消釘選</button>
                    </td>
                  </tr>
                </template>
                <!-- 餐廳 -->
                <template v-if="renderPinRestaurantData.length !== 0">
                  <tr v-for="(item, index) in renderPinRestaurantData" :key="item.RestaurantID">
                    <td style="max-width: 180px;  height: 120px" class="position-relative">
                      <router-link to="/tourdetail" class="stretched-link"
                        @click="enterPinItemDetail(item.RestaurantID, item.City, 'Restaurant')">
                        <img :src="item.Picture.PictureUrl1 || require('@/assets/images/banner-city.jpg')"
                          class="img-pin" :alt="item.Picture?.PictureDescription1">
                      </router-link>
                    </td>
                    <td>{{ item.RestaurantName }}</td>
                    <td >美食</td>
                    <td>{{ item.City }}</td>
                    <td>
                      <button class="btn btn-warning" @click="deletePinItem(item.RestaurantID, 'Restaurant', index)">取消釘選</button>
                    </td>
                  </tr>
                </template>
                <!-- 旅宿 -->
                <template v-if="renderPinHotelData.length !== 0">
                  <tr v-for="(item, index) in renderPinHotelData" :key="item.HotelID">
                    <td style="max-width: 180px;  height: 120px" class="position-relative">
                      <router-link to="/tourdetail" class="stretched-link"
                        @click="enterPinItemDetail(item.HotelID, item.City, 'Hotel')">
                        <img :src="item.Picture.PictureUrl1 || require('@/assets/images/banner-city.jpg')"
                          class="img-pin" :alt="item.Picture?.PictureDescription1">
                      </router-link>
                    </td>
                    <td>{{ item.HotelName }}</td>
                    <td >旅宿</td>
                    <td>{{ item.City }}</td>
                    <td>
                      <button class="btn btn-warning" @click="deletePinItem(item.HotelID, 'Hotel', index)">取消釘選</button>
                    </td>
                  </tr>
                </template>
                <!-- 活動 -->
                <template v-if="renderPinActivityData.length !== 0">
                  <tr v-for="(item, index) in renderPinActivityData" :key="item.ActivityID">
                    <td style="max-width: 180px;  height: 120px" class="position-relative">
                      <router-link to="/tourdetail" class="stretched-link"
                        @click="enterPinItemDetail(item.ActivityID, item.City, 'Activity')">
                        <img :src="item.Picture.PictureUrl1 || require('@/assets/images/banner-city.jpg')"
                          class="img-pin" :alt="item.Picture?.PictureDescription1">
                      </router-link>
                    </td>
                    <td>{{ item.ActivityName }}</td>
                    <td >活動</td>
                    <td>{{ item.City }}</td>
                    <td>
                      <button class="btn btn-warning" @click="deletePinItem(item.ActivityID, 'Activity', index)">取消釘選</button>
                    </td>
                  </tr>
                </template>
                <template v-if="pin.length === 0">
                  <tr>
                    <td>目前沒有釘選的內容</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteAllPinItems">全部取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      pinModal: {},
      pinItemsContent: [],
      renderPinScenicSpotData: [],
      renderPinRestaurantData: [],
      renderPinHotelData: [],
      renderPinActivityData: [],
      token: JSON.parse(localStorage.getItem('TdxToken')) || [],
      pin: JSON.parse(localStorage.getItem('pin-items')) || [],
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
      ]
    }
  },
  methods: {
    transformPinItems () {
      this.renderPinScenicSpotData = []
      this.renderPinRestaurantData = []
      this.renderPinHotelData = []
      this.renderPinActivityData = []
      this.pin.forEach(item => {
        this.showPinItems(item.id, item.category)
      })
    },
    showPinItems (id, category) {
      const url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${category}?%24filter=contains%28${category}ID%2C%27${id}%27%29&%24format=JSON`
      this.$http.get(url, {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
        .then(res => {
          if (category === 'ScenicSpot' && res.data.length !== 0) {
            this.renderPinScenicSpotData.push(res.data[0])
          } else if (category === 'Restaurant' && res.data.length !== 0) {
            this.renderPinRestaurantData.push(res.data[0])
          } else if (category === 'Hotel' && res.data.length !== 0) {
            this.renderPinHotelData.push(res.data[0])
          } else if (category === 'Activity' && res.data.length !== 0) {
            this.renderPinActivityData.push(res.data[0])
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    enterPinItemDetail (id, chineseCity, category) {
      const englishCity = this.cities.find(city => {
        return city.traditionalName === chineseCity
      })
      console.log(englishCity)
      this.$router.push({
        name: 'detail',
        query: {
          id: id,
          city: englishCity.englishName,
          category: category
        }
      })
      this.closeModal()
    },
    deletePinItem (id, category, index) {
      const deleteIndex = this.pin.findIndex(item => item.id === id)
      this[`renderPin${category}Data`].splice(index, 1)
      this.pin.splice(deleteIndex, 1)
      emitter.emit('delete-pin-items', this.pin)
    },
    deleteAllPinItems () {
      if (this.pin.length === 0) return
      this.pin.splice(0, this.pin.length)
      this.transformPinItems()
      emitter.emit('delete-pin-items', this.pin)
    },
    openModal () {
      this.pinModal.show()
    },
    closeModal () {
      this.pinModal.hide()
    }
  },
  watch: {
    pin: {
      handler () {
        localStorage.setItem('pin-items', JSON.stringify(this.pin))
      },
      deep: true
    }
  },
  mounted () {
    this.pinModal = new Modal(this.$refs.pinItemsRef, {
      keyboard: false
    })
    this.transformPinItems()
    emitter.on('get-pin-items', (pin) => {
      this.pin = pin
      setTimeout(() => {
        this.transformPinItems()
      })
    })
    // this.$nextTick(() => {
    //   this.transformPinItems()
    // })
  }
}
</script>

<style lang="scss">
.img-pin {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
