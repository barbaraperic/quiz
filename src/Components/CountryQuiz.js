import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'

const Button = props => {
  const { countries, checkCorrectAnswer } = props
  
  const handleClick = (e) => {
    const button = e.target
    checkCorrectAnswer(button)
  }

  return (
    <React.Fragment>
      {countries.map((country, index) => {
        return (
          <button 
            key={index}
            data-index={index}
            className='answer-card'
            onClick={handleClick}
            value={country.name}
          >
            {country.name}
          </button>
        )})}
    </React.Fragment>
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
      loading: true
    }

    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
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

  checkCorrectAnswer(button) {
    if (button.value === this.state.countryName) {
      this.setState({ correctAnswer: true })
      button.style.backgroundColor = 'green'
    } else {
      button.style.backgroundColor = 'orange'
    }
}

  render() {
    const { countries, capitalName, correctAnswer, loading } = this.state


    return (
      <div className="container">
        <h2>Country Quiz</h2>
          {!loading && (
            <div className="card">
              <h3>{capitalName} is the capital of</h3>
              <div className="answer-cards">
              <Button 
                countries={countries} 
                checkCorrectAnswer={this.checkCorrectAnswer}
              />
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
