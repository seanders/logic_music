import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  tableCellBody: {
    display: 'flex',
    alignItems: 'center',
  }
};

export class AlbumsList extends Component {
  static propTypes = {
    albums: PropTypes.array.isRequired,
    onAlbumEdit: PropTypes.func.isRequired,
    onAlbumDestroy: PropTypes.func.isRequired,
    highlightedYear: PropTypes.string,
  }

  renderRow = ({ id, title, year, condition, imageUrl }) => {
    const { onAlbumEdit, onAlbumDestroy, highlightedYear, classes } = this.props;

    return (
      <TableRow key={id} selected={parseInt(highlightedYear, 10) === year}>
        <TableCell>
          <div className={classes.tableCellBody}>
            {
              imageUrl &&
              imageUrl.length &&
              <img alt="album art" src={imageUrl} style={{ width: 50, height: 50, marginRight: 20 }}></img>
            }
            {title}
          </div>
        </TableCell>
        <TableCell>{year}</TableCell>
        <TableCell>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>{condition}</div>
            <div>
              <IconButton>
                <EditIcon onClick={() => onAlbumEdit(id)} />
              </IconButton>
              <IconButton>
                <DeleteIcon onClick={() => onAlbumDestroy(id)}/>
              </IconButton>
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const { albums } = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{albums.map(this.renderRow)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(AlbumsList);
