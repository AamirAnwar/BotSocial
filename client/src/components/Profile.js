import React from 'react';
import UserDetailCard from './UserDetailCard';
import StoryList from './StoryList';

export default () => {
  return (
  <div>
      <div className='container' id="profile_container">
        <div className="row">
          <div className='col-md-2 sidebar'>
            <UserDetailCard />
          </div>

          <div className='col-md-10 story_list'>
            <StoryList />
          </div>
        </div>
      </div>
    </div>
  );
}
