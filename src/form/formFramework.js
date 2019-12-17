
// Gets params:
// config - object of control fields names and their values
// validation - object of wanted validations (required: true, minLength: 3...)
export function createControl(config, validation) {
  return {
    // Can be any number of fields names and their values
    ...config,

    validation,

    // If there some 'validation', then 'valid: false'
    valid: !validation,

    touched: false,
    value: ''
  }
}


export function validate(control, value, validation = null) {
  //console.log(control)
  
  // If no need to validate, the input/control value is valid
  if (!validation) return true;
    
  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;

    if (value.length === 0) 
      control.errorMessage = `Please enter ${control.label.toLowerCase()}`;
    else control.errorMessage = '';   
  }

  if (validation.minLength && value.length > 0) {
    isValid = value.length >= validation.minLength && isValid;

    if(value.length < validation.minLength) {
      control.errorMessage = `Can't contain less than ${validation.minLength} characters`;
    } else {
      control.errorMessage = '';
    }
  }

  if (validation.maxLength && value.length >= validation.minLength) {
    isValid = value.length <= validation.maxLength && isValid;

    if(value.length > validation.maxLength) {
      control.errorMessage = `Can't contain more than ${validation.maxLength} characters`;
    } else {
      control.errorMessage = '';
    }
  }

  return isValid;
}


export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    // 'in' operator runs not only on own obj properties
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid;
}