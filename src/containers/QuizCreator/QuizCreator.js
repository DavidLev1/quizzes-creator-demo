import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';


function createOptionControl(answerNum) {
  return createControl({
    label: `Answer ${answerNum}`,
    errorMessage: `Answer ${answerNum} can't be empty`,
    id: answerNum
  }, {required: true, minLength: 1, maxLength: 60})
}


function createFormControls() {
  return {
    quizName: createControl({
      label: 'Quiz name',
      errorMessage: "Quiz name can't be empty"
    }, {required: true, minLength: 3, maxLength: 20}),
    question: createControl({
      label: 'Question',
      errorMessage: "Question field can't be empty"
    }, {required: true, minLength: 5, maxLength: 80}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)

    // TODO: Create an ability to add new answer options 
    // add button of 'add answer option'
    // when it clicked, call to 'createOptionControl' method with wanted num
    // add button of 'delete answer option' start from third answer option
  }
}


export default class QuizCreator extends Component {

  state = {
    // Array which contains questions of a quiz
    quiz: [],

    isFormValid: false,

    // TODO: start 'rightAnswerId' as null and make validation of
    // choosing a correct answer
    rightAnswerId: 1,

    formControls: createFormControls()
  }


  // Just prevent default behaviour of a form
  submitHandler = event => {
    event.preventDefault()
  }


  addQuestionHandler = event => {
    // Prevent default form behaviour
    event.preventDefault();

    // copy of 'quiz' array
    const quiz = this.state.quiz.concat();

    // create indexes for ids
    const index = quiz.length + 1;

    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,

      // Reset form fields
      formControls: createFormControls()
    })
  }


  createQuizHandler = event => {
    event.preventDefault();

    console.log(this.state.quiz);
    
    // TODO: Add a new quiz to QuizList component, to 'quizzesData' array
  }


  changeHandler = (controlVal, controlName) => {
    // copy of this.state.formControls
    const formControls = { ...this.state.formControls };

    // copy of control (obj of the control fields and their values)
    const control = { ...formControls[controlName] };

    // 'changeHandler' method called as a result of changing value in control
    control.touched = true;

    // The last value inserted into the control
    control.value = controlVal;

    // control.validation - object of wanted validations
    control.valid = validate(control, control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }


  renderControls() {
    //Object.keys(this.state.formControls) = ["quizName", "question"...]
    return Object.keys(this.state.formControls).map( (controlName, index) => {
      // control - object of the control fields and their values 
      const control = this.state.formControls[controlName]

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {/* Put horizontal line below the question (under quiz name) */}
          { index === 0 ? <hr/> : null }
        </Auxiliary>
      )
    })
  }


  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }


  render() {
    const selectCorrectAnswer = <Select
      label="Choose a correct answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}

      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />


    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creation</h1>

          <form onSubmit={this.submitHandler}>

            { this.renderControls() }

            { selectCorrectAnswer }

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>

            <br/><br/>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create quiz
            </Button>

          </form>
        </div>
      </div>
    )
  }
}