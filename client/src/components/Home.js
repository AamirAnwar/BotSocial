import React, {Component} from 'react';
import StoryList from './StoryList';
import StoryForm from './StoryForm';
import {connect} from 'react-redux';
import {fetchStories} from '../actions';
import {Redirect } from 'react-router-dom';

class Home extends Component {
  componentWillMount() {

  }
  render() {
    if (!this.props.user) {
      return  <Redirect to='/login' />
    }

    if (this.props.stories.length === 0) {
      this.props.fetchStories(this.props.user.access_token);
    }
    return (
      <div className="container">
        <StoryForm user={this.props.user} />
        <StoryList stories={this.props.stories}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(JSON.stringify(state.stories,null,2));
  return {
    stories:state.stories,
    user:state.user
  };
}


export default connect(mapStateToProps, {fetchStories})(Home);
