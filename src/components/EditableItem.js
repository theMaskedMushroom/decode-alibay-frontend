import React, { Component } from 'react';
import {connect} from 'react-redux';

class EditableItem extends Component
{
    constructor(props)
    {
        super(props);

        this.setEditMode = this.setEditMode.bind(this);
    }

    setEditMode(evt)
    {
        // transition to modal view
        this.props.openModal(this.props.product);
    }

    render()
    {
        return (
            <div className="card center">
                <div>
                    <img height="100px" src={this.props.product.imageUrl} alt="product_picture" />
                </div>
                <div>{this.props.product.pname}</div>
                <div>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' })
                    .format(this.props.product.price)}
                </div>
                <div>{this.props.product.description}</div>
                <button onClick={this.setEditMode}>Edit</button>
            </div>
        );
    }
}


export default connect()(EditableItem);