import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'
import checkIcon from '../images/check.png'

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
    console.log('an',answer)
    if (answer === this.state.countryName) {
      this.setState({ correctAnswer: true })
    } else {
      this.setState({ correctAnswer: false })
    }
  }

  handleClick = (id) => {
    this.setState({ answerId: id })
    // const button = e.target
    this.checkCorrectAnswer(id)
  }

  render() {
    const { countries, capitalName, correctAnswer, answerId, loading } = this.state 

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
                  className="answer-card"
                  value={country.name}
                  onClick={() => this.handleClick(country.name)}
                >
                  {country.name}
                  {correctAnswer && answerId.includes(country.name) ? <img src={checkIcon} alt="correct"/> : null}
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
