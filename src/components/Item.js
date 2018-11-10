import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Item extends Component{
  /*constructor(props){
    super(props);

    this.getUsers = this.getUsers.bind(this);
  }*/

  render(){
    var users = this.props.myusers;
    var user = users.filter(obj => {
      return obj.id === this.props.vendor_id;
    });
    
    var vendor = user.map(obj => {
      return obj.name;
    });
    //debugger
    //<div>{this.props.id}</div>
    return(<div className="card center">
      <div>
        <img height="100px" src={this.props.imageUrl} alt="product_picture" />
      </div>
      
      <div>
        <Link to={"/item/" + this.props.id}>{this.props.name}</Link>
      </div>
      <div>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })
        .format(this.props.price)}
      </div>
      <div>{this.props.description}</div>
      
      <div>sold by: 
        <Link to={"/seller/" + this.props.vendor_id}>{vendor}</Link>
      </div>
    </div>);
  }
}

function mapStateToProps(state)
{
  return {
    products: state.products,
    myusers: state.users,
    myreviews: state.reviews
  }
}

export default connect(mapStateToProps)(Item);