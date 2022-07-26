**_SETUP_**

'npm install' - Installs npm modules in the local directory which are required to run this react app.

'npm start' - Runs the react app locally on a development server at localhost:3000

**_Features_**

A react app created for an SSE signoff, created using react.js. It is a simple counters app which allows users to add counters, increase / set their value and delete them. The app has the following features:

    - Allows users to specify and add multiple counters
    - Allows users to specify a value and add it to a counters current value
    - Users can specify a value and set the counter to this value
    - Counters can be deleted by the user
    - Counters are automatically refreshed every second meaning their value is always up to date.

**_Functions / Components_**

There are 2 components within the app, one for each individual counter which the user creates, and another one for the main bulk of the app, including all of the functions.

There are functions for, getting values, adding values, setting values, refreshing values and updating the counters array. As well as a use effect function for updating all of the counters once per second to refresh their values.
