const baseUrl = 'https://api.qr1xmesto.students.nomoredomainsicu.ru'

function getData(res) {
  return res.ok ? res.json() : Promise.reject(`#{res.status} ${res.statusText}`)
}

export function registration(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getData(res))
}

export function authorization(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getData(res))
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(res => getData(res))
}