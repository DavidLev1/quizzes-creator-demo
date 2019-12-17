import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';

import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';


class App extends Component {
  render() {
    return (
      <Layout>
        {/* Switch enables load only one route at a time */}
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />

          {/* ':id' is a some dynamic value */}
          <Route path="/quiz/:id" component={Quiz} />

          <Route path="/" component={QuizList} />
        </Switch>
      </Layout>
    )
  }
}


export default App;
