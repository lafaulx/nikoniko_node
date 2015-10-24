import React from 'react';

import styles from './App.less';

import MoodChoice from './MoodChoice';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <h1>How was your day?</h1>
        <MoodChoice />
      </div>
    );
  }
}