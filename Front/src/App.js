import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectBoard from './ProjectDashboard/components/ProjectBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddPT from './ProjectDashboard/components/ProjectTask/AddPT';
import { Provider } from 'react-redux';
import store from './store';
import Form from './Form';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LoginScreen from './Loginscreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    };
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} />);
    this.setState({
      loginPage: loginPage
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {this.state.loginPage}
            {this.state.uploadScreen}
            {/* just show the called compontent with route*/}
            {/* <Route exact path="/projectBoard" component={ProjectBoard} /> */}
            {/* Form login*/}
            {/* <Route exact path="/addPT" component={AddPT} />
            <Route exact path="/" component={Form} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
