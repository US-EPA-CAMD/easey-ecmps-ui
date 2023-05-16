import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TagManager from "react-gtm-module";
import ComingSoon from "../ComingSoon/ComingSoon";
import NotFound from "../NotFound/NotFound";
import AboutHome from "../AboutHome/AboutHome";
import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import { ErrorSuppression } from "../ErrorSuppression/ErrorSuppression";
import Login from "../Login/Login";
import ReportingInstructions from "../ReportingInstructions/ReportingInstructions";
import ReportGenerator from "../ReportGenerator/ReportGenerator";

import { handleActiveElementFocus } from "../../additional-functions/add-active-class";
import FAQ from "../FAQ/FAQ";
import Resources from "../Resources/Resources";

import HelpSupport from "../HelpSupport/HelpSupport";
import { InactivityTracker } from "../InactivityTracker/InactivityTracker";
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
<<<<<<< HEAD
import { InactivityTracker } from "../InactivityTracker/InactivityTracker";
import { isEqual } from "lodash";
import { currentDateTime } from "../../utils/functions";
=======
>>>>>>> acb81daf78bb455fb6a0b9609510494bbc3bcc6e

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
<<<<<<< HEAD
=======
  const dispatch = useDispatch();
>>>>>>> acb81daf78bb455fb6a0b9609510494bbc3bcc6e

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

  let checkedOutLocationsCache = [];
  const validCheckoutRefreshPaths = [
    "workspace/monitoring-plans",
    "workspace/qa-test",
    "workspace/qa-qce-tee",
    "workspace/emissions",
    "workspace/export",
    "workspace/evaluate",
    "workspace/submit",
  ];

  const refreshCheckoutInterval = () => {
    if (localStorage.getItem("ecmps_user")) {
      return setInterval(async () => {
        let refreshCheckouts = false;

        for (const loc of validCheckoutRefreshPaths) {
          if (window.location.href.indexOf(loc) > -1) {
            refreshCheckouts = true;
            break;
          }
        }
        if (refreshCheckouts) {
          const checkedOutLocationResult = (await getCheckedOutLocations())
            ?.data;
          if (
            checkedOutLocationResult &&
            !isEqual(checkedOutLocationResult, checkedOutLocationsCache)
          ) {
            dispatch({
              type: types.SET_CHECKED_OUT_LOCATIONS,
              checkedOutLocations: checkedOutLocationResult,
            });
            checkedOutLocationsCache = checkedOutLocationResult;
          }
        }
      }, 10000);
    }
  };

  useEffect(() => {
    const interval = refreshCheckoutInterval();
    return () => clearInterval(interval); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    window.addEventListener("storage", (event) => {
      if (event.key === null) {
        window.location.reload();
      }
      if (
        event.key === "ecmps_user" &&
        (event.oldValue === null || event.newValue === null)
      ) {
        window.location.reload();
      }
    });
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
    let ecmpsUser = localStorage.getItem("ecmps_user")
      ? JSON.parse(localStorage.getItem("ecmps_user"))
      : false;

    if (ecmpsUser) {
      //Determine if we still have a valid session given a user exists
      const sessionExp = localStorage.getItem("ecmps_session_expiration");

      if (
        !sessionExp ||
        (sessionExp && currentDateTime() > new Date(sessionExp))
      ) {
        localStorage.removeItem("ecmps_user");
        ecmpsUser = false;
      }
    }

    setUser(ecmpsUser && ecmpsUser.firstName ? ecmpsUser : false);

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
<<<<<<< HEAD
      <Switch>
        <Route path="/reports" exact component={() => <ReportGenerator />} />
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
            {!user && <Redirect from="/workspace/submit" to="/home" />}
            <Route
              path="/workspace/submit"
              exact
              component={() => (
                <EvaluateAndSubmit user={user} componentType="Submission" />
              )}
            />

            {!user && <Redirect from="/workspace/evaluate" to="/home" />}
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
=======
      <Layout
        user={user}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
      >
        <Routes>
          <Route
            path="/reports"
            element={user
              ? <Navigate to="/workspace/reports" replace />
              : <ReportGenerator />
            }
          />
          <Route
            path="/workspace/reports"
            element={!user
              ? <Navigate to="/reports" replace />
              : <ReportGenerator requireAuth={true} user={user} />
            }
          />
          <Route
            path="/"
            element={
              <AboutHome
                user={user}
                setCurrentLink={setCurrentLink}
>>>>>>> acb81daf78bb455fb6a0b9609510494bbc3bcc6e
              />
            }
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />            
          <Route path={`/faqs`} element={<FAQ />} />
          <Route path="/login" element={Login} />
          <Route
            path="/workspace/submit"
            element={!user
              ? <Navigate to="/" replace />
              : <EvaluateAndSubmit
                  user={user}
                  componentType="Submission"
                />
            }
          />
          <Route
            path="/workspace/evaluate"
            element={!user
              ? <Navigate to="/" replace />
              : <EvaluateAndSubmit
                  user={user}
                  componentType="Evaluate"
                />
            }
          />
          <Route
            path="/monitoring-plans"
            element={user
              ? <Navigate to="/workspace/monitoring-plans" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/monitoring-plans"
            element={!user
              ? <Navigate to="/monitoring-plans" replace />
              : <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
                  moduleName={modules.monitoring_plans_module}
                />
            }
          />
          <Route
            path="/qa-test"
            element={user
              ? <Navigate to="/workspace/qa-test" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/qa-test"
            element={!user
              ? <Navigate to="/qa-test" replace />
              : <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                  moduleName={modules.qa_Certifications_Test_Summary_Module}
                />
            }
          />
          <Route
            path="/qa-qce-tee"
            element={user
              ? <Navigate to="/workspace/qa-qce-tee" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/qa-qce-tee"
            element={!user
              ? <Navigate to="/qa-qce-tee" replace />
              : <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                  moduleName={modules.qa_Certifications_Event_Module}
                />
            }
          />
          <Route
            path="/emissions"
            element={user
              ? <Navigate to="/workspace/emissions" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={EMISSIONS_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/emissions"
            element={!user
              ? <Navigate to="/emissions" replace />
              : <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}
                  workspaceSection={EMISSIONS_STORE_NAME}
                  moduleName={modules.emissions_module}
                />
            }
          />
          <Route
            path="/export"
            element={user
              ? <Navigate to="/workspace/export" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={EXPORT_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/export"
            element={!user
              ? <Navigate to="/export" replace />
              : <MonitoringPlanHome
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  user={user}   
                  workspaceSection={EXPORT_STORE_NAME}
<<<<<<< HEAD
                />
              )}
            />

            {!user && (
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
=======
              />
            }
          />
          <Route
            path="/workspace/error-suppression"
            element={!user
              ? <Navigate to="/" />
              : <ErrorSuppression />
            }
          />
          <Route path="/tutorials" element={<ComingSoon />} />
          <Route path="/cam-api" element={<ComingSoon />} />
          <Route path="/glossary" element={<ComingSoon />} />
          <Route
            path="/reporting-instructions"
            element={<ReportingInstructions />}
          />
          <Route path={`/resources`} element={<Resources />} />
          <Route path={`/help-support`} element={<HelpSupport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>      
>>>>>>> acb81daf78bb455fb6a0b9609510494bbc3bcc6e
    </div>
  );
};

export default App;
