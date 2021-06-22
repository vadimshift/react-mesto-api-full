import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({
  cards,
  userEmail,
  handleLogout,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleCardDelete,
  handleCardClick,
  handleAddPlaceClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <span>{userEmail}</span>
        <button onClick={handleLogout} className="header__logout-button">
          Выйти
        </button>
      </Header>
      <main className="content">
        <section className="profile">
          <button
            type="button"
            onClick={handleEditAvatarClick}
            className="profile__avatar-edit-button"
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="фотография профиля"
            />
          </button>
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                onClick={handleEditProfileClick}
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            onClick={handleAddPlaceClick}
            className="profile__add-button"
          ></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
