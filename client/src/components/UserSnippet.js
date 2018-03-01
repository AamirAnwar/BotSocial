import React, {Component} from 'react';

class UserSnippet extends Component {
  render() {
    return (
      <div>
        <h4 className="mb-0">
          <div style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}} className="profile_image">
        </div>
        <a className="username_label" href={"/user/123"}>AamirAnwar</a>
      </h4>

      <div className="story_date">
        <p>23rd January 2018</p>
      </div>
    </div>
  );
}
}

export default UserSnippet;
