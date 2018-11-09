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
            productInEditor:null
        }

        // bindings
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(product)
    {
        this.setState({
            modalOpened: true,
            productInEditor: product})
    }

    closeModal()
    {
        this.setState({modalOpened:false})
    }

    render()
    {
        let bogusVendor_ID = '73a-c73-455-840';// or '5be47694df00c2187c798069'

        return <div>
        
            Item manager (editable list)

            {this.props.products.filter(function(product){ return product.vendor_id === bogusVendor_ID}).map(function(product, i, arr){
                return <EditableItem
                            key={shortId.generate()}
                            product={product}
                            openModal={this.openModal}/>
            }.bind(this))}

            <Modal 
                    visible={this.state.modalOpened}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    //onClickAway={() => this.closeModal()}
                >
                    <ItemEditor 
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