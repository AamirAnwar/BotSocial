import React,{Component} from 'react';
import NavBar from './NavigationBar';
import Home from './Home';
import AuthForm from './AuthForm';
import Profile from './Profile';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import promise from 'redux-promise';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <div>
            <NavBar />
            <Route exact path ="/" component={Home} />
            <Route exact path="/login" type="login" component={()=>{return <AuthForm type="login" />}}/>
            <Route exact path="/register" type="register" component={()=>{return <AuthForm type="register" />}}/>
            <Route path="/user" component={Profile}/>
          </div>
        </Router>
      </Provider>

    );
  }
}


export default App;
