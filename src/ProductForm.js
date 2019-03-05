import React, { Component } from 'react';
import FB from './firebase.config';
import './ProductForm.css';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.add = this.add.bind(this);
    this.state = {
      product: {
        id: '',
        category: '',
        price: '',
        stocked: false,
        name: '',
        date: '',
        quantity: '',
        description: '',
        image: "",
    	isUploading: false,
    	progress: 0,
    	imageURL: ""
      },
      errors: {},
      showingAddForm: false
    };
  }

  getGuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const product = Object.assign({}, this.state.product);
    product[name] = value;
    
    this.setState(state => ({ ...state, product }));
  }

  handleSave = (e) => {
    e.preventDefault();
    const db = FB.database();
    const rootRef = db.ref().child('products');
    rootRef
    .push(this.state.product)
    .then(res => {
      this.toggleAddForm()
      return {};
    });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  
  handleUploadSuccess = filename => {
    this.setState({ product:{...this.state.product, image: filename, progress: 100, isUploading: false }});
    firebase
      .storage()
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({product:{...this.state.product, imageURL: url}}))
  }

  toggleAddForm = () => {
    this.setState((pstate) => ({
      showingAddForm: !pstate.showingAddForm
    }))
  }

  add(){
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Enter a new product</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name" placeholder="Insert Name" onChange={this.handleChange} value={this.state.product.name} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input className="form-control" type="text" name="category" placeholder="Insert Category" onChange={this.handleChange} value={this.state.product.category} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <div className="input-group">
                <input className="form-control" type="number" name="price" placeholder="Insert Price" onChange={this.handleChange} value={this.state.product.price} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input className="form-control" type="date" name="date" placeholder="Insert Date" onChange={this.handleChange} value={this.state.product.date} />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input className="form-control" type="number" name="quantity" placeholder="Insert Quantity" onChange={this.handleChange} value={this.state.product.quantity} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" name="description" cols="3" rows="5" placeholder="Insert Description" onChange={this.handleChange} value={this.state.product.description}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="checkbox">In stock?</label>&nbsp; 
              <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked} />
            </div>
            <label>Image</label>
          	{this.state.product.isUploading && <p>Progress: {this.state.product.progress}</p>}
          	{this.state.product.imageURL && <img src={this.state.product.imageURL} alt=""/>}
          	<FileUploader
            	accept="image/*"
            	name="image"
              randomizeFilename
            	storageRef={firebase.storage().ref("products")}
            	onUploadStart={this.handleUploadStart}
            	onUploadError={this.handleUploadError}
            	onUploadSuccess={this.handleUploadSuccess}
            	onProgress={this.handleProgress}
          	/>
            <button type="submit" className="btn btn-primary" id="addBtn" onClick={this.handleSave}>Save</button>
          </form>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div>
      <div className="renderedButton">
        <button type="button" className="btn btn-primary" onClick={this.toggleAddForm}>Add new product</button>
      </div>
        { this.state.showingAddForm && this.add() }
      </div>
    );
  }
}

export default ProductForm;
