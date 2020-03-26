import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';


// import Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// import Components
import Header from './components/header/header-component';
import { auth } from './firebase/firebase.utils';
import { createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null

    }

  };

  unsubsriveFromAuth = null

  componentDidMount() {
    this.unsubsriveFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
          const userRef = await createUserProfileDocument( userAuth );

          userRef.onSnapshot( snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
              ()=>{ console.log(this.state)}
            );


            
          });
      }

      this.setState( { currentUser : userAuth });
      


    });
  };

  componentWillUnmount() {
    this.unsubsriveFromAuth();
  }



  render() {
    return (
        <div>
        <Header currentUser= { this.state.currentUser }/>
          <Switch>
              <Route exact={true} path='/' component={HomePage} />
              <Route exact={true} path='/shop' component={ShopPage} />
              <Route exact={true} path='/signin' component={SignInAndSignUpPage} />
          </Switch>
          
        </div>
    );

  };






}

export default App;
