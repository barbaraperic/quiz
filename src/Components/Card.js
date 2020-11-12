import React from 'react';

const style = {
  backgroundColor: 'whitesmoke',
  padding: '100px',
  margin: '8px',
  border: '1px solid rgba(0, 0, 0, 0.4)',
  maxWidth: '500px',
}

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: '',
      quote: ''
    }
  }

  componentDidMount() {
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

  render() { 
    return (
      <div style={style}>
        <h2>{this.state.author}</h2>
        <p>{this.state.quote}</p>
      </div>
    )
  
  }
}

export default Card

// USER STORY: I can see a random quote

// I need to create a card
// do the api call
// get the random quote