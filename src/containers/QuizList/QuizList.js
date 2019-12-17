import React, {Component} from 'react';
import classes from './QuizList.css';
import {NavLink} from 'react-router-dom';


export default class QuizList extends Component {

    state = {
      quizzesNames: ['Example Quiz'],
      quizzesData: []
    }
  

  // TODO: Add created quizzes to 'quizzesData' and then add clicked quiz to 'Quiz' component
  renderQuizes() {
    return this.state.quizzesNames.map( (quizName, index) => {
      return (
        // TODO: Navigate to a specific quiz  
        <li key={index} >
          <NavLink to={'/quiz/' + quizName}>
            {quizName}
          </NavLink>

        </li>
      )
    })
  }


  render() {
    return (
        <div>
          <h1>Quizzes List</h1><hr/>
          
          <div className={classes.QuizList}>
            <ul>
              { this.renderQuizes() }
            </ul>
          </div>
        </div> 
    )
  }
}