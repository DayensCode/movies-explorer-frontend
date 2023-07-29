import "./InfoTooltip.css";
import resolve from "../../images/info-resolve.svg";
import reject from "../../images/info-reject.svg";

function InfoTooltip({ statusOk, text, isOpen, onClose }) {
  function handleOverlayClick(onClose) {
    onClose();
  }

  return (
    <div
      className={isOpen ? "info_opened" : "info"}
      onClick={handleOverlayClick}
    >
      <div className="info__container">
        <img
          className="info__icon"
          alt="Иконка"
          src={statusOk ? resolve : reject}
        ></img>
        <span className="info__text">{text}</span>
      </div>
    </div>
  );
}

export default InfoTooltip;
