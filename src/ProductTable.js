import React from 'react';
import ProductRow from './ProductRow.js';
import SortableColumnHeader from './SortableColumnHeader.js';
import { Table, Thead, Tbody, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './ProductTable.css';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        column: 'name',
        direction: 'desc'
      }
    };
  }

  isString = (obj) => {
    if (typeof obj === 'string') {
      return obj.toLowerCase();
    }
    return obj;
  }

  sortByKeyAndOrder = (objectA, objectB) => {
    const isDesc = this.state.sort.direction === 'desc' ? 1 : -1;
    const [a, b] = [this.isString(objectA[this.state.sort.column]), this.isString(objectB[this.state.sort.column])];
    if (a > b) {
      return 1 * isDesc;
    }
    if (a < b) {
      return -1 * isDesc;
    }
    return 0;
  }

  sortProducts = () => Object.keys(this.props.products).map((pid) => {const product = this.props.products[pid]; return {...product, id: pid }}).sort(this.sortByKeyAndOrder);

  handleDestroy = (id) => {
    this.props.onDestroy(id);
  }

  handleSort = (column, direction) => {
    this.setState({
      sort: {
        column: column,
        direction: direction
      }
    });
  }

  render() {
    var rows = [];
    this.sortProducts().forEach((product) => {
      rows.push(<ProductRow product={product} key={product.id} editProduct={this.props.editProduct} onDestroy={this.handleDestroy}></ProductRow>);
    });

    return (
      <div>
        <Table className="table">
          <Thead>
            <Tr>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="id"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="name"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="price"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="category"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="date"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="quantity"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="description"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="image"
              ></SortableColumnHeader>
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </div>
    );
  }
}

export default ProductTable;