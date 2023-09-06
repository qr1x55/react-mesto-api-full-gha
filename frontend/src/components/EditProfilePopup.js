import { useContext, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import useFormValidation from "../utils/useFormValidation.js"
import PopupWithForm from "./PopupWithForm.js"

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isSending}) {
  const currentUser = useContext(CurrentUserContext)
  const {values, errors, inputValid, isValid, handleChange, reset, setValue} = useFormValidation()

  useEffect(() => {
    setValue('editName', currentUser.name)
    setValue('editJob', currentUser.about)
  }, [currentUser, setValue])

  function resetOnClose(){
    onClose()
    reset({editName: currentUser.name, editJob: currentUser.about})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({editName: values.editName, editJob: values.editJob}, reset)
  }

  return (
    <PopupWithForm 
        name='edit' 
        title='Редактировать профиль' 
        titleButton='Сохранить' 
        isOpen = {isOpen} 
        onClose= {resetOnClose}
        isValid= {isValid}
        isSending={isSending}
        onSubmit={handleSubmit}
      >
        <label className="popup__input-field">
          <input 
            id="name-input" 
            type="text" 
            name="editName" 
            placeholder="Имя" 
            className={`popup__input popup__input_type_name ${inputValid.editName === undefined || inputValid.editName ? '' : 'popup__input_type_error'}`} 
            required 
            minLength="2" 
            maxLength="40" 
            value={values.editName ? values.editName : ''} 
            disabled={isSending} 
            onChange={handleChange}
          />
          <span id="name-input-error" className="popup__input-error">{errors.editName}</span>
        </label>
        <label className="popup__input-field">
          <input 
            id="job-input" 
            type="text" 
            name="editJob" 
            placeholder="О себе" 
            className={`popup__input popup__input_type_job ${inputValid.editJob === undefined || inputValid.editJob ? '' : 'popup__input_type_error'}`} 
            required 
            minLength="2" 
            maxLength="200" 
            value={values.editJob ? values.editJob : ''} 
            disabled={isSending} 
            onChange={handleChange}
          />
          <span id="job-input-error" className="popup__input-error">{errors.editJob}</span>
        </label>
      </PopupWithForm>
  )
}