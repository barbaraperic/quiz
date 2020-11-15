import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      loading: true,
      clicked: false,
      correctAnswer: false,
      wrongAnswer: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
  }
  
  componentDidMount() {
    this.getCapitals()
  }

  randomizeData(array) {
    return 
  }
  
  getCapitals() {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios.get(url).then(res => {
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      let selectedCountries = shuffled.slice(0, 4);
      this.setState({ 
        countries: selectedCountries,
        loading: false
      })
    })
  }

  checkCorrectAnswer(country) {
    console.log(this.state.countries[0].name);
    if (country === this.state.countries[0].name) {
      this.setState({ correctAnswer: true })
    } else {
      this.setState({ wrongAnswer: true })
    }
  }

  handleClick(e) {
    e.target.style.backgroundColor = 'orange'
    this.setState({ clicked: true })
    this.checkCorrectAnswer(e.target.value)
  }

  render() {
    const { countries, correctAnswer, wrongAnswer, clicked, loading } = this.state

    return (
      <div className="container">
        <h2>Country Quiz</h2>
          {!loading && (
            <div className="card">
              <h3>{countries[0].capital} is the capital of</h3>
              <div className="answer-cards">
                {countries.map((country, index) => {
                  return (
                  <button 
                    key={index}
                    className="answer-card"
                    onClick={this.handleClick}
                    value={country.name}
                    disabled={clicked}
                  >
                    {country.name}
                  </button>
                )})}
              </div>
            </div>  
          )}
          {correctAnswer && <button className="btn-large">Correct! Next one</button>}
          {wrongAnswer && <p>Wrong!</p>}
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
