import React, {Component} from 'react';
import StoryCard from './StoryCard';
import {connect} from 'react-redux';
import _ from 'lodash';

class StoryList extends Component {
	renderStories() {
		return _.map(this.props.stories, (story,i) => {
			return <StoryCard user={this.props.user} key={this.props.stories[i]._id} story={this.props.stories[i]}/>
		});
	}

	render() {
		return (
			<div>
				{this.renderStories()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {stories:state.stories,user:state.user};
}

export default connect(mapStateToProps)(StoryList);
