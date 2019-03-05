import React from 'react';
import './Filters.css';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
    const name = e.target.name;

    let filterObj = {};
	filterObj[name] = value;
	this.props.onFilter( filterObj );
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon" id="search">Search</span>
            <input type="text" className="form-control" placeholder="Search..." aria-describedby="search" value={this.props.filterText} name="filterText" onChange={this.handleChange} />
          </div>
        </div>
        <div className="checkbox">
          <input id="checkFilter" type="checkbox" checked={this.props.inStockOnly} name="inStockOnly" onChange={this.handleChange} />
          <label id="stock">Only show products in stock </label>
        </div>
      </form>
    );
  }
}

export default Filters;