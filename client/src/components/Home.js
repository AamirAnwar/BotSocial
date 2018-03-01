import React, {Component} from 'react';
import StoryList from './StoryList';
import StoryForm from './StoryForm';
import {connect} from 'react-redux';
import {fetchStories} from '../actions';
class Home extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }
  render() {
    return (
      <div className="container">
        <StoryForm />
        <StoryList stories={this.props.stories}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(JSON.stringify(state.stories,null,2));
  return {stories:state.stories};
}


export default connect(mapStateToProps, {fetchStories})(Home);
