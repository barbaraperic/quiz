import React from 'react';
import axios from 'axios'

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
      allQuotes: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.getQuote = this.getQuote.bind(this)
    this.getAuthorQuotes = this.getAuthorQuotes.bind(this)
  }

  componentDidMount() {
    this.getQuote()
  }
  //use axios
  getQuote() {
    let url = ('https://quote-garden.herokuapp.com/api/v2/quotes/random')
    axios.get(url)
    .then(res => {
      this.setState({ 
        author: res.data.quote.quoteAuthor,
        quote: res.data.quote.quoteText
      })
    })
  }

  handleClick() {
    this.getQuote()
  }

  getAuthorQuotes(author) {
    const authorName = author.target.value
    let url = `https://quote-garden.herokuapp.com/api/v2/authors/${authorName}?page=1&limit=10`
    
    axios.get(url).then(res => {
      //console.log(res)
      let quotes = res.data.quotes // array of objects

      this.setState({ allQuotes: quotes}, () => {
        console.log('all', this.state.allQuotes)
      })
    })
  }

  render() {
    const { author, quote, allQuotes } = this.state
    return (
      <React.Fragment>
        <div style={styles.card}>
          <button
            onClick={this.getAuthorQuotes}
            value={author}
          >
            {author}
          </button>
          <p>{quote}</p>
          <button
            onClick={this.handleClick}
          >Get new quote</button>
        </div>
        <ul>
          {allQuotes.map(quote => {
            return <li className="list">{quote.quoteText}</li>
          })}

        </ul>
      </React.Fragment>
    )
  }
}

export default QuoteMachine

//1. User story: I can see a random quote
// Create a card component
// Connect to the API using axios
// Display data in the component

//2. User story: I generate a new random quote
// Create a button component
// Add functionality to fetch new quote on click

//3. User story: When I select quote author, I can see a list of quotes from them
// 

