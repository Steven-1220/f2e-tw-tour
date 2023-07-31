const getToken = function () {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')
  urlencoded.append('client_id', process.env.VUE_APP_ID)
  urlencoded.append(
    'client_secret',
    process.env.VUE_APP_KEY
  )
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  fetch(
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      const token = response.access_token
      localStorage.setItem('TdxToken', JSON.stringify(token))
    })
    .catch((error) => console.log('error', error))
}

export default getToken
