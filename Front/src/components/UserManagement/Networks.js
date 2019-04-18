import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom'; //return to
import { PostData } from '../../services/PostData';

class Networks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false
    };
    this.signup = this.signup.bind(this);
  }

  signup(res, type) {
    let postData;

    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (postData) {
      PostData('signup', postData).then(result => {
        let responseJson = result;
        sessionStorage.setItem('userData', JSON.stringify(responseJson));
        this.setState({ redirect: true });
      });
    } else {
    }
  }

  render() {
    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return <Redirect to={'/'} />;
    }
    const responseGoogle = response => {
      console.log('google console');
      console.log(response);
      this.signup(response, 'google');
    };

    const responseFacebook = response => {
      console.log('facebook console');
      console.log(response);
      this.signup(response, 'facebook');
    };

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Networks</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <GoogleLogin
                    clientId="546361452535-d4a8idj4u6ltgr6qvd712kb4jl9kseo0.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                </div>
                <div className="form-group">
                  <FacebookLogin
                    appId="Your FacebookAPP ID"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                  <br />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Networks;
