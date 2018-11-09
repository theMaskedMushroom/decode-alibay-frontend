import React, { Component } from 'react';
import Item from './Item';
import {connect} from 'react-redux';

class ItemList extends Component{
  /*constructor(props){
    super(props);
    this.state = {
      
    }
  }*/

  render(){
    
    const productComponents = this.props.products.map((product, ind) => (
      <Item 
        key={'AL' + ind}
        id={product.product_id}
        name={product.pname}
        price={product.price}
        description={product.description}        
        imageUrl={product.imageUrl}
        vendor={product.name}
      />
    ));
    
    return (
    <div>
      {productComponents}
    </div>);
  }
}

function mapStateToProps(state)
{
  return {products: state.products}
}

export default connect(mapStateToProps)(ItemList);