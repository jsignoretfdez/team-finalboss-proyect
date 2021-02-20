import React from 'react';
import { BrowserRouter as Router,Switch, Route, Redirect } from 'react-router-dom';
import AdvertsContainer from '../adverts/AdvertsContainer';

import { PrivateRoute, RegisterPage, LoginPage } from '../auth';
// import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from './NotFoundPage';
const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/register" exact component={RegisterPage}>
        </Route>
        <Route path="/login" exact>
          {routerProps => (
            <LoginPage {...routerProps} />
          )}
        </Route>
        <Route path="/adverts" exact>
          <AdvertsContainer />
        </Route>
        {/* <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
        <PrivateRoute path="/adverts/:id" exact component={AdvertPage} /> */}
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
