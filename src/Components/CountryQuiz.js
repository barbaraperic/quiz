import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'
import checkIcon from '../images/check.png'
import errorIcon from '../images/error.png'

const Button = props => {
  const { name, value, onClick, children, className } = props
  
  return (
    <button
      className={className}
      onClick={onClick}
      value={value}
    >
      {name}
      {children}
    </button>
  )
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      capitalName: '',
      countryName: '',
      correctAnswer: false,
      wrongAnswer: false,
      answerId: [],
      loading: true
    }

    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      this.setState({ correctAnswer: true })
      this.setState({ wrongAnswer: false })
    } else {
      this.setState({ correctAnswer: false })
      this.setState({ wrongAnswer: true })
    }
  }

  handleClick = (id) => {
    this.setState({ answerId: id })
    this.checkCorrectAnswer(id)
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
        <h2>Country Quiz</h2>
          {!loading && (
            <div className="card">
              <h3>{capitalName} is the capital of</h3>
              <div className="answer-cards">
              {countries.map((country, index) => {
                return <Button
                  key={index}
                  //className={`box ${isBoxVisible ? "" : "hidden"}`}
                  className={`answer-card ${correctAnswer && answerId.includes(country.name) ? 'btn-success' : null}`}
                  value={country.name}
                  onClick={() => this.handleClick(country.name)}
                >
                  {country.name}
                  {correctAnswer && answerId.includes(country.name) && <img src={checkIcon} alt="correct"/>}
                  {wrongAnswer && answerId.includes(country.name) && <img src={errorIcon} alt="correct"/>}
                </Button>
              })}
              </div>
            </div>  
          )}
      </div>
    )
  }
}

export default Quiz


// 1. User story: I can see at least 2 types of question: a city is the capital of.. or a flag belong to country..
// create a card component with h2 element to render the question question
// api to fetch the capitals
// api to fetch the flags

//2. User story: I can see select an answer
//create onClick function to the button
