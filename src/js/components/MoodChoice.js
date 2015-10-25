import React from 'react';

import styles from './MoodChoice.less';

import API from '../api/API';

export default class MoodChoice extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className='MoodChoice'>
        <h1>How was your day?</h1>
        <div>
          <button onClick={() => this.handleClick('good')}>😀</button>
          <button onClick={() => this.handleClick('neutral')}>😐</button>
          <button onClick={() => this.handleClick('bad')}>😢</button>
        </div>
      </div>
    );
  }

  handleClick(mood) {
    API.submitMood(mood).then(() => {
      this.props.onMoodChange(mood);
    });
  }
}
MoodChoice.propTypes = {
  onMoodChange: React.PropTypes.func.isRequired
}