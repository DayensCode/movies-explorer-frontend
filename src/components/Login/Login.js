import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login({ onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }
  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" autoComplete="off" action="" name="login" onSubmit={handleSubmit}>
        <label className="login__label">
          E-mail
          <input className="login__input" type="email" name="email" required placeholder="E-mail" minLength="2" maxLength="40"></input>
        </label>
        <label className="login__label">
          Пароль
          <input className="login__input" type="password" name="password" required placeholder="Пароль" minLength="2" maxLength="40"></input>
        </label>
        <button className="login__submit" type="submit">Войти</button>
        <p className="login__register-text">
          Ещё не зарегистрированы?
          <Link className="login__register-link" to="/signup">Регистрация</Link>
        </p>
      </form>
    </section>
  )
};

export default Login;
