import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  // return isLoaded && (
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path='/api/users/login'>
            <LoginFormPage />
          </Route> */}
          <Route path='/api/users/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>

  );
}

export default App;
