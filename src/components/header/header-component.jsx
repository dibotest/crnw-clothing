import React from 'react';
import './header.styles.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';



const Header = ( { currentUser }) => (
    <div className='header'>
        <div className='logo-container'>
            <Link to='/'>
                <Logo className='logo' to='/' />
            </Link> 
        </div>

        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? 
                    <div className='option' onClick= { () => auth.signOut() }>SIGN OUT</div>
                :
                <Link className='option' to='/signin' >SIGN IN</Link>
            }

    
        </div>
    
    </div>

);

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);