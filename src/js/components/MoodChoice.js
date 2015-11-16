import React from 'react';

import styles from './MoodChoice.less';

import API from '../api/API';
import { getDateObj } from '../utils/dateUtils';

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
          <button onClick={() => this.handleClick('magical')}><img src='/assets/img/magical.png'/></button>
          <button onClick={() => this.handleClick('good')}><img src='/assets/img/good.png'/></button>
          <button onClick={() => this.handleClick('neutral')}><img src='/assets/img/meh.png'/></button>
          <button onClick={() => this.handleClick('bad')}><img src='/assets/img/bad.png'/></button>
          <button onClick={() => this.handleClick('angry')}><img src='/assets/img/flip.png'/></button>
        </div>
      </div>
    );
  }

  handleClick(mood) {
    API.submitMood(mood).then(() => {
      let nowStr = JSON.stringify(getDateObj(new Date()));
      window.localStorage.setItem('moodSubmissionDate', nowStr);
      this.props.onMoodChange(mood);
    });
  }
}
MoodChoice.propTypes = {
  onMoodChange: React.PropTypes.func.isRequired
}