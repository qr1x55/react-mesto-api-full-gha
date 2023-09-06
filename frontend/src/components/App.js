import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api";
import '../index.css';
import { useState, useCallback, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import SendingContext from '../contexts/SendingContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import ProtectedHomepage from './ProtectedHomepage';
import { registration, authorization, getUserData } from '../utils/auth.js';
import InfoToolTip from './InfoTooltip.js';


function App() {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false)
  const [isAddPopupOpen, setAddPopupOpen] = useState(false)
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopupOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)

  const [loggedIn, setLoggedIn] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)

  const isOpen = isEditPopupOpen || isAddPopupOpen || isAvatarPopupOpen || isDeletePopupOpen || isImagePopup


  const navigate = useNavigate(); 

  const statesForCloseAllPopups = useCallback (() => {
    setEditPopupOpen(false);
    setAddPopupOpen(false);
    setAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopupOpen(false);
    setLoginPopupOpen(false);
  },[])

  const closeAllPopups = useCallback (() => {
    statesForCloseAllPopups()
  },[statesForCloseAllPopups])

  
  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    function closeByOverlayClick(e) {
      if (e.target.classList.contains('popup')) {
        closeAllPopups()
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEsc);
      document.addEventListener('mousedown', closeByOverlayClick);
      return () => {
        document.removeEventListener('keydown', closeByEsc);
        document.addEventListener('mousedown', closeByOverlayClick)
      }
    }
  }, [isOpen, closeAllPopups])


  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
      .then(() => {
        setLoggedIn(true)
        setUserEmail(window.localStorage.getItem('email'))
        setIsCheckToken(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [])
  
  function handleEditClick () {
    setEditPopupOpen(true);
  }
  
  function handleAddClick () {
    setAddPopupOpen(true);
  }

  function handleAvatarClick () {
    setAvatarPopupOpen(true);
  }

  function handleImageClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteClick (cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true);
  }

  function handleDeleteCard(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.removeCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(item => {
          return item._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        cardsData.forEach(item => item.userId = userData._id);
        setCards(cardsData)
        setIsLoading(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))}
  }, [loggedIn])

  function handleUpdateUser(userData, reset) {
    setIsSending(true)
    api.setUserData(userData, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  function handleUpdateAvatar(userData, reset) {
    setIsSending(true)
    api.setAvatar(userData, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  function handleAddPlace(cardData, reset) {
    setIsSending(true)
    api.postCard(cardData, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  function handleSignIn(password, email) {
    setIsSending(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('email', email);
        setLoggedIn(true)
        window.scrollTo(0,0)
        navigate('/')
      })
      .catch((error) => {
        setLoginPopupOpen(true)
        setIsSuccess(false)
        console.error(`Ошибка при регистрации ${error}`);
      })
      .finally(() => {
        setUserEmail(email);
        setIsSending(false)})
  }

  function handleSignUp(password, email) {
    setIsSending(true)
    registration(password, email)
      .then(() => {
        setLoginPopupOpen(true)
        setIsSuccess(true)
        window.scrollTo(0,0)
        navigate('/sign-in')
      })
      .catch((error) => {
        setLoginPopupOpen(true)
        setIsSuccess(false)
        console.error(`Ошибка при регистрации ${error}`);
      })
      .finally(() => setIsSending(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SendingContext.Provider value={isSending}>
        <Routes>
          <Route path='/' element={<ProtectedRoute
          element={ProtectedHomepage}
          onEdit={handleEditClick}
          onAdd={handleAddClick}
          onAvatar={handleAvatarClick}
          onDelete={handleDeleteClick}
          onImageClick={handleImageClick}
          setLoggedIn={setLoggedIn}
          cards={cards}
          isLoading={isLoading}
          userEmail={userEmail}
          loggedIn={loggedIn}
          isCheckToken={isCheckToken}
          />}/>
          <Route path='/sign-up' element={
            <>
              <Header name='signup'/>
              <Main name='signup' isCheckToken={isCheckToken} handleSignUp={handleSignUp}/>
            </>
          }/>
          <Route path='/sign-in' element={
            loggedIn ? <Navigate to='/' replace/> :
            <>
              <Header name='signin'/>
              <Main name='signin' isCheckToken={isCheckToken} handleSignIn={handleSignIn}/>
            </>
          }/>
            
          <Route path='*' element={<Navigate to='/' replace/>}/>
        </Routes>
      </SendingContext.Provider>
      <Footer />
      <EditProfilePopup         
        onAddPlace = {handleUpdateUser}
        isOpen = {isEditPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onAddPlace = {handleAddPlace}
        isOpen = {isAddPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
      /> 
      <EditAvatarPopup
        onUpdateAvatar = {handleUpdateAvatar}
        isOpen = {isAvatarPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
      /> 
      <PopupWithForm 
        name='delete' 
        title='Вы уверены?' 
        titleButton='Да' 
        isOpen = {isDeletePopupOpen} 
        onClose = {closeAllPopups}
        onSubmit = {handleDeleteCard}
        isSending = {isSending}
      /> 
      <ImagePopup 
        name = 'picture'
        card = {selectedCard} 
        isOpen = {isImagePopup} 
        onClose = {closeAllPopups}
      /> 
      <InfoToolTip
        name='login'
        isSuccess={isSuccess}
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
