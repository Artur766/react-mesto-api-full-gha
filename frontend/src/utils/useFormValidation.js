import React from "react";

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(ev) {
    const { name, value, validationMessage, form } = ev.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setErrors((oldErroes) => ({ ...oldErroes, [name]: validationMessage }));
    setIsValid(form.checkValidity());
  }

  function reset(initialValues = {}) {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }

  function setValue(name, value) {
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  }

  return { values, errors, isValid, handleChange, setValue, reset }
}