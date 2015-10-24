import React from 'react';

import styles from './MoodChoice.less';

export default class MoodChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MoodChoice'>
        <button>😀</button>
        <button>😐</button>
        <button>😢</button>
      </div>
    );
  }
}