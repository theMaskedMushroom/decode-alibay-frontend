import React, { Component } from 'react';
import {connect} from 'react-redux';

class EditableItem extends Component
{
    constructor(props)
    {
        super(props);

        this.setEditMode = this.setEditMode.bind(this);
        this.setDeleteMode = this.setDeleteMode.bind(this);
    }

    setEditMode(evt)
    {
        // transition to modal view for updating
        this.props.openModal('Update item', 'update', this.props.product);
    }

    setDeleteMode(evt)
    {
        // Transition to modal view for deleting
        this.props.openModal('Delete item', 'delete', this.props.product);
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

                <div>
                    <button onClick={this.setEditMode} className='btn btn-primary'>Update</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.setDeleteMode} className='btn btn-danger'>Delete</button>
                </div>
            </div>
        );
    }
}


export default connect()(EditableItem);