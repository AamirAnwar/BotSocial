import React, {Component} from 'react';

class StoryReactionsSnippet extends Component {
  render() {
    return (

      <div className="story_reactions">
        <span>

          {/* <!-- Like button --> */}
          <button id="like_<%=stories[i]._id%>" className="btn btn-primary like_button" name="button">
            <span className='like_count'>4</span>

            <i className="fa fa-thumbs-up"></i>
          </button>

          {/* <!-- Dislikes button --> */}
          <button className="btn btn-danger dislike_button" name="button" id="dislike_<%=stories[i]._id%>">
            <span className='dislike_count'>4</span>
            <i className="fa fa-thumbs-down"></i>
          </button>

          {/* <!-- Comments button --> */}
          <button className="btn btn-dark comments_button" data-toggle="modal" data-target="#modal_<%=stories[i]._id%>" name="button" id="comments_button_<%=stories[i]._id%>">
            <span className='comments_count'>3</span>
            <i className="fa fa-comments"></i>
          </button>

          {/* <!-- Comments Modal --> */}
          <div id="modal_<%=stories[i]._id%>" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" id="modal_dialog_<%=stories[i]._id%>">
              <div className="modal-content">
                {/* <!-- Modal Content --> */}
                {/* <%- include('comment', {story:stories[i]}); %> */}
              </div>
            </div>
          </div>
        </span>
      </div>
    );

  }
}
export default StoryReactionsSnippet;
