import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Tasks from './components/Tasks/Tasks';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
//import Footer from './components/'
function App() {
  return (
<div>
<Header></Header>
    <Switch>
      
      <Route path="/posts" component={Posts} />
      <Route path="/tasks" component={Tasks} />      
      <Route path="/" exact component={Home} />
      <Route path="/home">
        <Redirect to='/' component={Home}/>
      </Route>
      <Route path='*' component={NotFound} />

    </Switch>
    </div>
  );
}

export default App;
