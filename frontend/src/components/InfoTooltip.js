import succes from "../images/popup_succes.svg";
import fail from "../images/popup_fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_infoTooltip  ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__container">
        <img
          className="popup__auth-img"
          src={props.isResult ? succes : fail}
          alt="изоображение о результате регистрации"
        />
        <p className="popup__auth-title">
          {props.isResult
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}{" "}
        </p>
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-button"
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
