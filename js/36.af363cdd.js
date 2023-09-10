"use strict";(self["webpackChunkf2e_tw_tour"]=self["webpackChunkf2e_tw_tour"]||[]).push([[36],{5691:function(t,e,a){a.r(e),a.d(e,{default:function(){return R}});var i=a(3396),s=a(7139),o=a(9242),n=a(6419),r=a(2835),l=a.p+"img/rocket.04bf5e8c.png",c=a.p+"img/font-taiwan.2ffa056a.svg",h=a(3794);const m={class:"home"},d={class:"position-relative"},u=(0,i._)("img",{src:n,class:"orange-circle",alt:"首頁橘色圓"},null,-1),g={class:"container"},y={class:"row justify-content-center custom-select"},N=(0,i._)("div",{class:"col-10 col-md-8 position-relative"},[(0,i._)("img",{src:r,class:"lets-go",alt:"let's go 文字圖片"}),(0,i._)("img",{src:l,class:"rocket",alt:"火箭"}),(0,i._)("img",{src:c,class:"tw-logo",alt:"台灣文字圖片"})],-1),p={class:"col-10 col-md-4 d-flex flex-column justify-content-center mt-auto mt-md-0 pb-8 pb-md-0 position-relative"},f=(0,i._)("h1",{class:"text-white text-center mb-6"},"訂製你的專屬旅程",-1),C=(0,i._)("option",{value:""},"選擇地點",-1),v=["value"],S=(0,i._)("option",{value:""},"類別",-1),D=["value"],w={key:0,class:"search-list bg-white list-unstyled d-flex flex-column"},k=(0,i._)("span",{class:"d-flex justify-content-center align-items-center"},[(0,i._)("img",{src:h,class:"me-3",alt:"搜尋按鈕"}),(0,i.Uk)("搜尋")],-1),_=[k],b={key:1,class:"alert alert-danger mt-3",role:"alert"},I=(0,i._)("span",{class:"fw-bold"},"地點",-1),x=(0,i._)("span",{class:"fw-bold"},"類別",-1),T=(0,i._)("span",{class:"fw-bold"},"關鍵字",-1);function H(t,e,a,n,r,l){const c=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",m,[(0,i._)("div",d,[u,(0,i._)("div",g,[(0,i._)("div",y,[N,(0,i._)("div",p,[f,(0,i.wy)((0,i._)("select",{class:"form-select rounded-pill text-center mb-4 py-2 fs-5","onUpdate:modelValue":e[0]||(e[0]=t=>r.selectCity=t)},[C,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(r.cities,(t=>((0,i.wg)(),(0,i.iD)("option",{key:t.englishName,value:t.englishName},(0,s.zw)(t.traditionalName),9,v)))),128))],512),[[o.bM,r.selectCity]]),(0,i.wy)((0,i._)("select",{class:"form-select rounded-pill text-center mb-4 py-2 fs-5","onUpdate:modelValue":e[1]||(e[1]=t=>r.selectCategory=t)},[S,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(r.categories,(t=>((0,i.wg)(),(0,i.iD)("option",{key:t.englishName,value:t.englishName},(0,s.zw)(t.traditionalName),9,D)))),128))],512),[[o.bM,r.selectCategory]]),(0,i.wy)((0,i._)("input",{type:"text",class:"form-control rounded-pill mb-4 py-2 fs-5","onUpdate:modelValue":e[2]||(e[2]=t=>r.search=t),placeholder:"以關鍵字找尋.."},null,512),[[o.nr,r.search]]),r.isSearchList?((0,i.wg)(),(0,i.iD)("ul",w,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.processSearchWord,(t=>((0,i.wg)(),(0,i.iD)("li",{key:t.id},[(0,i.Wm)(c,{class:"d-block text-decoration-none p-1",to:{path:"/tourdetail",query:{id:t.id,city:t.engName,category:t.category}}},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(t.titleName),1)])),_:2},1032,["to"])])))),128))])):(0,i.kq)("",!0),(0,i._)("button",{class:"btn btn-primary rounded-pill w-100 text-white fs-5",onClick:e[3]||(e[3]=(...t)=>l.searchTourInfo&&l.searchTourInfo(...t))},_),r.isNotConfirmSearch?((0,i.wg)(),(0,i.iD)("div",b,[(0,i.Uk)(" 請選擇"),I,(0,i.Uk)("和"),x,(0,i.Uk)("，或是以"),T,(0,i.Uk)("找尋 ")])):(0,i.kq)("",!0)])])])])])}a(7658);var A={data(){return{selectCity:"",selectCategory:"",search:"",allData:[],scenicSpotData:[],restaurantData:[],hotelData:[],activityData:[],unifyStandardData:[],isSearchList:!1,isNotConfirmSearch:!0,cities:[{traditionalName:"臺北市",englishName:"Taipei"},{traditionalName:"新北市",englishName:"NewTaipei"},{traditionalName:"桃園市",englishName:"Taoyuan"},{traditionalName:"臺中市",englishName:"Taichung"},{traditionalName:"臺南市",englishName:"Tainan"},{traditionalName:"高雄市",englishName:"Kaohsiung"},{traditionalName:"基隆市",englishName:"Keelung"},{traditionalName:"新竹市",englishName:"Hsinchu"},{traditionalName:"新竹縣",englishName:"HsinchuCounty"},{traditionalName:"苗栗縣",englishName:"MiaoliCounty"},{traditionalName:"彰化縣",englishName:"ChanghuaCounty"},{traditionalName:"南投縣",englishName:"NantouCounty"},{traditionalName:"雲林縣",englishName:"YunlinCounty"},{traditionalName:"嘉義縣",englishName:"ChiayiCounty"},{traditionalName:"嘉義市",englishName:"Chiayi"},{traditionalName:"屏東縣",englishName:"PingtungCounty"},{traditionalName:"宜蘭縣",englishName:"YilanCounty"},{traditionalName:"花蓮縣",englishName:"HualienCounty"},{traditionalName:"臺東縣",englishName:"TaitungCounty"},{traditionalName:"金門縣",englishName:"KinmenCounty"},{traditionalName:"澎湖縣",englishName:"PenghuCounty"},{traditionalName:"連江縣",englishName:"LienchiangCounty"}],categories:[{traditionalName:"觀光景點",englishName:"ScenicSpot"},{traditionalName:"道地美食",englishName:"Restaurant"},{traditionalName:"特色旅宿",englishName:"Hotel"},{traditionalName:"精彩活動",englishName:"Activity"}],token:JSON.parse(localStorage.getItem("TdxToken"))||[]}},methods:{searchTourInfo(){""!==this.selectCity&&""!==this.selectCategory&&""===this.search.trim()?this.$router.push({name:"旅遊清單頁面",query:{city:this.selectCity,category:this.selectCategory}}):""!==this.search.trim()?this.keyWordSearch():this.isNotConfirmSearch=!0},keyWordSearch(){const t=this.unifyStandardData.filter((t=>t.titleName.includes(this.search)));if(0===t.length)return null;t[0].titleName===this.search&&this.$router.push({name:"detail",query:{id:t[0].id,city:t[0].engName,category:t[0].category}})},transformAllCategoryData(){const t=[];this.allData.forEach((e=>{e.forEach((e=>{const a={};void 0!==e.ScenicSpotID&&void 0!==e.City?(a.id=e.ScenicSpotID,a.titleName=e.ScenicSpotName,this.addEnglishName(a,e),a.city=e.City,a.category="ScenicSpot",t.push(a)):void 0!==e.RestaurantID&&void 0!==e.City?(a.id=e.RestaurantID,a.titleName=e.RestaurantName,this.addEnglishName(a,e),a.city=e.City,a.category="Restaurant",t.push(a)):void 0!==e.HotelID&&void 0!==e.City?(a.id=e.HotelID,a.titleName=e.HotelName,this.addEnglishName(a,e),a.city=e.City,a.category="Hotel",t.push(a)):void 0!==e.ActivityID&&void 0!==e.City&&(a.id=e.ActivityID,a.titleName=e.ActivityName,this.addEnglishName(a,e),a.city=e.City,a.category="Activity",t.push(a))}))})),this.unifyStandardData=t},addEnglishName(t,e){this.cities.forEach((a=>{a.traditionalName===e.City&&(t.engName=a.englishName)}))},async getAllInfo(){try{await Promise.all([this.getScenicSpotInfo(),this.getRestaurantInfo(),this.getHotelInfo(),this.getActivityInfo()]),this.transformAllCategoryData()}catch(t){console.log(t)}},async getScenicSpotInfo(){const t="https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=500&%24format=JSON";return this.$http.get(t,{headers:{authorization:"Bearer "+this.token}}).then((t=>{this.scenicSpotData=t.data;const e=this.scenicSpotData;this.allData.push(e)})).catch((t=>{console.log(t.response)}))},async getRestaurantInfo(){const t="https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=500&%24format=JSON";return this.$http.get(t,{headers:{authorization:"Bearer "+this.token}}).then((t=>{this.restaurantData=t.data;const e=this.restaurantData;this.allData.push(e)})).catch((t=>{console.log(t.response)}))},async getHotelInfo(){const t="https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=500&%24format=JSON";return this.$http.get(t,{headers:{authorization:"Bearer "+this.token}}).then((t=>{this.hotelData=t.data;const e=this.hotelData;this.allData.push(e)})).catch((t=>{console.log(t.response)}))},async getActivityInfo(){const t="https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=500&%24format=JSON";return this.$http.get(t,{headers:{authorization:"Bearer "+this.token}}).then((t=>{this.activityData=t.data;const e=this.activityData;this.allData.push(e)})).catch((t=>{console.log(t.response)}))}},computed:{processSearchWord(){const t=this.search;return this.unifyStandardData.filter((e=>e.titleName.includes(t)))}},watch:{search(){""!==this.search.trim()?(this.isSearchList=!0,this.isNotConfirmSearch=!1):""===this.search.trim()&&(this.isSearchList=!1,this.isNotConfirmSearch=!0)},selectCity(){""!==this.selectCity&&""===this.search.trim()?this.isNotConfirmSearch=!1:this.isNotConfirmSearch=!0},selectCategory(){""!==this.selectCategory&&""===this.search.trim()?this.isNotConfirmSearch=!1:this.isNotConfirmSearch=!0}},mounted(){this.getAllInfo()}},U=a(89);const E=(0,U.Z)(A,[["render",H]]);var R=E},6419:function(t,e,a){t.exports=a.p+"img/ellipse.fe8e85b2.svg"},2835:function(t,e,a){t.exports=a.p+"img/logo.559c354c.svg"},3794:function(t,e,a){t.exports=a.p+"img/search.2274fa5d.svg"}}]);
//# sourceMappingURL=36.af363cdd.js.map