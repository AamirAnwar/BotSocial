import React, {Component} from 'react';
import StoryCard from './StoryCard';
class StoryList extends Component {
	render() {
		return (
			<div className="row mb-1">
				<div className="col-md-12">
					<StoryCard />
				</div>
			</div>
		);
	}
}

export default StoryList;
