import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getLoggedUserToken } from '../../store/selectors';

const PrivateRoute = ({ token, ...props }) => {
  const location = useLocation();
  return token ? <Route {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};

export default connect(state => ({ token: getLoggedUserToken(state) }))(
  PrivateRoute
);

PrivateRoute.propTypes = {
  token: PropTypes.string
}
