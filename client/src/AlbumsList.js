import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default class AlbumsList extends Component {
  static propTypes = {
    albums: PropTypes.array.isRequired,
    onAlbumEdit: PropTypes.func.isRequired,
    onAlbumDestroy: PropTypes.func.isRequired,
  }

  renderRow = ({ id, title, year, condition}) => {
    const { onAlbumEdit, onAlbumDestroy } = this.props;

    return (
      <TableRow key={id}>
        <TableCell>
          {title}
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Condition</TableCell>
          </TableRow>
          {albums.map(this.renderRow)}
        </TableHead>
      </Table>
    );
  }
}
