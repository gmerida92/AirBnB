import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from "./store/session";


import Navigation from './components/Navigation'
import Spot from './components/Spots'
import SingleSpot from './components/Spots/SingleSpot'
import Listings from './components/Spots/Listings';

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
        <Route path={'/api/users/myaccount/spots'}>
          <Listings />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
