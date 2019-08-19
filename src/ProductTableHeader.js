import React from 'react';
import './ProductTableHeader.css';
import { Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class ProductTableHeader extends React.Component {
  render() {
    return(
      <Th>
        {this.props.column}
        <button className="ProductTableHeader-current">&#x25B2;</button>
        <button>&#x25BC;</button>
      </Th>
    );
  }
}

export default ProductTableHeader;