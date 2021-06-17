import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../mp-viewer/Home/Home";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";

import "./App.scss";

const App = () => {
  const cdxUser = sessionStorage.getItem("cdx_user")
    ? JSON.parse(sessionStorage.getItem("cdx_user"))
    : false;
  const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const checkLoggedIn = () => {
    if (cdxUser && firstName) {
      setUserLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/monitoring-plans"
            exact
            component={()=> <MonitoringPlanHome user={false}/>}
          />
          <Route
            path="/workspace/monitoring-plans/"
            exact
            component={()=> <MonitoringPlanHome user={userLoggedIn}/>}
          />
          <Route path="/admin/rules" exact component={RuleEditor} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
