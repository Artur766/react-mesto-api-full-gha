import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormValidation } from "../utils/useFormValidation"

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValue, reset } = useFormValidation();


  React.useEffect(() => {
    reset({ "userName": currentUser.name, "about": currentUser.about });
  }, [currentUser, props.isOpen])


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values["userName"],
      about: values["about"],
    });
  }

  function getErrorClassName(name) {
    return `popup__input ${errors[name] && "popup__input_type_error"}`
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={isValid}
    >
      <input
        onChange={handleChange}
        className={getErrorClassName("userName")}
        id="user-name"
        name="userName"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values["userName"] || ''}
      />
      <span className="popup__error popup__error_visable">{errors["userName"]}</span>
      <input
        onChange={handleChange}
        className={getErrorClassName("about")}
        id="job"
        name="about"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="20"
        value={values["about"] || ''}
      />
      <span className="popup__error popup__error_visable" >{errors["about"]}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;