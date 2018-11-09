import React, { Component } from 'react'; 
//import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.username === "" || this.state.password === ""){
      return;
    }
    fetch(this.props.endpoint, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(x => {
      return x.text();
    }).then(res=> {
      //var parsed = JSON.parse(res);
      
    })
    //debugger;
    this.setState({username: ""});
    this.setState({password: ""});
  }

  handleUsernameChange(event) {
    var username = event.target.value;
   this.setState({username: username});
  }

  handlePasswordChange(event) {
    var password = event.target.value;
    this.setState({password: password});
  }

  render() {
    return(<div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>username </label>
            <input onChange={this.handleUsernameChange} value={this.state.username} />
          </div>
          <div>
            <label>password </label>
            <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;