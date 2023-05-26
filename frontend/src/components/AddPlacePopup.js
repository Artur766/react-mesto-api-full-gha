import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation"

function AddPlacePopup(props) {

  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  React.useEffect(() => {
    reset();
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: values["name"],
      link: values["link"]
    });
  }

  function getErrorClassName(name) {
    return `popup__input ${errors[name] && "popup__input_type_error"}`
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Новое место"
      name="add"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={isValid}
    >
      <input
        value={values["name"] || ''}
        onChange={handleChange}
        className={getErrorClassName("name")}
        id="title-picture"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error popup__error_visable title-picture-error">{errors["name"]}</span>
      <input
        value={values["link"] || ''}
        onChange={handleChange}
        className={getErrorClassName("link")}
        id="link-picture"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_visable link-picture-error ">{errors["link"]}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;

