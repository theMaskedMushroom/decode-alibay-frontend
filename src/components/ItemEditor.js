import React, {Component} from 'react';
import {connect} from 'react-redux';

class ItemEditor extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            newName: '',
            newPrice:0,
            newDescription:''
        }

        // Flag so we only assign values to the state once
        this.stateValuesAssigned = false;

        // Bindings
        this.onNameChange = this.onNameChange.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if(!prevProps.product && this.props.product)
        {
            this.setState({
                newName: this.props.product.pname,
                newPrice: parseInt(this.props.product.price),
                newDescription: this.props.product.description
            })
        }
        else if (this.props.product._id !== prevProps.product._id)
        {
            this.setState({
                newName: this.props.product.pname,
                newPrice: parseInt(this.props.product.price),
                newDescription: this.props.product.description
            })
        }
    }

    onNameChange(evt)
    {
        this.setState({newName: evt.target.value});
    }

    render()
    {
        return  <form onSubmit={this.onSubmit}>
                    <label>Product Name:</label><input type='text' onChange={this.onNameChange} value={this.state.newName} />
                </form>
    }
}

export default connect()(ItemEditor)