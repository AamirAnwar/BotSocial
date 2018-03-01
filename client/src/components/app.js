import React,{Component} from 'react';
import NavBar from './NavigationBar';
import Home from './Home';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home}/>
          <Route path="/user" component={Profile}/>
        </div>
      </Router>

    );
  }
}

export default App;
