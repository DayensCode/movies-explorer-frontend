import "./Login.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { regexEmail } from "../../config/config";

function Login({ onLogin }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [values, setValues] = useState({
    email: "erer@wewe.ru",
    password: "",
    emailError: false,
    passwordError: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });

  const handleChange = ({ target }) => {
    const { name, value, validationMessage, validity } = target;
    setValues({
      ...values,
      [name]: value,
      [`${name}Error`]: validity.valid,
      [`${name}ErrorMessage`]: validationMessage,
    });
  };

  const isValid = regexEmail.test(values.email);

  useEffect(() => {
    const disabled = !values.emailError || !values.passwordError || !isValid;
    setIsButtonDisabled(disabled);
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values
    onLogin({ email, password })
      .catch((err) => console.log(err));
  }

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form
        className="login__form"
        autoComplete="off"
        action=""
        name="login"
        onSubmit={handleSubmit}
      >
        <label className="login__label">
          E-mail
          <input
            className="login__input"
            type="email"
            name="email"
            required
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
//          value={values.email || ""}
          ></input>
          <span className="login__error">
            {values.emailErrorMessage.length > 0
              ? values.emailErrorMessage
              : !isValid
                ? "Некорректный формат email"
                : ""}
          </span>
        </label>
        <label className="login__label">
          Пароль
          <input
            className="login__input"
            type="password"
            name="password"
            required
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.password || ""}
          ></input>
          <span className="login__error">
            {values.passwordErrorMessage.length > 0
              ? values.passwordErrorMessage
              : ""}
          </span>
        </label>
        <button
          className="login__submit"
          disabled={isButtonDisabled}
          type="submit"
        >
          Войти
        </button>
        <p className="login__register-text">
          Ещё не зарегистрированы?
          <Link className="login__register-link" to="/signup">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
