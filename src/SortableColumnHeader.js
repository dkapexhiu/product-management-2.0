import React from 'react';
import './SortableColumnHeader.css';

class SortableColumnHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }
  handleSort(e) {
    this.props.onSort(this.props.column, e.target.name);
  }
  render() {
    let currentSort = this.props.currentSort.column === this.props.column ? this.props.currentSort.direction : false;
    return(
      <th>
        {this.props.column}
        <button
          onClick={this.handleSort}
          className={currentSort === 'asc' ? 'btn btn-primary' : 'btn btn-default'}
          name='asc'
        >&#x25B2;</button>
        <button
          onClick={this.handleSort}
          className={currentSort === 'desc' ? 'btn btn-primary' : 'btn btn-default'}
          name='desc'
        >&#x25BC;</button>
      </th>
    );
  }
}

export default SortableColumnHeader;