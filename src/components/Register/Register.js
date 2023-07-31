import "./Register.css";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { mainApi } from "../../utils/MainApi";


function Register({ onLogin }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Значения всех инпутов формы регистрации: ", values);
    mainApi
      .signup(values)
      .then((userData) => {
        console.log("Пользовательские данные при регистрации: ", userData);
        const { email, password } = values
        onLogin({ email, password })
      })
      .catch((err) => console.log(err));
    resetForm();
  }

  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form
        className="register__form"
        autoComplete="off"
        action=""
        name="register"
        onSubmit={handleSubmit}
      >
        <label className="register__label">
          Имя
          <input
            className="register__input"
            type="text"
            name="name"
            required
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ""}
          ></input>
        </label>
        <label className="register__label">
          E-mail
          <input
            className="register__input"
            type="email"
            name="email"
            required
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
          ></input>
        </label>
        <label className="register__label">
          Пароль
          <input
            className="register__input"
            type="password"
            name="password"
            required
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.password || ""}
          ></input>
        </label>
        <button className="register__submit" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__login-text">
          Уже зарегистрированы?
          <Link className="register__login-link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
