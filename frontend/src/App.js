import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from "./store/session";


import Navigation from './components/Navigation'
import Spot from './components/Spots'
import SingleSpot from './components/Spots/SingleSpot'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions?.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div>
      <Navigation isLoaded={isLoaded} />

      <Switch>
        <Route exact path='/'>
          <Spot />
        </Route>
        <Route path={'/api/spots/:id'}>
          <SingleSpot />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
