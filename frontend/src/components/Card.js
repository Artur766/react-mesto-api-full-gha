import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="element" >
      <img className="element__photo" src={props.card.link} onClick={handleClick} alt={props.card.name} />
      {isOwn && <button className="element__basket" onClick={handleDeleteClick} />}
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="element__number-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;