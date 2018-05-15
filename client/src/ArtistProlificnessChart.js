import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';

export default class ArtistProlificnessChart extends Component {
  static propTypes = {
    albums: PropTypes.array,
    onBarClick: PropTypes.func,
    artistId: PropTypes.number,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistId !== this.props.artistId) {
      this.setState({ activeIndex: null })
    }
  }

  handleBarClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });

    this.props.onBarClick(data);
  }

  render() {
    const { albums } = this.props;
    const { activeIndex } = this.state;

    const albumCountByYear = albums.reduce((result, album) => {
      result[album.year] = (result[album.year] || 0) + 1
      return result;
    }, {});

    const data = Object.entries(albumCountByYear).map(([year, count], index) => ({ year, count, label: count }))

    return (
      <BarChart width={300} height={300} data={data}>
        <XAxis dataKey="year"/>
        <YAxis/>
        <Bar dataKey="count" fill='#8884d8' onClick={this.handleBarClick}>
          {
            data.map((entry, index) => (
              <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8' } key={`cell-${index}`}/>
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}
