class Api {
  constructor(data){
    this._baseUrl = data.baseUrl;
  }

  _responseHandler(res) {return res.ok ? res.json() : Promise.reject()}

  _request(postUrl, options) {
    return fetch(`${this._baseUrl}${postUrl}`, options).then(this._responseHandler)
  }

  getInfo(token) {
    return(
      this._request('/users/me', {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }) 
    )
  }

  getInitialCards(token) {
    return(
      this._request('/cards', {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    )
  }

  setUserData(data, token) {
    return(
      this._request('/users/me', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.editName,
          about: data.editJob
        })
      })
    )
  }

  setAvatar(data, token) {
    return(
      this._request('/users/me/avatar', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
    )
  }

  postCard(data, token) {
    return(
      this._request('/cards', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
    )
  }

  setLike(cardId, token) {
    return(
      this._request(`/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    )
  }

  removeLike(cardId, token) {
    return(
      this._request(`/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    )
  }

  removeCard(cardId, token) {
    return(
      this._request(`/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    )
  }
}

const api = new Api({
  baseUrl: 'https://api.qr1xmesto.students.nomoredomainsicu.ru',
});

export default api