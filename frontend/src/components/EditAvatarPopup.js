import { useRef } from "react"
import useFormValidation from "../utils/useFormValidation.js"
import PopupWithForm from "./PopupWithForm.js"


export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSending}) {
  const inputValue = useRef()
  
  const {values, errors, inputValid, isValid, handleChange, reset} = useFormValidation()

  function resetOnClose(){
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: inputValue.current.value}, reset)
  }

  return(
    <PopupWithForm 
        name='avatar' 
        title='Обновить аватар' 
        titleButton='Сохранить' 
        isOpen = {isOpen} 
        onClose= {resetOnClose}
        isValid= {isValid}
        onSubmit={handleSubmit}
        isSending={isSending}
      >
        <label className="popup__input-field">
          <input 
            ref={inputValue} 
            id="avatar-input" 
            type="url" 
            name="avatar" 
            value={values.avatar ? values.avatar : ''} 
            placeholder="Ссылка на аватар" 
            className={`popup__input popup__input_type_avatar ${inputValid.avatar === undefined || inputValid.avatar ? '' : 'popup__input_type_error'}`}
            required
            disabled={isSending}
            onChange={handleChange}
          />
          <span id="avatar-input-error" className="popup__input-error">{errors.avatar}</span>
        </label> 
      </PopupWithForm>
  )
}