import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.input);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      input: ''
    });
  }

  render() {
    return (
      <div>
        Search Form
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            placeholder="search"
            value={this.state.input}
            name="input"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
