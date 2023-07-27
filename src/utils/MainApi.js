const mainApiOptions = {
  baseUrl: "https://api.mymovies.nomoreparties.sbs",
};

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponseStatus(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка в ${method}: ${response.status}`);
  }

  signup(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponseStatus(res, "signup");
    });
  }

  signin(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponseStatus(res, "signin");
    });
  }

  jwtCheck(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponseStatus(res, "jwtCheck");
    });
  }

  edit(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
      })
    }).then((res) => {
      return this._checkResponseStatus(res, "edit");
    });
  }
}

export const mainApi = new MainApi(mainApiOptions);
