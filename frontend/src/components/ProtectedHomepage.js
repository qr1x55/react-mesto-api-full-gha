import Header from "./Header.js"
import Main from './Main.js'


export default function ProtectedHomepage({userEmail, setLoggedIn, ...props}) {
  return(
    <>
      <Header userEmail={userEmail} setLoggedIn={setLoggedIn}/>
      <Main
        name='main'
        {...props}
      />
    </>
  )
}