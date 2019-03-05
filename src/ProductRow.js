import React from 'react';
import FB from './firebase.config';
import './ProductRow.css';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: this.props.product.name,
      newPrice: this.props.product.price,
      newCategory: this.props.product.category,
      newDate: this.props.product.date,
      newQuantity: this.props.product.quantity,
      newDescription: this.props.product.description,
      newImage: this.props.product.image,
      isUploading: false,
      progress: 0,
      newimageURL: this.props.product.imageURL
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  toggleState = () => {
    this.setState((pstate) => ({
      isEditing: !pstate.isEditing
    }))
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  
  handleUploadSuccess = filename => {
    this.setState({ ...this.state, newImage: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ ...this.state, newimageURL: url }))
  }

  updateProduct = (e) => {
    e.preventDefault();
    const { id } = this.props.product;
    const { newName, newCategory, newPrice, newDate, newQuantity, newDescription, newImage, newimageURL } = this.state;
    const db = FB.database();
    return db
      .ref("products")
      .child(id)
      .update({
        name: newName,
        category: newCategory,
        price: newPrice,
        date: newDate,
        quantity: newQuantity,
        description: newDescription,
        image: newImage,
        imageURL: newimageURL
      })
      .then(res => {
        this.toggleState()
        return {};
      })
      .catch(error => {
        return {
          errorCode: error.code,
          errorMessage: error.message
        };
      });
  };

handleNameChange = (e) => {
  this.setState({
    newName: e.target.value
  })
}

handlePriceChange = (event) => {
  this.setState({
    newPrice: event.target.value
  })
}

handleCategoryChange = (event) => {
  this.setState({
    newCategory: event.target.value
  })
}

handleDateChange = (event) => {
  this.setState({
    newDate: event.target.value
  })
}

handleQuantityChange = (event) => {
  this.setState({
    newQuantity: event.target.value
  })
}

handleDescriptionChange = (event) => {
  this.setState({
    newDescription: event.target.value
  })
}

handleImageChange = (event) => {
  this.setState({
    newImage: event.target.value
  })
}

toggleAddForm = () => {
  this.setState((pstate) => ({
    showingAddForm: !pstate.showingAddForm
  }))
}

destroy = () => {
  this.props.onDestroy(this.props.product.id);
}


renderForm = () => (
  <div className="panel panel-success">
  <div className="panel-heading">
    <h3 className="panel-title">Update the product</h3>
  </div>
  <div className="panel-body">
  <form onSubmit={this.updateProduct}>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" defaultValue={this.props.product.name} onChange={this.handleNameChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input type="number" defaultValue={this.props.product.price} onChange={this.handlePriceChange} />
    </div>
    <div className="form-group">
      <label htmlFor="category">Category</label>
      <input type="text" defaultValue={this.props.product.category} onChange={this.handleCategoryChange} />
    </div>
    <div className="form-group">
      <label htmlFor="date">Date</label>
      <input type="date" defaultValue={this.props.product.date} onChange={this.handleDateChange} />
    </div>
    <div className="form-group">
      <label htmlFor="quantity">Quantity</label>
      <input type="number" defaultValue={this.props.product.quantity} onChange={this.handleQuantityChange} />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input type="text" defaultValue={this.props.product.description} onChange={this.handleDescriptionChange} />
    </div>
    <label>Image</label>
    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
    {this.state.imageURL && <img src={this.state.imageURL} alt="" />}
    <FileUploader
      accept="image/*"
      name="image"
      storageRef={firebase.storage().ref("products")}
      onUploadStart={this.handleUploadStart}
      onUploadError={this.handleUploadError}
      onUploadSuccess={this.handleUploadSuccess}
      onProgress={this.handleProgress}
    />
    <button type="submit" className="btn btn-primary">Update</button>
  </form>
  </div>
  </div>
);

renderItem = () => (
  <tr>
    <td>{this.props.product.id}</td>
    <td>{this.props.product.name}</td>
    <td>${this.props.product.price}</td>
    <td>{this.props.product.category}</td>
    <td>{this.props.product.date}</td>
    <td>{this.props.product.quantity}</td>
    <td>{this.props.product.description}</td>
    <td><img src={this.props.product.imageURL} id="image" alt="" /></td>
    <td><button onClick={this.destroy} className="btn btn-primary">Delete</button></td>
    <td><button onClick={this.toggleState} className="btn btn-primary">Edit</button></td>
  </tr>
);

render() {
  const { isEditing } = this.state;
  return (
    isEditing ? this.renderForm() : this.renderItem()
  );
}
}

export default ProductRow;