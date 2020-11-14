import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '4px',
    width: '300px',
    height: '500px',
    textAlign: 'center',
    padding: '8px'
  },
  background: {
    backgroundColor: 'purple',
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: [],
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
      const randomCountry = res.data[Math.floor(Math.random() * res.data.length)]
      console.log('shuffle', randomCountry);
      this.setState({ country: randomCountry, loading: false}, () => console.log(this.state.country))
    })
  }

  render() {
    const { country, loading } = this.state
    return (
      <div className="container">
        <h2>Country Quiz</h2>
        <div style={styles.card}>
          {!loading && (
            <h3>{country.capital} is the capital of</h3>
          )}
        </div>
      </div>
    )
  }
}

export default Quiz


// User story: I can see at least 2 types of question: a city is the capital of.. or a flag belong to country..

// create a card component with h2 element to render the question question
// api to fetch the capitals
// api to fetch the flags