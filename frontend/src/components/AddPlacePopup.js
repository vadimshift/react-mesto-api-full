import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      placeName,
      placeLink,
    });
  }

  const hendleChangePlaceName = (e) => {
    setPlaceName(e.target.value);
  };

  const hendleChangePlaceLink = (e) => {
    setPlaceLink(e.target.value);
  };

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonTitle="Создать"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        id="enterNamePlace"
        name="name"
        type="text"
        placeholder="Название"
        className="popup__enter popup__enter_type_name-place"
        value={placeName || ""}
        onChange={hendleChangePlaceName}
      />
      <span className="popup__error-message enterNamePlace-error"></span>
      <input
        required
        type="url"
        id="enterLinkPlace"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__enter popup__enter_type_link-image"
        value={placeLink || ""}
        onChange={hendleChangePlaceLink}
      />
      <span className="popup__error-message enterLinkPlace-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
