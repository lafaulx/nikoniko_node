import React from 'react';
import moment from 'moment';

import styles from './Stats.less';

import API from '../api/API';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    }
  }

  componentDidMount() {
    API.getStats().then((response) => {
      this.setState({
        stats: response.data
      })
    });
  }

  render() {
    return (
      <div className='Stats'>
        <h1>Stats</h1>
        <div className='Stats-container'>
          {this.state.stats.map(this.renderStat)}
        </div>
      </div>
    );
  }

  renderStat({year, month, day, good, bad, neutral}) {
    return (
      <div className='Stat' key={`${year}${month}${day}`}>
        <h2>{moment({year: year, month: month, day: day}).format('MMMM Do YYYY')}</h2>
        <div>
          <h3>😀</h3>
          <span>{good}</span>
        </div>
        <div>
          <h3>😐</h3>
          <span>{neutral}</span>
        </div>
        <div>
          <h3>😢</h3>
          <span>{bad}</span>
        </div>
      </div>
    )
  }
}