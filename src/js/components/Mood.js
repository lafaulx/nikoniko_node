import React from 'react';

import styles from './Mood.less';

import MoodChoice from './MoodChoice';

export default class Mood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMoodChosen: false,
      mood: null
    }

    this.handleMoodChange = this.handleMoodChange.bind(this);
  }

  render() {
    return (
      <div className='Mood'>
        {!this.state.isMoodChosen &&
          <MoodChoice onMoodChange={this.handleMoodChange} />
        }

        {this.state.isMoodChosen &&
          <div>
            <h1>Submitted!</h1>
            <h2>Check out the <a href='/stats'>stats</a> if you want to.</h2>
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