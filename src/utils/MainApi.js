const mainApiOptions = {
  baseUrl: "https://api.mymovies.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
};

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка в ${method}: ${response.status}`);
  }

  signup(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponseStatus(res, "signup");
    });
  }

  signin(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponseStatus(res, "signin");
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
