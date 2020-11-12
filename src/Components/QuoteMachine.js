import React from 'react';

const styles = {
  card: {
    backgroundColor: 'whitesmoke',
    padding: '100px',
    border: '1px solid rgba(0, 0, 0, 0.4)',
    maxWidth: '500px',
    margin: '8px auto'
  },
  button: {
    padding: '8px 16px'
  }
}

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: '',
      quote: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.getQuote = this.getQuote.bind(this)
  }

  componentDidMount() {
    this.getQuote()
  }
  //use axios
  getQuote() {
    fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random')
    .then(res => res.json())
    .then(res => {
      this.setState({
        author: res.quote.quoteAuthor, 
        quote: res.quote.quoteText
      }, () => console.log(this.state))
      console.log(res)
    })
  }

  handleClick() {
    this.getQuote()
  }

  render() { 
    return (
      <div style={styles.card}>
        <h2>{this.state.author}</h2>
        <p>{this.state.quote}</p>
        <button
          onClick={this.handleClick}
        >Get new quote</button>
      </div>
    )
  }
}

export default QuoteMachine

//User story: I can see a random quote

// I need to create a card
// do the api call
// get the random quote

//User story: I generate a new random quote

// Create a button component
// Add functionality to fetch new quote on click