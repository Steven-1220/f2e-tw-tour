import axios from 'axios'

const GetToken = function () {
  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.VUE_APP_ID,
    client_secret: process.env.VUE_APP_KEY
  }

  axios
    .post(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then(function (response) {
      const token = response.access_token
      console.log(token)
      localStorage.setItem('TdxToken', JSON.stringify(token))
    })
    .catch(function (error) {
      console.log(error.response)
    })
}

export default GetToken
