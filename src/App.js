import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import './App.css';
import ItemList from './components/ItemList';
import EditableItemList from './components/EditableItemList';
import Login from './components/Login';
import Signup from './components/Signup';
import Seller from './components/Seller';

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
    this.renderSellerDetail = this.renderSellerDetail.bind(this);
  }

  componentDidMount()
  {
    // TODO: automatic login when proper cookie is set (fetch to backend)

    // Fetch all items then dispatch them so they become available to the whole application
    fetch('/products', {
      method: 'GET'
    }).then(x => x.text())
    .then(res => {
      var parsed = JSON.parse(res);
      if(parsed.status){
        this.props.dispatch({type:'setAllProducts', payload: parsed});
      }
      else
      {
        console.log("fetch /products status is false. Something went wrong on the db side...")
      }
    })

    // Fetch all users then dispatch them so they become available to the whole application
    fetch('/users', {
      method: 'GET'
    }).then(x => x.text())
    .then(res => {
      var parsed = JSON.parse(res);
      if(parsed.status){
        this.props.dispatch({type:'setAllUsers', payload: parsed});
      }
      else
      {
        console.log("fetch /users status is false. Something went wrong on the db side...")
      }
    })

  }

  renderHomePage()
  {
    return <div><ItemList /></div>
  }

  renderSignup()
  {
    return <div><Signup /></div>  
  }

  renderLogin()
  {
    return <div><Login /></div>
  }

  renderItemDetail(query)
  {
    let itemId = query.match.params.itemId;

    return <div>Item detail ({itemId})</div>
  }

  renderSellerDetail(routerData)
  {
    var vendorid = routerData.match.params.sellerId;
    var result = this.props.products.filter(obj => {
      return obj.vendor_id === vendorid;
    })
    //debugger
    return <Seller 
      vendor_id={vendorid}
      filterProducts={result}  
    />;
  }

  renderItemManager()
  {
    return <div><EditableItemList/></div>
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
          <Route exact={true} path='/seller/:sellerId' render={this.renderSellerDetail} />

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state)
{
  return {
    products: state.products,
    myusers: state.users
  }
}

export default connect(mapStateToProps)(App);
