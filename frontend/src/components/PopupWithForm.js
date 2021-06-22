function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__container">
        <form
          onSubmit={props.onSubmit}
          noValidate
          name="profile"
          className={`popup__form popup__form_type_${props.name}`}
        >
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_type_${props.name}`}
          >
            {props.buttonTitle}
          </button>
        </form>
        <button
          type="button"
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_type_${props.name}`}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
