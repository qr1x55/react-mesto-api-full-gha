import useFormValidation from "../utils/useFormValidation.js"
import PopupWithForm from "./PopupWithForm.js"


export default function AddPlacePopup ({isOpen, onClose, onAddPlace, isSending}) {
  
  const {values, errors, inputValid, isValid, handleChange, reset} = useFormValidation()


  function resetOnClose(){
    onClose()
    reset()
  }
  
  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({name: values.name, link: values.link}, reset)
  }
  
  return(
    <PopupWithForm 
      name='add' 
      title='Новое место' 
      titleButton='Создать' 
      isOpen = {isOpen} 
      onClose= {resetOnClose}
      isValid= {isValid}
      onSubmit={handleSubmit}
      isSending={isSending}
    >
      <label className="popup__input-field">
        <input 
          id="place-input" 
          type="text" 
          name="name" 
          placeholder="Название" 
          className={`popup__input popup__input_type_place ${inputValid.name === undefined || inputValid.name ? '' : 'popup__input_type_error'}`}
          required 
          value={values.name ? values.name : ''} 
          minLength="2" 
          maxLength="30"
          disabled={isSending}
          onChange={handleChange}
        />
        <span id="place-input-error" className="popup__input-error">{errors.name}</span>
      </label>
      <label className="popup__input-field">
        <input 
          id="picture-input" 
          type="url" 
          name="link" 
          placeholder="Ссылка на картинку" 
          className={`popup__input popup__input_type_picture ${inputValid.link === undefined || inputValid.link ? '' : 'popup__input_type_error'}`}
          value={values.link ? values.link : ''} 
          required
          disabled={isSending}
          onChange={handleChange}
        />
        <span id="picture-input-error" className="popup__input-error">{errors.link}</span>
      </label> 
    </PopupWithForm>
  )
}