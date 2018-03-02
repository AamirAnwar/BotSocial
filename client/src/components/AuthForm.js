import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../actions';


class AuthForm extends Component {
  state = {
    username:'',
    password:''
  }

  render() {
    if (this.props.user) {
      console.log("Redirecting! to home");
      return  <Redirect to='/' />
    }

    let bottomText = null;
    let title = null;

    let bottomLinkEndpoint = null;
    const {type} = this.props;
    switch (type) {
      case "login":
      title = "Login";
      bottomText = "Not a member? Sign up";
      bottomLinkEndpoint = "/register";

      break;
      case "register":
      title = "Register";
      bottomText = "Already a member? Sign up";
      bottomLinkEndpoint = "/login";
      break;

      default:
      return <div></div>
    }
    return (
      <div className="form_container">
        <div className="form-signin container">
          <div className="text-center mb-4">
            <img className="mb-4" src="/images/bot_social_icon.png" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">{title}</h1>
            <p>{title} using Email</p>
          </div>

          <div className="form-label-group">
            <input type="email" id="inputEmail" className="form-control" name="username" placeholder="Email address" required autoFocus onChange={this.handleUsernameInputChange.bind(this)} value={this.state.username} />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required onChange={this.handlePasswordInputChange.bind(this)} value={this.state.password}/>
            <label htmlFor="inputPassword">Password</label>
          </div>
          <button onClick={this.onButtonClick.bind(this)} className="btn btn-lg btn-primary btn-block">Log in</button>
          <p className="mt-5 mb-3 text-muted text-center">&copy; 2018-2019</p>
        </div>
        <Link className="navbar-brand" to={bottomLinkEndpoint}>
          {bottomText}
        </Link>

      </div>

    );
  }

  handleUsernameInputChange(event) {
    this.setState({username: event.target.value});

  }

  handlePasswordInputChange(event) {
    this.setState({password: event.target.value});

  }

  onButtonClick(event) {
    this.props.loginUser(this.state.username, this.state.password);
  }
}

function mapStateToProps(state) {
  console.log("State at AuthForm " + JSON.stringify(state,null,2));
  return {
    user:state.user
  }
}

export default connect(mapStateToProps, {loginUser})(AuthForm);
