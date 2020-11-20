import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import NotFound from './components/Common/NotFound/NotFound';

import Layout from './components/Common/Layout';

function App() {
  return (
<div>
    <Layout>
    <Switch>
      <Redirect from="/home" to="/" />
      <Route path="/" exact component={Home} />
      <Route path='*' component={NotFound} />
    </Switch>
    </Layout>

    </div>
  );
}

export default App;
