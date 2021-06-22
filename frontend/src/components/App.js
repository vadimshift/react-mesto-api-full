import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as apiAuth from "../utils/apiAuth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  console.log(currentUser)
  useEffect(() => {
    api
      .getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = useState([]);

  const handleAddPlaceSubmit = (data) => {
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    
    //выбираем промис
    const likesPromise = isLiked
      ? api.delLikeCard(card._id)
      : api.setLikeCard(card._id);

    likesPromise
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateAvatar = (data) => {
    api
      .setNewAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .setNewProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleLogout = () => {
    onLogout();
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState({});

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isRegisterResult, setRigisterResult] = useState(true);

  const history = useHistory();

  const closeInfoTooltipPopup = () => {
    setIsInfoTooltipOpen(false);
  };

  const onRegister = (data) => {
    return apiAuth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setRigisterResult(false);
      })
      .catch((err) => console.log(err));
  };

  const onLogin = (data) => {
    return apiAuth
      .authorization(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", document.cookie);       
      })
      .catch((err) => console.log(err));
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");  
    if (!token) {
      return;
    }
    apiAuth
      .getContent(document.cookie)
      .then((data) => {
        setCurrentUser(data);
        setUserEmail(data.email);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history]);

  const onLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route path="/sign-up">
              <Register loggedIn={loggedIn} onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login loggedIn={loggedIn} onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              cards={cards}
              handleLogout={handleLogout}
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleCardDelete={handleCardDelete}
              handleCardClick={handleCardClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleCardLike={handleCardLike}
              userEmail={userEmail}
              handleAddPlaceSubmit={handleAddPlaceSubmit}
              component={Main}
            />
            <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTooltipPopup}
            isResult={isRegisterResult}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="submit-form"
            title="Вы уверены?"
            buttonTitle="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
