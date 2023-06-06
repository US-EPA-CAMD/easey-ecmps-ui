import { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import TagManager from "react-gtm-module";
import ComingSoon from "../ComingSoon/ComingSoon";
import NotFound from "../NotFound/NotFound";
import AboutHome from "../AboutHome/AboutHome";
import Layout from "../Layout/Layout";
import MonitoringPlanHome from "../MonitoringPlanHome/MonitoringPlanHome";
import { ErrorSuppression } from "../ErrorSuppression/ErrorSuppression";
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
import { currentDateTime } from "../../utils/functions";
import WhatHasData from "../WhatHasData/WhatHasData";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [currentLink, setCurrentLink] = useState(
    window.location.href.replace(`${window.location.origin}`, "")
  );

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
    "workspace/qa/tests",
    "workspace/qa/qce-tee",
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

    setUser(ecmpsUser?.firstName ? ecmpsUser : false);

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
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={<AboutHome user={user} setCurrentLink={setCurrentLink} />}
          />
          <Route
            path="/monitoring-plans"
            element={
              user ? (
                <Navigate to="/workspace/monitoring-plans" />
              ) : (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/monitoring-plans"
            element={
              !user ? (
                <Navigate to="/monitoring-plans" />
              ) : (
                <MonitoringPlanHome
                  user={user}
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  workspaceSection={MONITORING_PLAN_STORE_NAME}
                  moduleName={modules.monitoring_plans_module}
                />
              )
            }
          />
          <Route
            path="/qa/tests"
            element={
              user ? (
                <Navigate to="/workspace/qa/tests" />
              ) : (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/qa/tests"
            element={
              !user ? (
                <Navigate to="/qa/tests" />
              ) : (
                <MonitoringPlanHome
                  user={user}
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  workspaceSection={QA_CERT_TEST_SUMMARY_STORE_NAME}
                  moduleName={modules.qa_Certifications_Test_Summary_Module}
                />
              )
            }
          />
          <Route
            path="/qa/qce-tee"
            element={
              user ? (
                <Navigate to="/workspace/qa/qce-tee" />
              ) : (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/qa/qce-tee"
            element={
              !user ? (
                <Navigate to="/qa/qce-tee" />
              ) : (
                <MonitoringPlanHome
                  user={user}
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  workspaceSection={QA_CERT_EVENT_STORE_NAME}
                  moduleName={modules.qa_Certifications_Event_Module}
                />
              )
            }
          />
          <Route
            path="/emissions"
            element={
              user ? (
                <Navigate to="/workspace/emissions" />
              ) : (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={EMISSIONS_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/emissions"
            element={
              !user ? (
                <Navigate to="/emissions" />
              ) : (
                <MonitoringPlanHome
                  user={user}
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  workspaceSection={EMISSIONS_STORE_NAME}
                  moduleName={modules.emissions_module}
                />
              )
            }
          />
          <Route
            path="/export"
            element={
              user ? (
                <Navigate to="/workspace/export" />
              ) : (
                <MonitoringPlanHome
                  user={false}
                  workspaceSection={EXPORT_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/export"
            user={user}
            element={
              !user ? (
                <Navigate to="/export" />
              ) : (
                <MonitoringPlanHome
                  user={user}
                  resetTimer={setResetTimer}
                  setExpired={setExpired}
                  resetTimerFlag={resetTimer}
                  callApiFlag={expired}
                  workspaceSection={EXPORT_STORE_NAME}
                />
              )
            }
          />
          <Route
            path="/workspace/evaluate"
            element={
              !user ? (
                <Navigate to="/" />
              ) : (
                <EvaluateAndSubmit user={user} componentType="Evaluate" />
              )
            }
          />
          <Route
            path="/workspace/submit"
            element={
              !user ? (
                <Navigate to="/" />
              ) : (
                <EvaluateAndSubmit user={user} componentType="Submission" />
              )
            }
          />
          <Route
            path="/admin/qa-maintenance"
            element={!user ? <Navigate to="/" /> : <ComingSoon />}
          />
          <Route
            path="/admin/error-suppression"
            element={
              !user ? <Navigate to="/" /> : <ErrorSuppression user={user} />
            }
          />
          <Route
            path="/admin/em-submission-access"
            element={!user ? <Navigate to="/" /> : <ComingSoon />}
          />
          <Route
            path="/reports"
            element={
              user ? <Navigate to="/workspace/reports" /> : <ReportGenerator />
            }
          />
          <Route
            path="/workspace/reports"
            element={
              !user ? (
                <Navigate to="/reports" />
              ) : (
                <ReportGenerator requireAuth={true} user={user} />
              )
            }
          />
          <Route path={`/faqs`} element={<FAQ />} />
          <Route path="/tutorials" element={<ComingSoon />} />
          <Route path="/cam-api" element={<ComingSoon />} />
          <Route path="/glossary" element={<ComingSoon />} />
          <Route
            path="/reporting-instructions"
            element={<ReportingInstructions />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/what-has-data" element={<WhatHasData />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
