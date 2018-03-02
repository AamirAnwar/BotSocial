import React, {Component} from 'react';

class UserSnippet extends Component {
  render() {
    if (!this.props.story) {
      return <div></div>
    }

    return (
      <div>
        <h4 className="mb-0">
          <div style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}} className="profile_image">
        </div>
        <a className="username_label">{this.props.story.author.username}</a>
      </h4>

      <div className="story_date">
        <p>{this.props.story.date}</p>
      </div>
    </div>
  );
}
}

export default UserSnippet;
