function Popup({ name, isOpen, onClose, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container ${name === 'picture' ? 'popup__container_type_picture' : ''}`} onClick={e => e.stopPropagation()}>
        <button type="button" name="submitButton" className="popup__exit-button button" onClick={onClose}/>
        {children}
      </div>
    </div>
  )
}

export default Popup;