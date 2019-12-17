const EXAMPLE_QUIZ_DATA = {
    results: {}, // {[id]: success/error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success'/'error' }
    quiz: [
        {
            question: 'The most widespread color in nature is?',
            rightAnswerId: 1,
            id: 1,
            answers: [
              {text: 'blue', id: 1},
              {text: 'red', id: 2},
              {text: 'green', id: 3},
              {text: 'yellow', id: 4}
            ]
        },
        {
            question: 'When America was discovered by Christopher Columbus?',
            rightAnswerId: 3,
            id: 2,
            answers: [
            {text: 'November 6, 1730', id: 1},
            {text: 'September 13, 1602', id: 2},
            {text: 'October 12, 1492', id: 3},
            {text: 'July 15, 1503', id: 4}
            ]
        },
        {
            question: 'The best Full-Stack developer in the world is?',
            rightAnswerId: 4,
            id: 3,
            answers: [
            {text: 'Danilo Resende', id: 1},
            {text: 'Mark Zuckerberg', id: 2},
            {text: 'David Lev', id: 3},
            {text: 'Royi Bernthal', id: 4}
            ]
        }
    ]
}


// function shuffleQuizArr() {
//   shuffle(EXAMPLE_QUIZ_DATA.quiz);
// }

function shuffleAnswers() {
    EXAMPLE_QUIZ_DATA.quiz.forEach( question => {
    shuffle(question.answers);
  })
  //shuffle(QUESTIONS_DATA.quiz.answers);
}


shuffleAnswers();
//shuffleQuizArr();


function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}


export default EXAMPLE_QUIZ_DATA;