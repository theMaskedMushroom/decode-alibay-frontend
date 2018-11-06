import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Header.css'

class Header extends Component
{
    render()
    {
        // NON-FINISHED HEADER, JUST FOR DEVELOPMENT
        return (
        <div className='Header'>
            HEADER
            &nbsp;&nbsp;&nbsp;
            <Link to='/'>Home page</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to='/signup'>Sign up</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to='/login'>Login</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to='/itemmanager'>Item manager</Link>
        </div>
        );
    }
}

function mapStateToProps(state)
{
    return {
        
    };
}

export default connect(mapStateToProps)(Header);