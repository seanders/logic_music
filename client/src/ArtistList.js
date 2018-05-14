import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, MenuItem, ListItemText } from '@material-ui/core';

export default class ArtistList extends Component {
  static propTypes = {
    artists: PropTypes.array,
    selectedArtistId: PropTypes.number,
  }

  handleArtistClick(id) {
    this.props.onArtistClick(id)
  }

  render() {
    const { artists, selectedArtistId } = this.props;

    return (
      <List>
        {artists.map(({ id, name }) => (
          <MenuItem key={id} button selected={selectedArtistId === id} onClick={() => this.handleArtistClick(id)}>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </List>
    );
  }
}
