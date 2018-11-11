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
            newDescription:'',
            newImageUrl:'',
            formFeedback:'',
        }

        // We'll keep track of these to assign proper form-control classNames
        this.nameValid = true;
        this.descriptionValid = true;
        this.priceValid = true;

        // We'll use this reference to reset the file input
        this.fileInputRef = React.createRef();

        // Bindings
        this.onSubmit = this.onSubmit.bind(this);
        this.processServerResponse = this.processServerResponse.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if(!prevProps.product && this.props.product)
        {
            this.reset();
        }
        else if (this.props.product.product_id !== prevProps.product.product_id)
        {
            this.reset();
        }
    }

    reset()
    {
        // Product values go back to the passed in product
        this.setState({
            newName: this.props.product.pname,
            newPrice: parseInt(this.props.product.price),
            newDescription: this.props.product.description,
            newImageUrl: this.props.product.imageUrl,
            formFeedback: ''
        });

        // and reset the file input
        this.fileInputRef.current.value = null;

        // Reset form validation flags if update or delete,
        // for add, we know the objecct is blank, so nothing is valid
        this.nameValid = this.descriptionValid = this.priceValid = this.props.action === 'update' || this.props.action === 'delete' ? true : false;
    }

    cancel(evt)
    {
        evt.preventDefault();

        // Make sure the state is reset for the case where the user just wants to start updating over
        this.reset();

        // Bye bye!
        this.props.closeModal();
    }

    onSubmit(evt)
    {
        evt.preventDefault();

        // Is the form data valid (if not, feedback and return)
        if(!this.nameValid || !this.descriptionValid || !this.priceValid || this.state.newImageUrl === "pictures/no-image-available.png")
        {
            this.setState({formFeedback:'The form contains empty fields, invlid data or no image. Please check.'});
            return;
        }

        // Depending on the type of action, fetch the proper endpoint
        switch(this.props.action)
        {
            case 'add':
                this.fetchAdd();
                break;

            case 'update':
                this.fetchUpdate();
                break;

            case 'delete':
                this.fetchDelete();
                break;

            default:
                console.log("unknown edit action... must be 'add', 'update' or 'delete'");
                break;
        }
       
    }

    fetchAdd()
    {
         // Let's create and populate the object we'll post to the backend (a FormData)
        // use append() to let the object do it's own formatting
        let formData = new FormData();

        formData.append('vendor_id', '73ac73455840');
        formData.append('pname', this.state.newName);
        formData.append('description', this.state.newDescription);
        formData.append('price', this.state.newPrice);
        formData.append('image', this.fileInputRef.current.files[0]);

        fetch('/addproduct', {
            method: 'POST',
            body: formData
        })
        .then(function(response) { return response.text()})
        .then(this.processServerResponse)
    }

    fetchUpdate()
    {
        // Let's create and populate the object we'll post to the backend (a FormData)
        // use append() to let the object do it's own formatting
        let formData = new FormData();

        formData.append('product_id', this.props.product.product_id);
        formData.append('vendor_id', '73ac73455840');
        formData.append('pname', this.state.newName);
        formData.append('description', this.state.newDescription);
        formData.append('price', this.state.newPrice);

        // Do we have a picture update? if so, also send the old picture path to be deleted
        if (this.fileInputRef.current.files.length > 0)
        {
            formData.append('image', this.fileInputRef.current.files[0]);
            formData.append('oldImage', this.props.product.imageUrl);
        }

        // Ok, do the fetch
        fetch('/updateproduct', {
            method: 'POST',
            body: formData
        })
        .then(function(response) { return response.text()})
        .then(this.processServerResponse)
    }

    fetchDelete()
    {
        fetch('/deleteproduct', {
            method: 'POST',
            body: JSON.stringify({
                product_id:this.props.product.product_id,
                oldImage: this.props.product.imageUrl
            })
        })
        .then(function(response) { return response.text()})
        .then(this.processServerResponse)
    }

    processServerResponse(response)
    {
        // Try to parse the response (errors usually mean the server spat back some HTML stating errors)
        let parsed;

        try
        {
            parsed = JSON.parse(response);
        }
        catch (err)
        {
            this.setState({formFeedback: 'Error processing server response. Please cancel and try again later.'});
            return;
        }

        // Dispatch updated items array
        this.props.dispatch({type:'setAllProducts', payload: parsed})
        

        // And close the modal
        this.props.closeModal();
    }

    onNameChange(evt)
    {
        // Is the name valid or not? Mark it and let the state change anyway
        this.nameValid = evt.target.value === '' ? false : true;

        this.setState({newName: evt.target.value, formFeedback:''});
    }

    onDescriptionChange(evt)
    {
        // Is the description valid or not? Mark it and let the state change anyway
        this.descriptionValid = evt.target.value === '' ? false : true;

        this.setState({newDescription: evt.target.value, formFeedback:''})
    }

    onPriceChange(evt)
    {
        // Is the price valid or not? Mark it and let the state change anyway
        if (evt.target.value === '' || parseInt(evt.target.value) === 0)
        {
            this.priceValid = false;
        }
        else
        {
            this.priceValid = true;
        }

        this.setState({newPrice: evt.target.value, formFeedback:''})
    }

    onImageChange(evt)
    {
        let input = evt.target;

        if (input.files && input.files[0])
        {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                // Change the state's value for the img src
                this.setState({newImageUrl: e.target.result});
            }.bind(this);
    
            reader.readAsDataURL(input.files[0]);
        }
    }

    render()
    {
        return  <form onSubmit={this.onSubmit} className='itemEditForm'>

                    <h3>{this.props.title}</h3>

                    <div className='form-group'>
                        <img height='300' src={this.state.newImageUrl} alt='product'/>
                        <br/>
                        <label>Upload new image:</label>
                        <br/>
                        <label className='btn btn-default'>
                            Browse<input type="file" ref={this.fileInputRef} onChange={this.onImageChange} hidden/>
                        </label>
                    </div>

                    <div className='form-group'>
                        <label className='control-label'>Product Name:</label>
                        <input type='text' onChange={this.onNameChange} value={this.state.newName} className={this.nameValid ? 'form-control':'form-control is-invalid'}/>
                    </div>

                    <div className='form-group'>
                        <label>Description:</label>
                        <textarea onChange={this.onDescriptionChange} value={this.state.newDescription} className={this.descriptionValid ? 'form-control':'form-control is-invalid'}/>
                    </div>

                    <div className='form-group'>
                        <label>Price:</label>
                        <input type='number' onChange={this.onPriceChange} value={this.state.newPrice} className={this.priceValid ? 'form-control':'form-control is-invalid'}/>
                    </div>

                    <div className='width100percent alignRight'>
                        <div className='text-danger'>&nbsp;{this.state.formFeedback}</div>
                        <button type='button' onClick={this.cancel} className='btn btn-default'>Cancel</button>
                        &nbsp;&nbsp;&nbsp;
                        <input type='submit' 
                                value={this.props.action === 'delete'?'Delete':'OK'} 
                                className={this.props.action === 'delete'?'btn btn-danger':'btn btn-primary'}/>
                    </div>
                </form>
    }
}

export default connect()(ItemEditor)