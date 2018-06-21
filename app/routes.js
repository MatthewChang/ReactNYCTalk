import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PostTable from './containers/PostTable'
import About from './components/About'

export default (
  <Switch>
    <Route exact path="/" component={PostTable} />
    <Route path="/about" component={About} />
  </Switch>
)
