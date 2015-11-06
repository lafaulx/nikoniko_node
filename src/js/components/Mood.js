import React from 'react';

import styles from './Mood.less';

import MoodChoice from './MoodChoice';
import { getDateObj } from '../utils/dateUtils';


export default class Mood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMoodChosen: false,
      mood: null
    }

    this.handleMoodChange = this.handleMoodChange.bind(this);
  }

  componentDidMount() {
    let moodSubmissionDateStr = window.localStorage.getItem('moodSubmissionDate');

    if (!moodSubmissionDateStr) {
      return;
    }

    let today = getDateObj(new Date());
    let moodSubmission = JSON.parse(moodSubmissionDateStr);

    if (today.y === moodSubmission.y && today.m === moodSubmission.m && today.d === moodSubmission.d) {
      this.setState({
        isMoodChosen: true
      });
    }
  }

  render() {
    return (
      <div className='Mood'>
        {!this.state.isMoodChosen &&
          <MoodChoice onMoodChange={this.handleMoodChange} />
        }

        {this.state.isMoodChosen &&
          <div>
            <h1>{this.state.mood ? 'Submitted!' : 'You\'ve already shared your mood today.'}</h1>
          </div>
        }
      </div>
    );
  }

  handleMoodChange(mood) {
    this.setState({
      isMoodChosen: true,
      mood: mood
    });
  }
}
