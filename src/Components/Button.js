import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      light: true
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({ light: !state.light}))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
       {!this.state.light ? 'OFF' : 'ON'}
      </button>
    )
  }
}

export default Button
