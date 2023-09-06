import { useCallback, useState } from "react"


export default function useFormValidation () {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [inputValid, setInputValid] = useState({})
  const [isValid, setIsValid] = useState(false)

  // console.log(errors);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validMessage = e.target.validationMessage
    const valid = e.target.validity.valid
    const form = e.target.form
    
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validMessage }
    })

    setInputValid(() => {
      return { ...inputValid, [name]: valid}
    })

    setIsValid(form.checkValidity())
  }

  function reset(data={}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])

  return {values, errors, inputValid, isValid, handleChange, reset, setValue}
}