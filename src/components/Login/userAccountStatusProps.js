import config from "../../config";

const userAccountStatusProps = {
    _SIGNUP: {
        title: "Register with CDX",
        verbiage: "You must have a CDX account to use ECMPS. Select the \"Proceed to CDX\" button below to go to CDX to create your CDX account.",
        buttonLabel: "Register with CDX"
    },
    _MIGRATE: {
        title: "Your CDX account must be migrated",
        verbiage: "Agency-wide mandates require your CDX account to be migrated to a new login method. Select the \"Proceed to CDX\" button below to go to CDX to migrate your account to Login.gov. Once migrated, you will no longer need your CDX password to login and will instead use your Login.gov credentials for authentication.",
        buttonLabel: "Proceed to CDX"
    },
    _SIGNIN: {
        title: "Leaving ECMPS",
        verbiage: "You are being redirected to Login.gov for authentication and will return to ECMPS upon successful login.",
        buttonLabel: "Sign In"
    },
    _DEFAULT: {
        title: "Leaving ECMPS",
        verbiage: "You are being redirected to Login.gov for authentication and will return to ECMPS upon successful login.",
        buttonLabel: "Sign In"
    }
};

export default userAccountStatusProps;