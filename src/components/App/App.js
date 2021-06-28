// import "../../additional-functions/wdyr";
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
  const [user, setUser] = useState(false);
  useEffect(() => {
    const cdxUser = sessionStorage.getItem("cdx_user")
      ? JSON.parse(sessionStorage.getItem("cdx_user"))
      : false;

    setUser(cdxUser && cdxUser.firstName ? cdxUser : false);
  }, []);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    // *** the purpose of this function is to add epa-active-element class to currently active element
    const addActiveClass = (event) => {
      // *** remove any existing elements first
      removeActiveClass(event);
      setTimeout(() => {
        event.target.classList.add("epa-active-element");

        event.target.parentElement && event.target.parentElement.classList
          ? event.target.parentElement.classList.add("epa-active-element")
          : void 0;
      });
    };
    const removeActiveClass = (event) => {
      event.target.classList.remove("epa-active-element");
    };

    document.querySelectorAll("*").forEach((element) => {
      element.addEventListener(
        "keydown",
        (event) => {
          // *** disregard anything except "Enter" presses
          event.key === "Enter" ? addActiveClass(event) : void 0;
        },
        true
      );

      element.addEventListener("click", (event) => {
        addActiveClass(event);
      });

      element.addEventListener(
        "blur",
        (event) => {
          removeActiveClass(event);
        },
        true
      );
    });

    // * clean up
    return () => {
      document.querySelectorAll("*").forEach((element) => {
        element.addEventListener(
          "keydown",
          (event) => {
            // *** disregard anything except "Enter" presses
            event.key === "Enter" ? addActiveClass(event) : void 0;
          },
          true
        );
        element.removeEventListener("click", (event) => addActiveClass(event));
        element.removeEventListener(
          "blur",
          (event) => removeActiveClass(event),
          true
        );
      });
    };
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
            component={() => <MonitoringPlanHome user={false} />}
          />
          <Route
            path="/workspace/monitoring-plans/"
            exact
            component={() => <MonitoringPlanHome user={user} />}
          />
          <Route path="/admin/rules" exact component={RuleEditor} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
