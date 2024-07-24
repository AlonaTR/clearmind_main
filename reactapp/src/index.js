import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
// import Allitems from './views/allitems'
//import Test from './views/test'
//import OneType from './views/one-type'
//import Account from './views/account'
//import Activity from './views/activity'
//import LogIn from './views/log-in'
import Home from './views/home'
//import Item from './views/item'
//import NotFound from './views/not-found'

const App = () => {
  
  return (
    <Router>
      <Switch>
        {/* <Route component={Allitems} exact path="/allitems" />
        <Route component={Test} exact path="/test" />
        <Route component={OneType} exact path="/onetype/:typename" />
        <Route component={Account} exact path="/account" />
        <Route component={Activity} exact path="/activity" />
        <Route component={LogIn} exact path="/log-in" /> */}
        <Route component={Home} exact path="/home" />
        {/* <Route component={Item} exact path="/item/:itemid" />
        <Route component={NotFound} path="**" /> */}
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
