import React from "react";
import * as auth from "../utils/auth"
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../utils/useFormValidation"

function Login(props) {

  const { values, errors, isValid, handleChange } = useFormValidation();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    auth.authorize(values["email"], values["password"])
      .then((data) => {
        if (data.token) {
          props.handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(() => props.handleInfoTooltipOpen(false))
  }

  function getErrorClassName(name) {
    return `login__input ${errors[name] && "login__input_type_error"}`
  }

  return (
    <section className="login">
      <h3 className="login__title">Вход</h3>
      <form className="login__form" onSubmit={handleSubmit} action="#" noValidate>
        <input
          onChange={handleChange}
          value={values["email"] || ''}
          name="email"
          className={getErrorClassName("email")}
          type="email"
          placeholder="Email"
          required
        />
        <span className="login__error login__error_visable">{errors["email"]}</span>
        <input
          onChange={handleChange}
          value={values["password"] || ''}
          className={getErrorClassName("password")}
          name="password"
          type="password"
          placeholder="Пароль"
          required
          minLength="6"
          maxLength="20"
        />
        <span className="login__error login__error_visable" >{errors["password"]}</span>
        <button className={`login__submit-btn ${isValid ? "" : "login__submit-btn_disablded"}`} type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;