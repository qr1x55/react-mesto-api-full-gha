import React from 'react';
import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header({name, userEmail, setLoggedIn}) {
  function onLogOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email')
    setLoggedIn(false)
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место"/>
      {name === 'signup' || name === 'signin' ?
       <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className='header__link'>{name === 'signup' ? 'Войти' : 'Регистрация'}</Link> : 
       <>
        <div className={`header__menu-container`}>
          <p className='header__email'>{userEmail}</p>
          <Link to={'/sign-in'} className='header__logout' onClick={onLogOut}>Выйти</Link>
        </div>
       </>
      }
    </header>
  )
}

export default Header;