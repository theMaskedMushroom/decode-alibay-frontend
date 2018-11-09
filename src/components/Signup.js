import React, { Component } from 'react'; 
//import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      phonenumber: "",
      email: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handletelephoneChange = this.handletelephoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword || 
      this.state.password === "" || this.state.confirmPassword === ""){
      return
    }
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        email: this.state.email
      })
    }).then(x => {
      return x.text();
    }).then(res=> {
      var parsed = JSON.parse(res);
      console.log(parsed);
    })
    //debugger;
    this.setState({username: ""});
    this.setState({password: ""});
    this.setState({confirmPassword: ""});
    this.setState({name: ""});
    this.setState({address: ""});
    this.setState({phonenumber: ""});
    this.setState({email: ""});
  }

  handleUsernameChange(event) {
    var username = event.target.value;
   this.setState({username: username});
  }

  handlePasswordChange(event) {
    var password = event.target.value;
    this.setState({password: password});
  }

  handleConfirmPasswordChange(event) {
    var confirmPassword = event.target.value;
    this.setState({confirmPassword: confirmPassword});
  }

  handleNameChange(event) {
    var name = event.target.value;
    this.setState({name: name});
  }

  handleAddressChange(event) {
    var address = event.target.value;
    this.setState({address: address});
  }

  handletelephoneChange(event) {
    var telephone = event.target.value;
    this.setState({phonenumber: telephone});
  }

  handleEmailChange(event) {
    var email = event.target.value;
    this.setState({email: email});
  }

  comparePassword(){
    const spanStyle = {
      color: 'red'
    };
    if(this.state.password !== this.state.confirmPassword){
      return <span style={spanStyle}>passwords do not match</span>
    } //else {
      //return <span color="green">passwords match</span>
    //}
  }

  render() {
    return(<div>
        <br />
        
          {this.comparePassword()}
        
        <br /><br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={this.handleUsernameChange} value={this.state.username} />
          </div>
          <div>
            <label>password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
          </div>
          <div>
            <label>confirm password: </label>
            <input type="password" onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword} />
          </div>
          <div>
            <label>name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={this.handleNameChange} value={this.state.name} />
          </div>
          <div>
            <label>address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input onChange={this.handleAddressChange} value={this.state.address} />
          </div>
          <div>
            <label>telephone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="tel" onChange={this.handletelephoneChange} value={this.state.phonenumber} />
          </div>
          <div>
            <label>email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="email" onChange={this.handleEmailChange} value={this.state.email} />
          </div>
          <br />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;