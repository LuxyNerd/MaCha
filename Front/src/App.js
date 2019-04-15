import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddPT from './components/ProjectTask/AddPT';
import { Provider } from 'react-redux';
import store from './store';
import Form from './Form';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* just show the called compontent with route*/}
            {/* <Route exact path="/projectBoard" component={ProjectBoard} /> */}
            {/* Form login*/}
            <Route exact path="/addPT" component={AddPT} />
            <Route exact path="/" component={Form} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
