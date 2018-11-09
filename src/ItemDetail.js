import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ItemDetail extends Component{


  render(){
    var itemid = this.props.item_id;
    var products = this.props.products;
    var product = products.filter(obj => {
      return obj.product_id === itemid;
    })
    /////////////////////////////////////////
    var vendor_id = product.map(obj => {
      return obj.vendor_id;
    });
    //debugger
    var users = this.props.myusers;
    var user = users.filter(obj => {
      return obj.id === vendor_id[0];
    })
    //debugger
    var vendor = user.map(obj => {
      return obj.name;
    });
    //debugger
    //////////////////////////////////////////
    //debugger
    const renderProduct = product.map((obj, ind) => {
      return (
        <div key={'itemp'}>
          <div key={'item1'+ind}>
          <img height="100px" src={obj.imageUrl} alt="product_picture" />
          </div>
          <div key={'item2'+ind}>{obj.pname}</div>
          <div key={'item3'+ind}>{obj.price}</div>
          <div key={'item4'+ind}>{obj.description}</div>
          <div key={'item5'+ind}>Sold by: 
            <Link to={'/seller/' + vendor_id[0]}>{vendor[0]}</Link>
          </div>
        </div>
      );
    });
    //<div key={'item5'+ind}>{obj.vendor_id}</div>
    return(<div className="card center">
      {renderProduct}
    </div>);
  }
}

function mapStateToProps(state){
  return { 
    products: state.products,
    myusers: state.users };
}

export default connect(mapStateToProps)(ItemDetail);

//export default ItemDetail;