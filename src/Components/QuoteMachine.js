import React from 'react';
import axios from 'axios'
import refreshIcon from '../images/refresh.png'
import './QuoteMachine.css'
class QuoteMachine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: '',
      quote: '',
      genre: '',
      allQuotes: [],
      loading: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.getQuote = this.getQuote.bind(this)
    this.getAuthorQuotes = this.getAuthorQuotes.bind(this)
  }

  componentDidMount() {
    this.getQuote()
  }

  getQuote() {
    let url = ('https://quote-garden.herokuapp.com/api/v2/quotes/random')
    axios.get(url)
    .then(res => {
      this.setState({ 
        author: res.data.quote.quoteAuthor,
        quote: res.data.quote.quoteText,
        genre: res.data.quote.quoteGenre
      })
    })
  }

  handleClick() {
    this.getQuote()
    this.setState({ allQuotes: []})
  }

  getAuthorQuotes(author) {
    const authorName = author.target.value
    let url = `https://quote-garden.herokuapp.com/api/v2/authors/${authorName}?page=1&limit=10`
    
    axios.get(url).then(res => {
      let quotes = res.data.quotes //array of objects

      this.setState({ allQuotes: quotes, loading: true})
    })
  }

  render() {
    const { author, quote, genre, allQuotes, loading } = this.state
    return (
      <div className="text-center">
        <div className="flex-center">
          <p>refresh</p>
          <img 
            src={refreshIcon} 
            alt="refresh" 
            onClick={this.handleClick}
            className="refresh-icon"
          />
        </div>
        <p className="quote">{quote}</p>
        <div>
          <button
            className="header"
            onClick={this.getAuthorQuotes}
            value={author}
          >
            {author}
          </button>
          <p>{genre}</p>
        </div>
        <ul>
          {loading && <p>{author} quotes:</p>}
          {allQuotes.map((quote, i) => {
            return (
              <li 
                className="list"
                key={i}
              >
                {quote.quoteText}
              </li>
            )
          })}
        </ul>
      </div>
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

