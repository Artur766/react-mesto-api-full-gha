import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import { useFormValidation } from "../utils/useFormValidation";


function Register(props) {

  const { values, errors, isValid, handleChange } = useFormValidation();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(values["email"], values["password"])
      .then((res) => {
        if (res.data) {
          props.handleInfoTooltipOpen(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch(() => props.handleInfoTooltipOpen(false))
  }

  function getErrorClassName(name) {
    return `login__input ${errors[name] && "login__input_type_error"}`
  }

  return (
    <section className="login">
      <h3 className="login__title">Регистрация</h3>
      <form className="login__form" onSubmit={handleSubmit} action="#" noValidate>
        <input
          onChange={handleChange}
          value={values["email"] || ''}
          className={getErrorClassName("email")}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <span className="login__error login__error_visable" >{errors["email"]}</span>
        <input
          onChange={handleChange}
          value={values["password"] || ''}
          className={getErrorClassName("password")}
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="6"
          maxLength="20"
        />
        <span className="login__error login__error_visable">{errors["password"]}</span>
        <button className={`login__submit-btn ${isValid ? "" : "login__submit-btn_disablded"}`} type="submit" >Зарегистрироваться</button>
        <p className="login__text">Уже зарегистрированы?<Link to="/sign-in" className="login__link">Войти</Link></p>
      </form>
    </section>
  )
}

export default Register;