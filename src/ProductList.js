
import React, { Component } from 'react';
import Product from './Product';


/*var sellers = [{
  name: "Jack Frost",
  rating: "5 stars"
}, {
  name: "Hank Green",
  rating: "2 stars"
}, {
  name: "Donald Trump",
  rating: "6 stars"
}
];*/

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  // Get all the products from DB
  getAllProducts(){
    fetch('/', {
      method: 'GET'
    }).then(x => x.text())
    .then(res => {
      var parsed = JSON.parse(res);
      if(parsed.status){
        this.setState({products: parsed.products});
      }
    })
  }
  //componentDidMount() {
  //  this.getAllProducts();
  //}

  render(){
    this.getAllProducts();
    
    const productComponents = this.state.products.map((product, ind) => (
      <Product 
        key={'AL' + ind}
        id={product.id}
        name={product.name}
        price={product.price}
        description={product.description}        
        imageUrl={product.imageUrl}
        vendor={product.vendor_id}
      />
    ));
    
    return (
    <div>
      {productComponents}
    </div>);
  }
}

export default ProductList;