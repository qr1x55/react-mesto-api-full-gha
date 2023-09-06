import { useContext } from "react";
import SendingContext from "../contexts/SendingContext";

function Form({name, titleButton, isValid, onSubmit, children}) {
  const isSending = useContext(SendingContext)

  return (
    <form className={`popup__form popup__form_type_${name}`} noValidate name={name} onSubmit={onSubmit}>
      {children}
      {{login: 
        <button className={`login__submit-button ${isValid ? '' : 'login__submit-button_inactive'}`} disabled={isSending}>{isSending ? '' : titleButton || 'Сохранить'}</button>,    
        popup:
        <button className={`popup__submit-button ${isValid ? '' : 'popup__submit-button_inactive'}`} disabled={isSending}>{isSending ? '' : titleButton || 'Сохранить'}</button>, 
      }[`${name === 'signin' || name === 'signup' ? 'login' : 'popup'}`]}
    </form>
  )
}



export default Form;
