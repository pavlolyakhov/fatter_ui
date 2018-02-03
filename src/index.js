import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store/redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
// import App from './App';
import LoginPage from './containers/LoginPage';
import ProtectedPage from './components/protected';
import RequireAuth from './components/auth/require_auth';
import SearchPage from './containers/SearchPage';
import './style/css/style.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Switch>
            <Route path="/signin" component={LoginPage} />
            <Route path="/goals" component={SearchPage} />
            <Route path="/protected" component={RequireAuth(ProtectedPage)} />
            {/* <Route path="/" component={App} /> */}
            <Route path="/" component={SearchPage} />
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
