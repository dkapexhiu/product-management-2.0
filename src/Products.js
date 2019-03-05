import React, { Component } from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
import ProductForm from './ProductForm.js';
import clone from 'lodash/clone';
import FB from './firebase.config';
import './Products.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: {},
      toggleAddForm: false
    };
  }

  componentWillMount() {
    const db  = FB.database();
    const rootRef = db.ref().child('products');
    rootRef.on('value', snap => {
      this.setState(state => ({ ...state, products: snap.val() }));
    });
  }

  handleFilter = (filterInput) => {
    this.setState(filterInput);
  }

  saveProduct = (product) => {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState((prevState) => {
      let products = prevState.products;
      products[product.id] = product;
      return { products };
    });
  }

  editProduct = (e, id, newName, newPrice, newCategory, newDate, newQuantity, newDescription, newImage ) => {
    e.preventDefault();
    this.setState((pstate) => {
      const copiedProducts = clone(pstate.products);
      copiedProducts[id]['name'] = newName;
      copiedProducts[id]['price'] = newPrice;
      copiedProducts[id]['category'] = newCategory;
      copiedProducts[id]['date'] = newDate;
      copiedProducts[id]['quantity'] = newQuantity;
      copiedProducts[id]['description'] = newDescription;
      copiedProducts[id]['img'] = newImage;
      return {
        products: copiedProducts
      }
    })
  }

  handleDestroy = (productId) => {
    const products = Object.assign({}, this.state.products);
    const product = Object.keys(this.state.products).filter(product => this.state.products[product].id === productId);
    delete products[product[0]];
    const db  = FB.database();
    db.ref().child('products').child(product[0]).remove();
    this.setState(state => ({ ...state, products }));
  }

  toggleShowForm = () => {
    this.setState(state => ({
      ...state,
      toggleAddForm: !state.toggleAddForm
    }))
  }

  render() {
    return (
      <div className="container" style={{backgroundColor:'blueviolet'}}>
        <Filters
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilter={this.handleFilter}
        ></Filters>
        <hr />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onDestroy={this.handleDestroy}
          editProduct={this.editProduct}
        ></ProductTable>
        <hr />
        <button type="button" className="btn btn-primary" onClick={this.toggleShowForm}>Add ...</button>
        <hr />
        {this.state.toggleAddForm && <ProductForm onSave={this.saveProduct} />}
      </div>
    );
  }
}

export default Products;