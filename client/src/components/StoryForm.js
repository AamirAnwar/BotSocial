import React, {Component} from 'react';

class StoryForm extends Component {
  render() {
    return (
      <form ref="uploadForm" id="uploadForm" action="/story" method="POST" encType="multipart/form-data">
      <input type="file" id="story_image_input" name="image" accept="image/*" />
      <input type="file" id="story_video_input" name="video" accept="video/*" />
      <div className="input-group">
        <textarea className="form-control" name="text" placeholder="What's on your mind?"></textarea>
      </div>
      <div id="selected_image_container">
      </div>

      <div className="story_actions_container">
        <button id='story_submit_button' type="button submit" className="btn btn-success story_action"><i className="fa fa-pencil-square-o"></i> Post</button>
        <button id='add_photo_button' type="button" className="btn btn-dark story_action"><i className="fa fa-camera-retro"></i> Add Photo</button>
        <button id='add_video_button' type="button" className="btn btn-dark story_action"><i className="fa fa-video-camera"></i> Add Video </button>
      </div>
    </form>
    );
  }
}

export default StoryForm;
