import Popup from "./Popup.js";


function ImagePopup({name, card, isOpen, onClose}) {
  return (
    <Popup 
    name={name}
    isOpen={isOpen}
    onClose={onClose}
    >
      <img 
        className="popup__picture" 
        src={card.link} 
        alt={`Иллюстрация ${card.name}`} 
      />
      <h2 className="popup__caption">{card.name}</h2>
    </Popup>
  )
}

export default ImagePopup;