import React from 'react'
import axios from 'axios'
import './CountryQuiz.css'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      selected: false,
      active: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //class={(this.state.selected && (this.state.article === article)) ? 'bkcolor': 'default'}

  handleClick(e) {
    e.target.style.backgroundColor = 'orange'
    const index = Number.parseInt(e.target.getAttribute("data-index"))
    console.log('index', index);
    this.setState({ active: index, selected: true }, () => console.log(this.state))
    //this.props.checkCorrectAnswer(this.state.active)
  }

  render() {
    return(
      <div className="answer-cards">
        {this.props.countries.map((country, index) => {
          return (
            <button 
              key={index}
              className={`answer-card ${this.state.selected && (this.state.active === index) ? 'btn-success' : null}`}
              onClick={this.handleClick}
              value={country.name}
              data-index={index}
            >
              {country.name}
            </button>
        )})}
      </div>
    )
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      loading: true,
      clickedAnswer: [],
    }

    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
  }
  
  componentDidMount() {
    this.getCapitals()
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

  checkCorrectAnswer(index) {
    // console.log(this.state.countries[0].name);
/*     if (this.state.countries[index].name === this.state.countries[0].name) {
      
    } else {
      this.setState({ wrongAnswer: true })
    } */
  }



  render() {
    const { countries, wrongAnswer, loading } = this.state

    return (
      <div className="container">
        <h2>Country Quiz</h2>
          {!loading && (
            <div className="card">
              <h3>{countries[0].capital} is the capital of</h3>
              <Button countries={countries} checkCorrectAnswer={this.checkCorrectAnswer}/>
            </div>  
          )}
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
