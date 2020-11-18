import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'
import checkIcon from '../images/check.png'
import errorIcon from '../images/error.png'

const Input = props => {
  const { name, value, onClick, children, className, disabled } = props
  
  return (
    <button
      className={className}
      onClick={onClick}
      value={value}
      disabled={disabled}
    >
      {name}
      {children}
    </button>
  )
}

const Button = props => {
  const { text, className, handleClick } = props

  return (
    <button 
      className={className} 
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

const Result = props => {
  const { result } = props

  return (
    <h3>RESULT: {result}</h3>
  )
}
class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      loading: true,
      capitalName: '',
      countryName: '',
      correctAnswer: false,
      wrongAnswer: false,
      answerId: [],
      result: 0
    }

    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    this.getCapitals()
  }

  getRandomCapital() {
    const randomNumber = Math.floor(Math.random() * this.state.countries.length)
    const capital = this.state.countries[`${randomNumber}`].capital
    const country = this.state.countries[`${randomNumber}`].name
    this.setState({ capitalName: capital, countryName: country })
  }
  
  getCapitals() {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios.get(url).then(res => {
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      let selectedCountries = shuffled.slice(0, 4);
      this.setState({ 
        countries: selectedCountries,
        loading: false,
      }, () => this.getRandomCapital())
    })
  }

  checkCorrectAnswer(answer) {
    if (answer === this.state.countryName) {
      this.setState({ 
        correctAnswer: true, 
        wrongAnswer: false,
      })
      this.setState((state) => ({
        result: Number.parseInt(state.result) + 1
      }))
    } else {
      this.setState({ 
        correctAnswer: false, 
        wrongAnswer: true,
      })
    }
  }

  handleClick(id) {
    this.setState({ answerId: id })
    this.checkCorrectAnswer(id)
  }

  handleNextQuestion() {
    this.getCapitals()
    this.setState({ correctAnswer: false, wrongAnswer: false })
  }

  newGame() {
    this.getCapitals()
    this.setState({ correctAnswer: false, wrongAnswer: false, result: 0 })
  }

  render() {
    const { 
      countries, 
      capitalName, 
      correctAnswer, 
      wrongAnswer, 
      answerId, 
      loading } = this.state

    return (
      <div className="container">
        <h2>COUNTRY QUIZ</h2>
          {!loading && (
            <React.Fragment>
            <div className="card">
              <h3>{capitalName || 'X'} is the capital of</h3>
              <div className="answer-cards">
              {countries.map((country, index) => {
                return <Input
                  key={index}
                  className={`answer-card ${correctAnswer && answerId.includes(country.name) ? 'btn-success' : null}`}
                  value={country.name}
                  onClick={() => this.handleClick(country.name)}
                  disabled={wrongAnswer}
                >
                  <p>{country.name}</p>
                  {correctAnswer && answerId.includes(country.name) && 
                    <img src={checkIcon} alt="correct"/>
                  }
                  {wrongAnswer && answerId.includes(country.name) && 
                    <img src={errorIcon} alt="correct"/>
                  }
                </Input>
              })}
              </div>
              {correctAnswer && 
                <Button 
                  text="Next Question" 
                  className="btn-next"
                  handleClick={this.handleNextQuestion}
                />}
            </div>
            {wrongAnswer && <Result result={this.state.result}/>}
            {wrongAnswer && 
              <Button 
                text="Try Again"
                className="btn-next"
                handleClick={this.newGame}
              />
            }
          </React.Fragment>
          )}
      </div>
    )
  }
}

export default Quiz


//1. User story: I can see at least 2 types of question: a city is the capital of.. or a flag belong to country..

//2. User story: I can see select an answer

//3. User story: When I answer correctly, I can move on to the next question

//4. User story: When I answer incorrectly, I can see my results and try again

