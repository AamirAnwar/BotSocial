import React from 'react';
import StoryList from './StoryList';
import StoryForm from './StoryForm';

export default () => {
  return (
    <div className="container">
      <StoryForm />
        <StoryList />
      </div>
  );
}
