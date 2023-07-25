import "./Profile.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ isLogged, setLoginStatus }) {
  const navigate = useNavigate();
  const profileContext = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: profileContext.name || "", email: profileContext.email || "" });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  function handleLogout() {
    localStorage.clear();
    setLoginStatus(false);
    navigate("/", { replace: true });
  }

  return (
    <>
      <Header isLogged={isLogged} />
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${profileContext.name}!`}</h2>
        <form className="profile__form">
          <label className="profile__container">
            <span className="profile__label">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              placeholder="Укажите имя"
              minLength={2}
              maxLength={30}
              value={profileContext.name || ""}
              onChange={handleChange}
            />
          </label>
          <div className="profile__line" />
          <label className="profile__container">
            <span className="profile__label">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              placeholder="Укажите email"
              minLength={2}
              maxLength={30}
              value={profileContext.email || ""}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="profile__buttons">
          <button
            className="profile__submit"
            form="profile__form"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__logout"
            type="button"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
