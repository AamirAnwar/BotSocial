import React, {Component} from 'react';
import UserSnippet from './UserSnippet';
import StoryReactionsSnippet from './StoryReactionsSnippet';

class StoryCard extends Component {
  render() {
    return (

    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        <UserSnippet />

        <p className="card-text mb-auto">
          e no sense and are impossible to remember. Let's go through them one by one, but maybe you should bookmark this page too. In order to make more complex layouts, we need to discuss the position property. It has a bunch of possible values, and their names make no sense and are impossible to remember. Let's go through them one by one, but maybe you should bookmark this page too. In order to make more complex layouts, we need to discuss the position pr
        </p>

        <video
          id="my-player"
          className="video-js story_video"
          preload="auto"
          autoPlay
          muted
          data-setup='{}'>
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/">
            supports HTML5 video
          </a>
        </p>
      </video>

      {/* <!-- Story Image --> */}
      <div style={{'backgroundImage': `url(https://avatars3.githubusercontent.com/u/12379620?s=460&v=4)`}}  className="story_image">
      </div>
      <StoryReactionsSnippet />
    </div>
  </div>
);
}
}
export default StoryCard;
