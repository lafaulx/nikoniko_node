import React from 'react';

import styles from './App.less';

import MoodChoice from './MoodChoice';

export default class App extends React.Component {
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
      <div className='App'>
        {!this.state.isMoodChosen &&
          <MoodChoice onMoodChange={this.handleMoodChange} />
        }

        {this.state.isMoodChosen &&
          <span>Good for you!</span>
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