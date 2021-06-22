import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <section className="content">
        <h2 className="auth-page__title">Вход</h2>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <input
            id="email"
            required
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Email"
          ></input>
          <input
            id="password"
            required
            name="password"
            type="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Пароль"
          ></input>
          <button className="auth-page__submit-button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
