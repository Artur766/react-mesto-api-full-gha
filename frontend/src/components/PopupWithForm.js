import React from "react";

function PopupWithForm(props) {

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      //удаляем открытый попап
      props.onClose();
    }
  }

  React.useEffect(() => {
    //закрытие на esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        //удаляем открытый попап
        props.onClose();
      }
    }

    if (props.isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [props.isOpen, props.onClose]);

  return (
    <div onMouseDown={handleOverlayClose} className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`form-${props.name}`} action="#" onSubmit={props.onSubmit}  >
          {props.children}
          <button className={`popup__button popup__save-btn ${props.isValid ? "" : "popup__button_disabled"}`} type="submit" >{props.buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;