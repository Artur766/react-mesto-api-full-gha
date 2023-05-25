import React from "react";

function InfoTooltip(props) {

  const { isOpen, onClose } = props;

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      //удаляем открытый попап
      onClose();
    }
  }

  React.useEffect(() => {
    //закрытие на esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        //удаляем открытый попап
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_type_${props.name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose} >
      <div className="popup__container">
        <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
        <img className="popup__union" src={props.image} alt="иконка подтверждения" />
        <h3 className="popup__text">{props.title}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;