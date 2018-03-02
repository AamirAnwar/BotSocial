import React, {Component} from 'react';
import UserSnippet from './UserSnippet';
import StoryReactionsSnippet from './StoryReactionsSnippet';

class StoryCard extends Component {
  renderStoryMedia(story) {
    if (story.video_url) {
      const video_url = `http://localhost:5000${story.video_url}`;
      return (
        <video
          id="my-player"
          className="video-js story_video"
          preload="auto"
          autoPlay
          muted
          data-setup='{}'>
          <source src={video_url} type="video/mp4"></source>
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="http://videojs.com/html5-video-support/">
            supports HTML5 video
          </a>
        </p>
      </video>
    );
  }
  else if (story.image_url) {
    return <div style={{'backgroundImage': `url(${story.image_url})`}} className="story_image"></div>
  }
  return <div></div>

}

render() {
  const {story} = this.props;
  // console.log("Received story!" + JSON.stringify(story, null ,2));
  if (!story) {
    return <div></div>;
  }
  return (
    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        <UserSnippet story={story} />

        <p className="card-text mb-auto">
          {this.props.story.text}
        </p>
        {this.renderStoryMedia(story)}
        <StoryReactionsSnippet story={story} user={this.props.user}/>
      </div>

    </div>
  );
}
}

export default StoryCard;
