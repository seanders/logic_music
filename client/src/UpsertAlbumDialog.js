import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
  selectField: {
    marginTop: 20,
  },
  buttonLink: {
    width: 160
  }
};

const FormHelpLink = withStyles(styles)(({ children, classes, onClick }) => {
  return (<Button classes={{ root: classes.buttonLink }} color="primary" size="small" onClick={onClick}>{children}</Button>)
})

const newAlbum = { title: '', year: '', condition: 'excellent', artistId: '' }

export class UpsertAlbumDialog extends Component {
  static conditionOptions = [ 'excellent', 'ok', 'bad' ];

  static propTypes = {
    artists: PropTypes.array.isRequired,
    album: PropTypes.object,
  }

  constructor(props) {
    super(props);

    // Only set album properties once. Fire and forget so we don't pollute state upon edits.
    this.state = {
      album: { ...newAlbum },
      newArtistName: '',
      createNewArtist: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.album) return;

    this.setState({ album: nextProps.album });
  }

  // Set the form back to zero state
  resetForm = () => {
    this.setState({
      createNewArtist: false,
      album: { ...newAlbum },
      newArtistName: ''
    });
  }

  onRequestClose = () => {
    this.props.handleClose();
    this.resetForm();
  }

  handleSave = async (event) => {
    // Stop default browser save action
    event.preventDefault();

    const { onSave, handleClose } = this.props;
    const { album, newArtistName, createNewArtist } = this.state;

    const response = await onSave({...album, newArtistName, createNewArtist });

    if (response.success) {
      handleClose();
      this.resetForm();
    } else {
      // TODO: Show an error state to the user using a Snackbar
      console.error('Failed to save the album!')
    }
  }

  handleCreateNewArtist = () => {
    this.setState({ createNewArtist: true });
  }

  handleChooseExistingArtist = () => {
    this.setState({ createNewArtist: false });
  }

  handleConditionChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      album: { ...prevState.album, condition: event.target.value }
    }));
  }

  handleTitleChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      album: { ...prevState.album, title: event.target.value }
    }));
  }

  handleYearChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      album: { ...prevState.album, year: event.target.value }
    }));
  }

  handleArtistChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      album: { ...prevState.album, artistId: event.target.value }
    }));
  }

  handleNewArtistNameChange = (event) => {
    event.persist();
    this.setState((prevState) => ({ newArtistName: event.target.value }));
  };

  render() {
    const { open, album: albumProp, artists, classes } = this.props;
    const { album: { title, year, condition, artistId }, createNewArtist, newArtistName } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.onRequestClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{albumProp ? 'Update' : 'Create'} Album</DialogTitle>
        <form onSubmit={this.handleSave}>
          <DialogContent>
              <TextField
                autoFocus
                value={title}
                onChange={this.handleTitleChange}
                margin="dense"
                id="name"
                label="Album Title"
                type="text"
                fullWidth
              />
              <TextField
                value={year}
                onChange={this.handleYearChange}
                margin="dense"
                id="name"
                label="Year"
                type="number"
                fullWidth
              />

              { !createNewArtist && (
                <FormControl className={classes.selectField} aria-describedby="name-helper-text" fullWidth>
                  <InputLabel htmlFor="artistId">Artist</InputLabel>
                  <Select
                    value={artistId || ''}
                    onChange={this.handleArtistChange}
                    inputProps={{
                      id: 'artistId',
                      name: 'artistId',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {artists.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                  </Select>
                  <FormHelperText component={FormHelpLink} id="name-helper-text" onClick={this.handleCreateNewArtist}>
                    Create a new artist
                  </FormHelperText>
                </FormControl>
              )}

              { createNewArtist && (
                <FormControl fullWidth>
                  <InputLabel htmlFor="artist_name">Artist Name</InputLabel>
                  <Input
                    value={newArtistName}
                    onChange={this.handleNewArtistNameChange}
                    margin="dense"
                    id="name"
                    label="Year"
                    type="text"
                  />
                  <FormHelperText component={FormHelpLink} id="name-helper-text" onClick={this.handleChooseExistingArtist}>
                    Choose existing artist
                  </FormHelperText>
                </FormControl>
              )}

              <TextField
                select
                fullWidth
                className={classes.selectField}
                id="condition"
                name="condition"
                label="Condition"
                value={condition || 'ok'}
                onChange={this.handleConditionChange}
              >
                {this.constructor.conditionOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onRequestClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" variant="raised" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UpsertAlbumDialog);
