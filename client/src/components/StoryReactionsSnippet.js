import React, {Component} from 'react';
import CommentSection from './CommentSection';
import {connect} from 'react-redux';
import {likeStory, dislikeStory} from '../actions';

class StoryReactionsSnippet extends Component {

  render() {
    const {story} = this.props;
    const {user} = this.props;
    if (!story || !user) {
      return <div></div>
    }
    return (
      <div className="story_reactions">
        <span>

          <button id={`like_${story._id}`} className="btn btn-dark like_button" name="button" onClick={(e) => { this.props.likeStory(story._id, user.access_token)}}>
            <span className='like_count'>{story.likes.length}</span>

            <i className="fa fa-thumbs-up"></i>
          </button>

          {/* <!-- Dislikes button --> */}
          <button className="btn btn-dark dislike_button" name="button" id={`dislike_${story._id}`} onClick={(e) => { this.props.dislikeStory(story._id, user.access_token)}}>
            <span className='dislike_count'>{story.dislikes.length}</span>
            <i className="fa fa-thumbs-down"></i>
          </button>

          {/* <!-- Comments button --> */}
          <button className="btn btn-dark comments_button" data-toggle="modal" data-target={`#modal_${story._id}`} name="button" id={`comments_button_${story._id}`}>
            <span className='comments_count'>{story.comments.length}</span>
            <i className="fa fa-comments"></i>
          </button>

          {/* <!-- Comments Modal --> */}
          <div id={`modal_${story._id}`} className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" id={`modal_dialog_${story._id}`}>
              <div className="modal-content">
                  <CommentSection story={story} user={user}/>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }

  componentWillUpdate() {
    console.log("Component will update called");
    window.clearOverlay(`modal_${this.props.story._id}`);
  }
}
export default connect(null, {likeStory, dislikeStory})(StoryReactionsSnippet);
