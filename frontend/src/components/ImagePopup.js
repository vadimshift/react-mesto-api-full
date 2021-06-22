function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image-xl ${props.card.link ? 'popup_active' : ''}`}>
      <div className="popup__container popup__container_type_image-xl">
        <img className="popup__image-xl" src={props.card.link} alt={props.card.name}/>
        <p className="popup__title popup__title_type_image-xl">{props.card.name}</p>
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-button popup__close-button_type_image-xl"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
