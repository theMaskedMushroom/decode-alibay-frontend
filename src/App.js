import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/Header';
import './App.css';

class App extends Component 
{
  constructor(props)
  {
    super(props);

    // bindings
    this.renderHomePage = this.renderHomePage.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderItemDetail = this.renderItemDetail.bind(this);
    this.renderItemManager = this.renderItemManager.bind(this);
  }

  componentDidMount()
  {
    // TODO: automatic login when proper cookie is set (fetch to backend)
  }

  renderHomePage()
  {
    return <div>Home page</div>
  }

  renderSignup()
  {
    return <div>Signup</div>
  }

  renderLogin()
  {
    return <div>Login</div>
  }

  renderItemDetail(query)
  {
    let itemId = query.match.params.itemId;

    return <div>Item detail ({itemId})</div>
  }

  renderItemManager()
  {
    return <div>Item manager</div>
  }

  render() 
  {
    return (
      <Router>
        <div className="App">

          <Header />
          
          <Route exact={true} path='/' render={this.renderHomePage} />
          <Route exact={true} path='/signup' render={this.renderSignup} />
          <Route exact={true} path='/login' render={this.renderLogin} />
          <Route exact={true} path='/item/:itemId' render={this.renderItemDetail} />
          <Route exact={true} path='/itemmanager' render={this.renderItemManager} />

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state)
{
  return {

  };
}

export default connect(mapStateToProps)(App);
