import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import WrapperComponent from './components/general/WrapperCompoent';
import LandingPageComponent from './components/landing/LandingPageComponent';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={'/Register'} component={RegisterComponent} />
          <Route exact path={'/login'} component={LoginComponent} />
          <Route exact path={'/'} component={LandingPageComponent} />
          <Route component={WrapperComponent} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;