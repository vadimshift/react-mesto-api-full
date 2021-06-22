import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        required
        type="url"
        id="enterLinkAvatar"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__enter popup__enter_type_link-avatar"
        ref={avatarRef}
      />
      <span className="popup__error-message enterLinkAvatar-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
