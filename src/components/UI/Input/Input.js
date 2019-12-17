import React from 'react';
import classes from './Input.css';


function isInvalid({valid, shouldValidate, touched}) {
  return !valid && shouldValidate && touched;
}

const Input = props => {
  // Input type can be number, email, password...
  const inputType = props.type || 'text';

  const cls = [classes.Input];

  // htmlFor creates unique id for each input
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) cls.push(classes.invalid);


  return (
    <div className={cls.join(' ')}>
      {/* props.label - 'label' prop in 'input' tag */}
      <label htmlFor={htmlFor}>{props.label}</label>

      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {
        // Shows error message only when input value is invalid
        // (props.valid = false)
        isInvalid(props)
          ? <span>{props.errorMessage || 'Enter a legal value'}</span>
          : null
      }
    </div>
  )
}


export default Input;