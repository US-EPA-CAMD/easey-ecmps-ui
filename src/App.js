import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Tasks from './components/Tasks/Tasks';
import NotFound from './components/Common/NotFound/NotFound';

import Layout from './components/Common/Layout';

function App() {
  return (
<div>
    <Layout>
    <Switch>
      <Route path="/posts" component={Posts} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/" exact component={Home} />
      <Route path="/home">
        <Redirect to='/' component={Home}/>
      </Route>
      <Route path='*' component={NotFound} />

    </Switch>
    </Layout>

    </div>
  );
}

export default App;
