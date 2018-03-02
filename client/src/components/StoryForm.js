import React, {Component} from 'react';
import {connect} from "react-redux";
import {createStory} from '../actions';
class StoryForm extends Component {
  state = {text:''}
  render() {
    return (
      <div>
        {/* <input type="file" id="story_image_input" name="image" accept="image/*" />
        <input type="file" id="story_video_input" name="video" accept="video/*" /> */}
        <div className="input-group">
          <textarea onChange={(e) => {this.setState({text:e.target.value})}} className="form-control" name="text" placeholder="What's on your mind?" value={this.state.text}></textarea>
        </div>
        <div id="selected_image_container">
        </div>

        <div className="story_actions_container">
          <button id='story_submit_button' onClick={this.onSubmitClick.bind(this)} type="button" className="btn btn-success story_action"><i className="fa fa-pencil-square-o"></i> Post</button>
          {/* <button id='add_photo_button' type="button" className="btn btn-dark story_action"><i className="fa fa-camera-retro"></i> Add Photo</button>
          <button id='add_video_button' type="button" className="btn btn-dark story_action"><i className="fa fa-video-camera"></i> Add Video </button> */}
        </div>
      </div>
    );
  }

  onSubmitClick(event) {
    if (this.state.text.length > 0) {
      this.props.createStory(this.state.text, this.props.user.access_token);
    }
  }
}

export default connect(null, {createStory})(StoryForm);
