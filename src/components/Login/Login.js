import "./Login.css";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { mainApi } from "../../utils/MainApi";

function Login({ setLoginStatus }) {
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
    console.log("Значения всех инпутов формы логина: ", values);
    mainApi
      .signin(values)
      .then((userData) => {
        console.log("Пользовательские данные при логине: ", userData);
        localStorage.setItem("jwt", userData.token);
        setLoginStatus(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => console.log(err));
    resetForm();
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
            value={values.email || ""}
          ></input>
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
        </label>
        <button className="login__submit" type="submit">
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
