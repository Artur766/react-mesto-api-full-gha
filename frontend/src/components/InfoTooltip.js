import React from "react";

function InfoTooltip(props) {

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
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose} >
      <div className="popup__container">
        <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
        <img className="popup__union" src={props.image} alt="иконка подтверждения" />
        <h3 className="popup__text">{props.title}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;