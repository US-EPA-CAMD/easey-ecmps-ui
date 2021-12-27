# `EPA CAMD EASEY ECMPS UI`

[![GitHub](https://img.shields.io/github/license/US-EPA-CAMD/easey-ecmps-ui)](https://github.com/US-EPA-CAMD/easey-ecmps-ui/blob/develop/LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=US-EPA-CAMD_easey-ecmps-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=US-EPA-CAMD_easey-ecmps-ui)
[![Develop Branch Pipeline](https://github.com/US-EPA-CAMD/easey-ecmps-ui/workflows/Develop%20Branch%20Workflow/badge.svg)](https://github.com/US-EPA-CAMD/easey-ecmps-ui/actions)<br>
EPA Clean Air Markets Division (CAMD) Emissions Collection & Monitor Plan System (ECMPS) website application

## `Available Scripts`

View the available scripts for this project [here](https://github.com/US-EPA-CAMD/devops/blob/master/AVAILABLE_SCRIPTS.md)

## Environment Variables

Environment variables need to be prefixed by REACT*APP* in order for the variables to be accessible on the process.env object in JavaScript.

To run application on a specific route path other than root...

- PUBLIC_URL: https://((host))/((path))
- REACT_APP_EASEY_ECMPS_UI_PATH: /((path))

REST API URL's required by the application...

- REACT_APP_EASEY_AUTH_API: https://((host))/api/auth-mgmt
- REACT_APP_EASEY_MDM_API: https://((host))/api/master-data-mgmt
- REACT_APP_EASEY_FACILITIES_API: https://((host))/api/facility-mgmt
- REACT_APP_EASEY_EMISSIONS_API: https://((host))/api/emissions-mgmt
- REACT_APP_EASEY_MONITOR_PLAN_API: https://((host))/api/monitor-plan-mgmt

Other application environment variables:

- REACT_APP_EASEY_ECMPS_UI_HOST: ((host))
- REACT_APP_EASEY_ECMPS_UI_ENV: ((environment))
- REACT_APP_EASEY_ECMPS_UI_INACTIVITY_DURATION_MINUTES: ((inactivityDurationMinutes))
- REACT_APP_EASEY_ECMPS_UI_ACTIVITY_POLLING_FREQUENCY_SECONDS: ((activityPollingFrequencySeconds))
- REACT_APP_EASEY_ECMPS_UI_ACTIVITY_COUNTDOWN_DURATION_SECONDS: ((activityCountdownDurationSeconds))

Additional Environment Variable instructions found [here](https://github.com/US-EPA-CAMD/devops/blob/master/ENV_INSTRUCTIONS.md).

## License & Contributing

​
This project is licensed under the MIT License. We encourage you to read this project’s [License](https://github.com/US-EPA-CAMD/devops/blob/master/LICENSE), [Contributing Guidelines](https://github.com/US-EPA-CAMD/devops/blob/master/CONTRIBUTING.md), and [Code of Conduct](https://github.com/US-EPA-CAMD/devops/blob/master/CODE_OF_CONDUCT.md).

## Disclaimer
The United States Environmental Protection Agency (EPA) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use. EPA has relinquished control of the information and no longer has responsibility to protect the integrity , confidentiality, or availability of the information. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by EPA. The EPA seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by EPA or the United States Government.
