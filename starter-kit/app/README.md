# `US EPA CAMD React Starter App`

## `Available Scripts`

From within the `app` project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
* Open [http://localhost:3000](http://localhost:3000) to view Home page.
* Open [http://localhost:3000/posts](http://localhost:3000/posts) to view Posts page.
* Open [http://localhost:3000/tasks](http://localhost:3000/tasks) to view Tasks page.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

-----------------------------------------------------------------------------------------

# Environment Variables
Environment variables need to be prefixed by REACT_APP_ in order for the variables to be accessible on the process.env object in JavaScript.

### Specifying Environments
Create React App does not allow to change the value of the NODE_ENV environment variable. The npm start command will set the NODE_ENV to development, the npm test command will set the NODE_ENV to test, and the npm run build command sets the NODE_ENV to production.

Given that the NODE_ENV is set for you and that the value for NODE_ENV is used to reconcile the correct .env file, the following .env files can be used:

* .env
* .env.local (loaded for all environments except test)
* .env.development, .env.test, .env.production
* .env.development.local, .env.test.local, .env.production.local

### Order of priority/inheritance
The order of priority and inheritance is exactly the same as that described for the parcel bundler:

* .env.${NODE_ENV}.local
* .env.${NODE_ENV}
* .env.local
* .env

### Additional environments
To use environment variables for environments other than development, test, and production, you can create additional .env files and load the correct .env file using env-cmd.

To take a staging environment as an example:

* Create a .env.staging file and add environment variables to the file
* Add env-cmd as a project dependency (npm install env-cmd --save)
* Create script commands for the staging environment
* Run the start:staging or build:staging command to start a local staging environment or
  to build the staging environment bundle

It's important to note that the NODE_ENV will still be set to development when running the npm start command and the NODE_ENV will be set to production when running the npm run build command, so environment variables can still be loaded from either .env.development or .env.production depending on the command used.

For example, running the start:staging command from above would load environment variables from the following files (in order of priority):

* .env.staging
* .env.development.local
* .env.development
* .env.local
* .env

Reference - https://www.robertcooper.me/front-end-javascript-environment-variables