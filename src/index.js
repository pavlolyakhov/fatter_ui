import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store/redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import App from './App';
import LoginPage from './containers/LoginPage';
import ProtectedPage from './components/protected';
import RequireAuth from './components/auth/require_auth';
import Goals from './containers/Goals';
import './style/css/style.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Switch>
            <Route path="/signin" component={LoginPage} />
            <Route path="/goals" component={Goals} />
            <Route path="/protected" component={RequireAuth(ProtectedPage)} />
            <Route path="/" component={App} />
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
