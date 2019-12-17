import React, {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

// is_js library installed by: npm i is_js/ yarn add is_js
import is from 'is_js';


export default class Auth extends Component {

  state = {
    // For separate validation of whole form
    isFormValid: false,

    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter a legal email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          
          // must be a legal email value
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: `Password can contain 6-20 characters`,
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }


  // Just prevents a form default behaviour  
  submitHandler = event => {
    event.preventDefault();
  }


  validateControl(control, value, validations) {
    // No need to validate control without 'validation' field in it
    if (!validations) return true;
     
    let isValid = true;

    if (validations.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validations.email) {
      isValid = is.email(value) && isValid;
    }

    if (validations.minLength) {
      isValid = value.length >= validations.minLength && isValid;

      if(value.length < validations.minLength) {
        control.errorMessage = `Password can't contain less than ${validations.minLength} characters`;
      }  
    }

    if (validations.maxLength) {
      isValid = value.length <= validations.maxLength && isValid;

      if(value.length > validations.maxLength) {
        control.errorMessage = `Password can't contain more than ${validations.maxLength} characters`;
      }
    }

    return isValid;
  }


  onChangeHandler = (event, controlName) => {
    //console.log(`${controlName}: `, event.target.value);

    // Copy of state.formControls
    const formControls = { ...this.state.formControls };

    // Copy of a current control (input element)
    // control - obj of control fields
    const control = { ...formControls[controlName] };
    //console.log(control.errorMessage)

    control.value = event.target.value;

    // 'onChangeHandler' method called after user touched the control/element
    control.touched = true;

    control.valid = this.validateControl(control, control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    // Validate if every form control is valid
    Object.keys(formControls).forEach(nameOfControl => {
      isFormValid = formControls[nameOfControl].valid && isFormValid;
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    // Object.keys(this.state.formControls) = [email, password]
    return Object.keys(this.state.formControls).map((controlName, index) => {
      // control - object of the control fields and their values
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          // shouldValidate={true}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }


  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            { this.renderInputs() }

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Submit
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }
}