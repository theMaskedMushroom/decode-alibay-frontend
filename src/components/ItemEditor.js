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
        this.onSubmit = this.onSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
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

    cancel(evt)
    {
        evt.preventDefault();

        // TODO: clean up the fields before closing


        this.props.closeModal();
    }

    onSubmit(evt)
    {
        evt.preventDefault();

        // Sanitize the data and give feedback where necessary (No empty fields, and no price=0)
        // TODO this.validateData()=> bool early return

        // Do the fetch

        // close the modal
        if (window.confirm("Update this item?"))
        {
            this.props.closeModal();
        }
    }

    onNameChange(evt)
    {
        this.setState({newName: evt.target.value});
    }

    onDescriptionChange(evt)
    {
        this.setState({newDescription: evt.target.value})
    }

    onPriceChange(evt)
    {
        this.setState({newPrice: evt.target.value})
    }

    render()
    {
        return  <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Product Name:</label><input type='text' onChange={this.onNameChange} value={this.state.newName} />
                    </div>

                    <div>
                        <label>Description:</label><textarea onChange={this.onDescriptionChange} value={this.state.newDescription} />
                    </div>

                    <div>
                        <label>Price:</label><input type='number' onChange={this.onPriceChange} value={this.state.newPrice} />
                    </div>

                    <button onClick={this.cancel}>Cancel</button>

                    <input type='submit' value='Update' />
                </form>
    }
}

export default connect()(ItemEditor)