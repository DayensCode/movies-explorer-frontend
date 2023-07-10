import "./Profile.css";
import { useState } from "react";

function Profile({ onLogout }) {
  const [user, setUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Данные формы отправленны");
  }
  function handleChange({ target }) {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  }
  function handleLogout() {
    onLogout();
  }
  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${user.name}!`}</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__container">
          <span className="profile__label">Имя</span>
          <input
            className="profile__input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength={2}
            maxLength={30}
            value={user.name || ""}
            onChange={handleChange}
          />
        </label>
        <div className="profile__line"/>
        <label className="profile__container">
          <span className="profile__label">E-mail</span>
          <input
            className="profile__input"
            type="email"
            name="email"
            placeholder="E-mail"
            minLength={2}
            maxLength={30}
            value={user.email || ""}
            onChange={handleChange}
          />
        </label>
      </form>
      <div className="profile__buttons">
        <button className="profile__submit" form="profile__form" type="submit">Редактировать</button>
        <button className="profile__logout" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
