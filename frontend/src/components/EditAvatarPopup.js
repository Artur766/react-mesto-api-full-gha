import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation"

function EditAvatarPopup(props) {

  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  React.useEffect(() => {
    reset();
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values["link"],
    });
  }

  function getErrorClassName(name) {
    return `popup__input ${errors[name] && "popup__input_type_error"}`
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={isValid}
    >
      <input
        value={values["link"] || ''}
        onChange={handleChange}
        className={getErrorClassName("link")}
        id="link-avatar"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_visable link-avatar-error " >{errors["link"]}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;