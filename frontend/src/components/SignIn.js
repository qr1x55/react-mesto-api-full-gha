import useFormValidation from "../utils/useFormValidation";
import Login from "./Login";

export default function SignIn({name, handleSignIn}) {
  const {values, errors, isValid, inputValid, handleChange} = useFormValidation()

  function onSignIn(e) {
    e.preventDefault()
    handleSignIn(values.password, values.email)
  }

  return (
    <Login name={name} onSubmit={onSignIn} isValid={isValid}>
      <label className="login__input-field">
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={values.email || ''} 
            placeholder={'Email'} 
            className={`login__input ${inputValid.email === undefined || inputValid.email ? '' : 'login__input_type_error'}`}
            required
            // isInputValid={isInputValid.email}
            // disabled={isSending}
            onChange={handleChange}
          />
          <span id="login-input-error" className="login__input-error">{errors.email}</span>
        </label> 
        <label className="login__input-field">
          <input 
            id="password" 
            type="password" 
            name="password" 
            minLength={3}
            value={values.password || ''} 
            placeholder={"Пароль"} 
            className={`login__input ${inputValid.password === undefined || inputValid.password ? '' : 'login__input_type_error'}`}
            required
            // disabled={isSending}
            onChange={handleChange}
          />
          <span id="login-input-error" className="login__input-error">{errors.password}</span>
        </label> 
    </Login>
  )
}