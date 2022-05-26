// import "../../additional-functions/wdyr";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TagManager from "react-gtm-module";
import ComingSoon from "../ComingSoon/ComingSoon";
import NotFound from "../NotFound/NotFound";
import AboutHome from "../AboutHome/AboutHome";
import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import QACertTestSummaryHome from "../QACertTestSummaryHome/QACertTestSummaryHome";
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";
import ReportingInstructions from "../ReportingInstructions/ReportingInstructions";
import ReportGenerator from "../ReportGenerator/ReportGenerator";

import { handleActiveElementFocus } from "../../additional-functions/add-active-class";
import FAQ from "../FAQ/FAQ";
import Resources from "../Resources/Resources";

import HelpSupport from "../HelpSupport/HelpSupport";
import "./App.scss";
import { TokenRefresher } from "../TokenRefresher/TokenRefresher";
import InactivityTracker from "../InactivityTracker/InactivityTracker";
import config from "../../config";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
} from "../../additional-functions/manage-focus";

const App = () => {
  const [user, setUser] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    if (config.app.googleAnalyticsEnabled === "true") {
      const tagManagerArgs = { gtmId: "" };
      if (window.location.href.search("workspace") === -1) {
        tagManagerArgs.gtmId = config.app.googleAnalyticsPublicContainerId;
      } else {
        tagManagerArgs.gtmId =
          config.app.googleAnalyticsAuthenticatedContainerId;
      }

      TagManager.initialize(tagManagerArgs);
    }
  });

  useEffect(() => {
    const cdxUser = sessionStorage.getItem("cdx_user")
      ? JSON.parse(sessionStorage.getItem("cdx_user"))
      : false;

    setUser(cdxUser && cdxUser.firstName ? cdxUser : false);

    assignFocusEventListeners();
    handleActiveElementFocus();

    // * clean up
    return () => {
      cleanupFocusEventListeners();
      handleActiveElementFocus();
    };
  }, []);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    if (user) {
      if (document.querySelector(".usa-banner__content")) {
        document
          .querySelector(".usa-banner__content")
          .classList.add("react-transition");
        document.querySelector(".usa-banner__content").classList.add("fade-in");
      }
    }
  }, [user]);

  const [currentLink, setCurrentLink] = useState(
    window.location.href.replace(`${window.location.origin}`, "")
  );

  return (
    <div>
      {user ? <TokenRefresher /> : ""}
      <div aria-live="polite" role="status" aria-atomic="true">
        <div>{user ? <InactivityTracker /> : ""}</div>
      </div>
      <Switch>
        <Route
          path="/workspace/monitoring-plans/:id/evaluation-report"
          exact
          component={() => <ReportGenerator user={user} />}
        />
        <Layout
          user={user}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
        >
          <Switch>
            <Redirect from="/home" to="/" />
            <Route
              path="/"
              exact
              component={() => (
                <AboutHome user={user} setCurrentLink={setCurrentLink} />
              )}
            />

            <Route path={`/faqs`} exact component={() => <FAQ />} />
            <Route path="/login" exact component={Login} />
            {user ? (
              <Redirect
                from="/monitoring-plans"
                to="/workspace/monitoring-plans"
              />
            ) : (
              <Redirect
                from="/workspace/monitoring-plans"
                to="/monitoring-plans"
              />
            )}
            <Route
              path="/monitoring-plans"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={"monitoringPlans"}
                />
              )}
            />
            <Route
              path="/workspace/monitoring-plans/"
              exact
              component={() => (
                <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={"monitoringPlans"}
                />
              )}
            />
            {/* {user ? (
              <Redirect
                from="/qa_certifications"
                to="/workspace/qa_certifications"
              />
            ) : (
              <Redirect
                from="/workspace/qa_certifications"
                to="/qa_certifications"
              />
            )} */}
            <Route
              path="/qa_certifications_test_summary_data"
              exact
              component={() => <QACertTestSummaryHome user={false} />}
            />
            <Route
              path="/workspace/qa_certifications_test_summary_data"
              exact
              component={() => (
                <QACertTestSummaryHome
                  user={false}
                />
              )}
            />
            <Route
              path="/workspace/qa_certifications_test_summary_data"
              exact
              component={() => (
                <QACertTestSummaryHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                />
              )}
            />
            {/* <Route
              path="/workspace/qa_certifications/"
              exact
              component={
                <QACertTestSummaryHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                />
              }
            /> */}
            {user ? (
              <Redirect from="/emission" to="/workspace/emission" />
            ) : (
              <Redirect from="/workspace/emission" to="/emission" />
            )}
            <Route path="/emission/" exact component={ComingSoon} />
            <Route path="/workspace/emission/" exact component={ComingSoon} />
            <Route path="/tutorials" exact component={ComingSoon} />
            <Route path="/cam-api" exact component={ComingSoon} />
            <Route path="/glossary" exact component={ComingSoon} />

            <Route
              path="/reporting-instructions"
              exact
              component={ReportingInstructions}
            />
            <Route path={`/resources`} exact component={Resources} />
            <Route path={`/help-support`} exact component={HelpSupport} />
            <Route path="/admin/rules" exact component={RuleEditor} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Switch>
    </div>
  );
};

export default App;
