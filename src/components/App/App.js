// import "../../additional-functions/wdyr";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import AboutHome from "../AboutHome/AboutHome";
import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";
import ReportingInstructions from "../ReportingInstructions/ReportingInstructions";

import { handleActiveElementFocus } from "../../additional-functions/add-active-class";

import "./App.scss";

const App = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const cdxUser = sessionStorage.getItem("cdx_user")
      ? JSON.parse(sessionStorage.getItem("cdx_user"))
      : false;

    setUser(cdxUser && cdxUser.firstName ? cdxUser : false);
  }, []);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    handleActiveElementFocus();

    document
      .querySelector(".usa-banner__content")
      .classList.add("react-transition");
    document.querySelector(".usa-banner__content").classList.add("fade-in");

    // * clean up
    return () => {
      handleActiveElementFocus();
    };
  }, []);

  const [currentLink,setCurrentLink] = useState(window.location.href.replace(`${window.location.origin}`, ""));
  return (
    <div>
      <Layout user={user} currentLink={currentLink} setCurrentLink={setCurrentLink}>
        <Switch>
          <Redirect from="/home" to="/" />

          <Route
            path="/"
            exact
            component={() => <AboutHome user={user}  setCurrentLink = {setCurrentLink}/>}
          />
          <Route path="/login" exact component={Login} />
          <Route
            path="/monitoring-plans"
            exact
            component={() => <MonitoringPlanHome user={false} />}
          />
          <Route
            path="/workspace/monitoring-plans/"
            exact
            component={() => <MonitoringPlanHome user={user} />}
          />
          <Route
            path="/reporting-instructions"
            exact
            component={ReportingInstructions}
          />
          <Route path="/admin/rules" exact component={RuleEditor} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
