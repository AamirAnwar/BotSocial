import React, {Component} from 'react';
import _ from 'lodash';
import {commentStory} from '../actions'
import {connect} from 'react-redux';

class CommentSection extends Component {
  state = {text:''};
  renderComments() {
    return _.map(this.props.story.comments, (comment, i) => {
      return (
        <div className="row comment_row" key={comment._id}>
          <div className="card-block col-lg-12">
            <div className="card">

              <div className="row">
                <div className="col-lg-1">
                  <div style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}} className="profile_image">
                </div>
              </div>

              <div className="col-lg-11">
                <h5 className="comment_user_detail">{comment.author.username}</h5>
                <div className="comment_user_detail">{comment.date}</div>
                <div className="comment_text">
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

render() {
  if (!this.props.story) {
    return <div></div>
  }
  return (
    <div className="card-block">
      <div className="comment_container card">
        <div className="row">
          <div className="col-lg-1">
            <div style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}} className="profile_image">
          </div>
        </div>

        <div className="col-lg-11">
          <div>
            <div className="form-group">
              <input type="text" name="text" className="form-control" id="comment_text_field"  placeholder="Say something"
                onChange= {(e) => {this.setState({text:e.target.value})}}
                value = {this.state.text}
              />
            </div>
            <button id='story_submit_button' type="button submit" className="btn btn-success" onClick={(e) =>{this.props.commentStory(this.props.story._id,this.state.text , this.props.user.access_token)}}>Comment</button>
          </div>
          {this.renderComments()}
        </div>
      </div>


    </div>
  </div>);
}
}
export default connect(null,{commentStory})(CommentSection);
