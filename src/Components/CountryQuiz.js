import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      capital: '',
      falseCapital: '',
      loading: true
    }
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
      let selected = shuffled.slice(0, 4);
      this.setState({ countries: selected, loading: false}, () => console.log(this.state.countries))
    })
  }

  render() {
    const { countries, loading } = this.state
    return (
      <div className="container">
        <h2>Country Quiz</h2>
          {!loading && (
            <div className="card">
              <h3>{countries[0].capital} is the capital of</h3>
              <div>
                {countries.map((country, index) => {
                  return (
                  <p 
                    key={index}
                    className="answer-card"
                  >
                    {country.name}
                  </p>
                )})}
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default Quiz


// User story: I can see at least 2 types of question: a city is the capital of.. or a flag belong to country..

// create a card component with h2 element to render the question question
// api to fetch the capitals
// api to fetch the flags