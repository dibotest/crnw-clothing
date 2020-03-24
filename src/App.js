import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';


// import Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// import Components
import Header from './components/header/header-component';

function App() {
  return (
    <div>
    <Header />
      <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route exact={true} path='/shop' component={ShopPage} />
          <Route exact={true} path='/signin' component={SignInAndSignUpPage} />
      </Switch>
      
    </div>
  );
}

export default App;
