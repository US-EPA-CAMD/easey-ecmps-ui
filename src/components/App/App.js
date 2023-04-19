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
import RuleEditor from "../RuleEditor/RuleEditor";
import Login from "../Login/Login";
import ReportingInstructions from "../ReportingInstructions/ReportingInstructions";
import ReportGenerator from "../ReportGenerator/ReportGenerator";

import { handleActiveElementFocus } from "../../additional-functions/add-active-class";
import FAQ from "../FAQ/FAQ";
import Resources from "../Resources/Resources";

import HelpSupport from "../HelpSupport/HelpSupport";
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
import { isEqual } from "lodash";

const cdx_user = sessionStorage.getItem("cdx_user");

const App = () => {
  const [user, setUser] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const dispatch = useDispatch();

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
  const refreshCheckoutInterval = () => {
    if (user) {
      return setInterval(async () => {
        const checkedOutLocationResult = (await getCheckedOutLocations()).data;
        if (checkedOutLocationResult && !isEqual(checkedOutLocationResult, checkedOutLocationsCache)) {
          dispatch({
            type: types.SET_CHECKED_OUT_LOCATIONS,
            checkedOutLocations: checkedOutLocationResult,
          });
          checkedOutLocationsCache = checkedOutLocationResult;
        }
      }, 10000);
    }
  };

  useEffect(() => {
    const interval = refreshCheckoutInterval();
    return () => clearInterval(interval);// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
            path="/qa/tests"
            element={user
              ? <Navigate to="/workspace/qa/tests" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/qa/tests"
            element={!user
              ? <Navigate to="/qa/tests" replace />
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
            path="/qa/qce-tee"
            element={user
              ? <Navigate to="/workspace/qa/qce-tee" replace />
              : <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                />
            }
          />
          <Route
            path="/workspace/qa/qce-tee"
            element={!user
              ? <Navigate to="/qa/qce-tee" replace />
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
                  user={user}
                  workspaceSection={EMISSIONS_STORE_NAME}
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
                user={user}
                workspaceSection={EXPORT_STORE_NAME}
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
          <Route path="/tutorials" element={ComingSoon} />
          <Route path="/cam-api" element={ComingSoon} />
          <Route path="/glossary" element={ComingSoon} />
          <Route
            path="/reporting-instructions"
            element={ReportingInstructions}
          />
          <Route path={`/resources`} element={Resources} />
          <Route path={`/help-support`} element={HelpSupport} />
          <Route path="*" element={NotFound} />
        </Routes>
      </Layout>      
    </div>
  );
};

export default App;
