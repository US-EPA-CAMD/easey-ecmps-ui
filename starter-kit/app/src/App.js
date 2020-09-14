import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Tasks from './components/Tasks/Tasks';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import './template/css/core/style.css';

function App() {
  return (
<div>

    <Switch>
      <Route path="/posts" component={Posts} />
      <Route path="/tasks" component={Tasks} />      
      <Route path="/" exact component={Home} />
      <Route path="/home">
        <Redirect to='/' component={Home}/>
      </Route>
      <Route path='*' component={NotFound} />

    </Switch>
    <Footer/>
    </div>
  );
}

export default App;
