import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';

class App extends Component {
  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="alert alert-warning">warnings!</h1>
        <Form onChange={fields => this.onChange(fields)} />
        <p>{JSON.stringify(this.state.fields, null, 2)}</p>
      </div>
    );
  }
}

export default App;
