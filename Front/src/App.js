import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddPT from './components/ProjectTask/AddPT';

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
      <Router>
        <div className="App">
          <Navbar />
          {/* just show the called compontent with route*/}
          <Route exact path="/" component={ProjectBoard} />
          {/* Form login*/}
          <Route exact path="/addPT" component={AddPT} />
          <Form onChange={fields => this.onChange(fields)} />
          <p>{JSON.stringify(this.state.fields, null, 2)}</p>
        </div>
      </Router>
    );
  }
}

export default App;
