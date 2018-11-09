import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class Item extends Component{

  render(){
    return(<div className="card center">
      <div>
        <img height="100px" src={this.props.imageUrl} alt="product_picture" />
      </div>
      <div>{this.props.id}</div>
      <div>{this.props.name}</div>
      <div>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })
        .format(this.props.price)}
      </div>
      <div>{this.props.description}</div>
      
      <div>sold by: {this.props.vendor}</div>
    </div>);
  }
}

export default Item;