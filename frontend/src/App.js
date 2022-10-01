import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from "./store/session";


import Navigation from './components/Navigation'
import Spots from './components/Spots'
import SingleSpot from './components/Spots/SingleSpot'
import Listings from './components/Spots/Listings';
import Profile from './components/Profile';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions?.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  let sessionUser = useSelector((state) => state?.session?.user) || ''


  return (
    <div>
      <Navigation isLoaded={isLoaded} />

      <Switch>
        <Route exact path='/'>
          <Spots />
        </Route>
        <Route path={'/api/spots/:id'}>
          <SingleSpot sessionUser={sessionUser} />
        </Route>
        <Route path={'/api/users/myaccount/spots'}>
          <Listings sessionUser={sessionUser}/>
        </Route>
        <Route path={'/api/users/myaccount'}>
          <Profile sessionUser={sessionUser} />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
