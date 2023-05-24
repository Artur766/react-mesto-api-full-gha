import React from "react";

function ImagePopup(props) {

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

    if (props.card.link) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [props.card.link, props.onClose]);

  return (
    <div onMouseDown={handleOverlayClose} className={`popup popup_type_increase ${props.card.link ? 'popup_opened' : ''}`} >
      <div className="popup__wrapper">
        <button className="popup__close-btn" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div >
  )
}

export default ImagePopup;