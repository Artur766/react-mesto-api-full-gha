import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      disabledButton={true}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="confirmation"
      buttonName="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={true}
    />
  )
}

export default ConfirmationPopup;