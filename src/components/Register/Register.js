import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register({ onRegister }) {
  function handleSubmit(e) {
    e.preventDefault();
    onRegister();
  }
  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" autoComplete="off" action="" name="register" onSubmit={handleSubmit}>
        <label className="register__label">
          Имя
          <input className="register__input" type="text" name="name" required placeholder="Имя" minLength="2" maxLength="40"></input>
        </label>
        <label className="register__label">
          E-mail
          <input className="register__input" type="email" name="email" required placeholder="E-mail" minLength="2" maxLength="40"></input>
        </label>
        <label className="register__label">
          Пароль
          <input className="register__input" type="password" name="password" required placeholder="Пароль" minLength="2" maxLength="40"></input>
        </label>
        <button className="register__submit" type="submit">Зарегистрироваться</button>
        <p className="register__login-text">
          Уже зарегистрированы?
          <Link className="register__login-link" to="/signin">Войти</Link>
        </p>
      </form>
    </section>
  )
};

export default Register;
