import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ToggleableReviewForm from './ToggleableReviewForm';
import shortId from 'shortid';

class ItemDetail extends Component{

  render(){
    var itemid = this.props.item_id;
    var products = this.props.products;
    var product = products.filter(function(obj){
      return obj.product_id === itemid;
    })
    
    var vendor_id = product.map(function(obj){
      return obj.vendor_id;
    });
    
    var users = this.props.myusers;
    var user = users.filter(function(obj){
      return obj.id === vendor_id[0];
    })
    
    var vendor = user.map(function(obj){
      return obj.name;
    });
    
    const renderProduct = product.map(function(obj, ind){
      return (
        <div key={shortId.generate()}>
          <div key={'item1'+ind}>
          <img height="100px" src={'../' + obj.imageUrl} alt="product_picture" />
          </div>
          <div key={'item2'+ind}>{obj.pname}</div>
          <div key={'item3'+ind}>
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(obj.price)}
          </div>
          <div key={'item4'+ind}>{obj.description}</div>
          <div key={'item5'+ind}>Sold by: 
            <Link to={'/seller/' + vendor_id[0]}>{vendor[0]}</Link>
          </div>
        </div>
      );
    });

    return(
      <div>
        <div className="card center">
          {renderProduct}
          <br /><br />
        </div>
        <div>
          <ToggleableReviewForm product_id={this.props.item_id} />
        </div>
      </div>
    );
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

export default connect(mapStateToProps)(ItemDetail);