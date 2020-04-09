import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';


// import Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// import Components
import Header from './components/header/header-component';
import { auth } from './firebase/firebase.utils';
import { createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {

  unsubsriveFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props ;
    this.unsubsriveFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
          const userRef = await createUserProfileDocument( userAuth );

          userRef.onSnapshot( snapShot => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
              });
          });
      }

      setCurrentUser( userAuth );
      


    });
  };


  componentWillUnmount() {
    this.unsubsriveFromAuth();
  }



  render() {
    return (
        <div>
        <Header />
          <Switch>
              <Route exact={true} path='/' component={HomePage} />
              <Route exact={true} path='/shop' component={ShopPage} />
              <Route
                  exact
                  path='/signin'
                  render={() =>
                    this.props.currentUser ? (
                      <Redirect to='/' />
                      ) : (
                      <SignInAndSignUpPage />
                      )
                  }
              />
          </Switch>
          
        </div>
    );

  };
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
  });


const mapDispachToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect( mapStateToProps, mapDispachToProps )(App);
