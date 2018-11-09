import React, { Component } from 'react';
import { connect } from 'react-redux';

class Seller extends Component{
  constructor(props){
    super(props);

    //this.formatSeller = this.formatSeller.bind(this);
  }

  //formatSeller(){

  //}

  render(){
    var vendorid = this.props.vendor_id;
    var products = this.props.filterProducts;
    var sellers = this.props.myusers;
    var seller = sellers.filter(obj => {
      return obj.id === vendorid;
    });
   //debugger
    const renderSeller = seller.map(obj => {
      return (
        <div key={'aaa'} align="center" >
          <br />
          <div key={'sel0'}>{obj.name}</div>
          <div key={'sel1'}>{obj.address}</div>
          <div key={'sel2'}>{obj.phonenumber}</div>
          <div key={'sel3'}>{obj.email}</div>
          <hr width="50%" color="midnightblue" size="3" />
        </div>
      );
    });

    const renderProducts = products.map((obj, ind) => {
      return (
        <div key={'aaaa1'+ind} className="card center">
          <div key={'aaaa'+ind}>
            <img height="100px" src={obj.imageUrl} alt="product_picture" />
          </div>
          <div key={'bbbb'+ind}>{obj.pname}</div>
          <div key={'cccc'+ind}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })
            .format(obj.price)}
          </div>
          <div key={'dddd'+ind}>{obj.description}</div>
        </div>
      );
    })

    return (<div>
      {renderSeller}
      {renderProducts}
    </div>);
  }
}


function mapStateToProps(state){
  return { 
    products: state.products,
    myusers: state.users };
}

export default connect(mapStateToProps)(Seller);

//export default Seller;