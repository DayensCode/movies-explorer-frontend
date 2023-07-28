import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ isLogged, setLoginStatus, onEdit }) {
  const navigate = useNavigate();
  const  {currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let profileContext = currentUser;
  const [values, setValues] = useState({ name: profileContext.name || "", email: profileContext.email || "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    setNameError(target.validationMessage);
    setNameValidation(target.validity.valid);
    setEmailError(target.validationMessage);
    setEmailValidation(target.validity.valid);
  };

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disabledInput, setDisabledInput] = useState(true);
  const [nameValidation, setNameValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);

  const [editButton, setEditButton] = useState(false);

  const disabledButton = nameValidation && emailValidation;
  useEffect(() => {
    if (profileContext.name === values.name && profileContext.email === values.email) {
      setNameValidation(false);
    } else setNameValidation(true)
  }, [values.name, values.email])

  function handleAvailableButton() {
    setDisabledInput(false);
    setEditButton(true);
  }

  function handleLogout() {
    localStorage.clear();
    setLoginStatus(false);
    navigate("/", { replace: true });
    setCurrentUser({});
  }

  function handleEditProfile() {
    return onEdit(values.name, values.email);
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
              placeholder="Введите имя"
              minLength={2}
              maxLength={30}
              value={values.name || ""}
              onChange={handleChange}
              disabled={disabledInput}
            />
          </label>
          <span className={nameError === "undefined" ? "profile__error-hidden" : "profile__error"}>{nameError || ""}</span>
          <div className="profile__line" />
          <label className="profile__container">
            <span className="profile__label">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              placeholder="Введите email"
              minLength={2}
              maxLength={30}
              value={values.email || ""}
              onChange={handleChange}
              disabled={disabledInput}
            />
          </label>
          <span className={emailError === "undefined" ? "profile__error-hidden" : "profile__error"}>{emailError || ""}</span>
        </form>
        <div className="profile__buttons">
          {editButton
            ?
            <>
            <span className='profile__submit-error profile__submit-error_hidden'>При обновлении профиля произошла ошибка</span>
            <button disabled={!disabledButton} className="profile__save" type="button" onClick={handleEditProfile}>Сохранить</button>
            </>
            :
            <button className="profile__submit" form="profile__form" type="submit" onClick={handleAvailableButton}>Редактировать</button>
          }
          <button
            className={editButton ? "profile__logout profile__logout_hidden": "profile__logout"}
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
