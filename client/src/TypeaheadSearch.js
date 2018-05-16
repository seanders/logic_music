import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import _debounce from 'lodash/debounce';
import musicClient from './services/musicClient';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;

  const isSelected = (selectedItem || '') === suggestion.id;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        height: 75,
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      <img alt="album art" style={{ height: '100%', marginRight: 10 }} src={suggestion.thumb}></img>
      <div>
        <div>{suggestion.title}</div>
        <div>{suggestion.year}</div>
      </div>
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: 'white',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

class AlbumSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };
  }

  handleInputValueChange = async (inputValue) => {
    // Guard against 0 input
    if (!inputValue.length) return;

    const response = await musicClient.albumSearch(inputValue);

    if (response.success) {
      // Heuristic to get better albums by filtering for those that more than 100 people have
      const popularAlbums = response.data.results.filter(a => a.barcode.length > 0 && a.community.have > 100);

      this.setState({ suggestions: popularAlbums });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  handleSelect = (item) => {
    this.props.onSelect(item);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Downshift
          onInputValueChange={_debounce(this.handleInputValueChange, 500)}
          onSelect={this.handleSelect}
          itemToString={() => ''}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                label: 'Search for artist',
                classes,
                InputProps: getInputProps({
                  placeholder: 'Nujabes, The Smiths, etc.',
                  id: 'album-search',
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.state.suggestions.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

AlbumSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumSearch);
