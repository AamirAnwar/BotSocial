import React,{Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../actions'
import {Link} from 'react-router-dom';
class NavBar extends Component {
  renderNavItems() {

    // Find a way to check if a user is logged in
    let isLoggedIn = true;

    if (isLoggedIn) {
      return (
        <ul className="nav">
          <li className="nav-item">
            {/* TODO */}
            <Link className="nav-link active" to= {`/user/${234}`}>Profile</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link active" onClick={(e)=>{this.props.logoutUser();}}>Logout</a>
          </li>
        </ul>
      );
    }
    else {
      return (<div></div>);
    }
  }

  render() {
    return(
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">
        BotSocial
      </Link>
      {this.renderNavItems()}
    </nav>

  );
}
}

export default connect(null, {logoutUser})(NavBar);
