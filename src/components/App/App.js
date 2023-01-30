import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import TagManager from "react-gtm-module";
import ComingSoon from "../ComingSoon/ComingSoon";
import NotFound from "../NotFound/NotFound";
import AboutHome from "../AboutHome/AboutHome";
import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import { ErrorSuppression } from "../ErrorSuppression/ErrorSuppression";
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";
import ReportingInstructions from "../ReportingInstructions/ReportingInstructions";
import ReportGenerator from "../ReportGenerator/ReportGenerator";

import { handleActiveElementFocus } from "../../additional-functions/add-active-class";
import FAQ from "../FAQ/FAQ";
import Resources from "../Resources/Resources";

import HelpSupport from "../HelpSupport/HelpSupport";
import "./App.scss";
import InactivityTracker from "../InactivityTracker/InactivityTracker";
import config from "../../config";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
} from "../../additional-functions/manage-focus";
import {
  QA_CERT_TEST_SUMMARY_STORE_NAME,
  EXPORT_STORE_NAME,
  EMISSIONS_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import * as modules from "../../utils/constants/moduleTitles";
import * as types from "../../store/actions/actionTypes";
import { getCheckedOutLocations } from "../../utils/api/monitoringPlansApi";
import EvaluateAndSubmit from "../EvaluateAndSubmit/EvaluateAndSubmit";

const cdx_user = sessionStorage.getItem("cdx_user");

const App = () => {
  const [user, setUser] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const dispatch = useDispatch();

  //useGetCheckedOutLocations();

  const prepDocument = () => {
    setTimeout(() => {
      const mainContent = document.querySelector(".mainContent");

      if (mainContent !== null) {
        mainContent.setAttribute("id", "main-content");
      }
    });
    // To avoid css sytling conflicts in production build
    // position the link tag to external stylesheet as the last element of head section.
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    linkTags.forEach((linkTag) => {
      linkTag.parentNode.appendChild(linkTag);
    });
  };

  const refreshCheckoutInterval = () => {
    return setInterval(async () => {
      const checkedOutLocationResult = (await getCheckedOutLocations()).data;
      if (checkedOutLocationResult) {
        dispatch({
          type: types.SET_CHECKED_OUT_LOCATIONS,
          checkedOutLocations: checkedOutLocationResult,
        });
      }
    }, 10000);
  };

  useEffect(() => {
    const interval = refreshCheckoutInterval();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    prepDocument();
  }, []);

  useEffect(() => {
    if (config.app.googleAnalyticsEnabled) {
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
      <div aria-live="polite" role="status" aria-atomic="true">
        <div>{user ? <InactivityTracker /> : ""}</div>
      </div>
      <Switch>
      <Route
          path="/reports"
          exact
          component={() => <ReportGenerator />}
        />
        <Route
          path="/workspace/reports"
          exact
          component={() => <ReportGenerator requireAuth={true} user={user} />}
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
            {!cdx_user && <Redirect from="/workspace/submit" to="/home" />}
            <Route
              path="/workspace/submit"
              exact
              component={() => (
                <EvaluateAndSubmit user={user} componentType="Submission" />
              )}
            />

            {!cdx_user && <Redirect from="/workspace/evaluate" to="/home" />}
            <Route
              path="/workspace/evaluate"
              exact
              component={() => (
                <EvaluateAndSubmit user={user} componentType="Evaluate" />
              )}
            />

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
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
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
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
                  moduleName={modules.monitoring_plans_module}
                />
              )}
            />

            {user ? (
              <Redirect from="/qa-test" to="/workspace/qa-test" />
            ) : (
              <Redirect from="/workspace/qa-test" to="/qa-test" />
            )}
            <Route
              path="/qa-test"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                />
              )}
            />
            <Route
              path="/workspace/qa-test"
              exact
              component={() => (
                <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                  moduleName={modules.qa_Certifications_Test_Summary_Module}
                />
              )}
            />

            {user ? (
              <Redirect from="/qa-qce-tee" to="/workspace/qa-qce-tee" />
            ) : (
              <Redirect from="/workspace/qa-qce-tee" to="/qa-qce-tee" />
            )}
            <Route
              path="/qa-cert-event"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                />
              )}
            />
            <Route
              path="/workspace/qa-cert-event"
              exact
              component={() => (
                <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                  moduleName={modules.qa_Certifications_Event_Module}
                />
              )}
            />

            {user ? (
              <Redirect from="/emissions" to="/workspace/emissions" />
            ) : (
              <Redirect from="/workspace/emissions" to="/emissions" />
            )}
            <Route
              path="/emissions"
              exact
              component={() => {
                return (
                  <MonitoringPlanHome
                    user={false}
                    workspaceSection={EMISSIONS_STORE_NAME}
                  />
                );
              }}
            />
            <Route
              path="/workspace/emissions"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={user}
                  workspaceSection={EMISSIONS_STORE_NAME}
                />
              )}
            />

            {user ? (
              <Redirect from="/export" to="/workspace/export" />
            ) : (
              <Redirect from="/workspace/export" to="/export" />
            )}
            <Route
              path="/export"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={EXPORT_STORE_NAME}
                />
              )}
            />
            <Route
              path="/workspace/export"
              exact
              component={() => (
                <MonitoringPlanHome
                  user={user}
                  workspaceSection={EXPORT_STORE_NAME}
                />
              )}
            />

            {!cdx_user && (
              <Redirect from="/workspace/error-suppression" to="/home" />
            )}
            <Route
              path="/workspace/error-suppression"
              exact
              component={() => <ErrorSuppression />}
            />

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
