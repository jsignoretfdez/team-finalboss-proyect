import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PrivateRoute, RegisterPage, LoginPage } from "../auth";
// import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from "./NotFoundPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/register" exact component={RegisterPage}></Route>
        <Route path="/login" exact>
          {(routerProps) => <LoginPage {...routerProps} />}
        </Route>
        {/* <PrivateRoute path="/adverts" exact>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
        <PrivateRoute path="/adverts/:id" exact component={AdvertPage} /> */}
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
