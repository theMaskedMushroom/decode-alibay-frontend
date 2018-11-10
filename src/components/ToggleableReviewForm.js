import React, { Component } from 'react';
import InputForm from './InputForm';
import Reviews from './Reviews';

class ToggleableReviewForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      //product_id: this.props.product_id
    }
  }

  handleFormOpen = () => {
    this.setState({isOpen: true});
  }

  handleFormClose = () => {
    this.setState({isOpen: false});
  }

  handleFormSubmit = () => {
    this.setState({isOpen: false});
  }

  render(){
    if(this.state.isOpen){
      return(
        <InputForm 
          productid={this.props.product_id}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return(<div>
        <br />
        <div><h3>Reviews:</h3></div>
       
        <Reviews productid={this.props.product_id} />
        <br />
        <button onClick={this.handleFormOpen}>add a review</button>
      </div>);
    }
  }
}

export default ToggleableReviewForm;