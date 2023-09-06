import Popup from "./Popup"

export default function InfoToolTip({name, isSuccess, isOpen, onClose}) {
  return (
    <Popup 
    name={name}
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className={`popup__icon ${isSuccess ? "" : "popup__icon_fail"}`} />
      <h2 className="popup__login-message">{isSuccess ? `Вы успешно зарегистрировались!` : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </Popup>
  )
}