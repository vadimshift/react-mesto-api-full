import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <section className="content">
        <h2 className="auth-page__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth-page__form">
          <input
            id="email"
            name="email"
            type="email"
            value={registerData.email}
            required
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Email"
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={registerData.password}
            required
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Пароль"
          ></input>
          <button className="auth-page__submit-button" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth-page__subtitle_type_register">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="auth-page__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
      {/* <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltipPopup} /> */}
    </>
  );
}

export default Register;
