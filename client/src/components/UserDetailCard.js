import React, {Component} from "react";

class UserDetailCard extends Component {
  render() {
    return (
      <div className="card">
        <div id="user_detail_snippet">
          <form ref='uploadForm' id="uploadForm" action="/user/image" method="post" encType="multipart/form-data">
          <input type="file" id="file_input" name="image" accept="image/*">
        </input>
      </form>
      <div id="profile_image_container" style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}}></div>
      <p id="username_text"><strong>AamirAnwar</strong></p>
    </div>
    <p>Joined 23rd January 2018</p>
  </div>
);
}
}

export default UserDetailCard;
