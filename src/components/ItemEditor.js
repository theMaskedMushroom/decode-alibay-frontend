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
            this.setState({
                newName: this.props.product.pname,
                newPrice: parseInt(this.props.product.price),
                newDescription: this.props.product.description,
                newImageUrl: this.props.product.imageUrl,
                formFeedback: ''
            });

            // and reset the file input
            this.fileInputRef.current.value = null;

            // Reset form validation flags
            this.nameValid = this.descriptionValid = this.priceValid = true;
        }
        else if (this.props.product._id !== prevProps.product._id)
        {
            this.setState({
                newName: this.props.product.pname,
                newPrice: parseInt(this.props.product.price),
                newDescription: this.props.product.description,
                newImageUrl: this.props.product.imageUrl,
                formFeedback: ''
            });

            // and reset the file input
            this.fileInputRef.current.value = null;

            // Reset form validation flags
            this.nameValid = this.descriptionValid = this.priceValid = true;
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

        // Is the form data valid (if not, feedback and return)
        if(!this.nameValid || !this.descriptionValid || !this.priceValid)
        {
            this.setState({formFeedback:'The form contains empty fields or invlid data. Please check.'});
            return;
        }

        // TODO: Fetch the update endpoint and on processing server response, if success, closeModal
        if (window.confirm("Update this item?"))
        {
            this.props.closeModal();
        }
    }

    onNameChange(evt)
    {
        // Is the name valid or not? Mark it and let the state change anyway
        evt.target.value === '' ? this.nameValid = false : this.nameValid = true;

        this.setState({newName: evt.target.value, formFeedback:''});
    }

    onDescriptionChange(evt)
    {
        // Is the description valid or not? Mark it and let the state change anyway
        evt.target.value === '' ? this.descriptionValid = false : this.descriptionValid = true;

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

                    <h3>Form title</h3>

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
                        <button onClick={this.cancel} className='btn btn-default'>Cancel</button>
                        &nbsp;&nbsp;&nbsp;
                        <input type='submit' value='OK' className='btn btn-primary'/>
                    </div>
                </form>
    }
}

export default connect()(ItemEditor)