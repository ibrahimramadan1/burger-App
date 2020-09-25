import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Logout/Logout';
import { useLocalStorage } from './store/actions/actions';
import { connect } from 'react-redux';
import asyncComp from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComp(()=>{
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComp(()=>{
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComp(()=>{
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.getLocalStorage();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/logout' component={Logout} />
          <Route path='/orders' component={asyncOrders} />
        <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLocalStorage: () => dispatch(useLocalStorage()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
