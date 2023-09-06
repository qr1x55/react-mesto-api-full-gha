import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ButtonLike from "./ButtonLike.js";

function Card ({ card, onImageClick, onDelete}) {
  const currentUser = useContext(CurrentUserContext);
  return(
    <>
      <img 
        className="elements__picture" 
        src={card.link} 
        alt={`Изображение ${card.name}`} 
        onClick={() => onImageClick({link: card.link, name: card.name})}
      />
      <div className="elements__caption-block">
        <h2 className="elements__caption">{card.name}</h2>
        <div className="elements__like-container">
          <ButtonLike myId={currentUser._id} likes={card.likes} cardId={card._id} />
        </div>
      </div>
      {currentUser._id === card.owner && <button type="button" className="elements__remove-button" onClick={() => onDelete(card._id)}/>}
    </>
  )
}

export default Card;