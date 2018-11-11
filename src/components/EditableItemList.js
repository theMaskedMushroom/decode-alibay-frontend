import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditableItem from './EditableItem';
import Modal from 'react-awesome-modal';
import shortId from 'shortid';
import ItemEditor from './ItemEditor';

class EditableItemList extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            modalOpened:false,
            productInEditor:null,
            modalTitle:'',
            modalAction:''
        }

        // bindings
        this.addItem = this.addItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    addItem(evt)
    {
        // Create a blank product object
        let blankProduct = {
            product_id:'',
            imageUrl:'pictures/no-image-available.png',
            pname:'',
            description:'',
            price:0,
        }

        // Open the modal for adding product
        this.openModal('Add new item', 'add', blankProduct)
    }

    openModal(title, editAction, product)
    {
        this.setState({
            modalOpened: true,
            productInEditor: product,
            modalTitle: title,
            modalAction: editAction
        })
    }

    closeModal()
    {
        this.setState({modalOpened:false})
    }

    render()
    {
        let bogusVendor_ID = '73ac73455840';// or '5be47694df00c2187c798069'

        return <div>
        
            <h2>Manage your items for sale</h2>

            
                <button onClick={this.addItem} className='btn btn-primary'>Add an item +</button>
                {this.props.products.filter(function(product){ return product.vendor_id === bogusVendor_ID}).map(function(product, i, arr){
                    return <EditableItem
                                key={shortId.generate()}
                                product={product}
                                openModal={this.openModal}/>
                }.bind(this))}
            

            <Modal 
                    visible={this.state.modalOpened}
                    //width="400"
                    //height="300"
                    effect="fadeInDown"
                    //onClickAway={() => this.closeModal()}
                >
                    <ItemEditor 
                                title={this.state.modalTitle}
                                action={this.state.modalAction}
                                product={this.state.productInEditor }
                                closeModal={this.closeModal} />
                </Modal>

        </div>
    }
}

function mapStateToProps(state)
{
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(EditableItemList);