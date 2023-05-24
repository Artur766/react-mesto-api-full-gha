import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import unionСross from "../images/unionСross.svg"
import unionСheckmark from "../images/unionСheckmark.svg"
import ProtectedRoute from "./ProtectedRoute ";
import * as auth from "../utils/auth"

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoadingEditPopup, setIsLoadingEditPopup] = React.useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = React.useState(false);
  const [isLoadingAddPopup, setIsLoadingAddPopup] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getInitialCards(), api.getUserInformation()];

      Promise.all(promises)
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((dataUser) => {
          if (dataUser) {
            setLoggedIn(true);
            setUserEmail(dataUser.data.email);
            navigate("/", { replace: true });
          }
        }).catch(err => console.log(err))
    }
  }, [navigate])

  function handleAddPlaceSubmit(card) {

    setIsLoadingAddPopup(true);

    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAddPopup(false);
      })
  }

  //постановка и снятие лайка 
  function handleCardLike(card) {
    // проверяем есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(currentUser) {

    setIsLoadingEditPopup(true)

    api.setUserInfo(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingEditPopup(false);
      });
  }

  function handleUpdateAvatar(currentUser) {

    setIsLoadingAvatarPopup(true);

    api.setUserAvatar(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAvatarPopup(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(true);
    setCard(card);
  }

  //удаление карточки
  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleInfoTooltipOpen(boolean) {
    setIsInfoTooltipOpen(true);
    setIsSuccessTooltipStatus(boolean);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header userEmail={userEmail} />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              cards={cards}
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleEditAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleConfirmationClick}
              onCardLike={handleCardLike}
            />
          } />
          <Route path="/sign-up" element={
            <Register handleInfoTooltipOpen={handleInfoTooltipOpen} />
          } />
          <Route path="/sign-in" element={
            <Login handleLogin={handleLogin} handleInfoTooltipOpen={handleInfoTooltipOpen} />
          } />
        </Routes>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonName={isLoadingEditPopup ? "Сохранение..." : "Сохранить"}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonName={isLoadingAvatarPopup ? "Сохранение..." : "Сохранить"}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        buttonName={isLoadingAddPopup ? "Создание..." : "Созать"}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        card={card}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        image={isSuccessTooltipStatus ? unionСheckmark : unionСross}
        title={isSuccessTooltipStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;