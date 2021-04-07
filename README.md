# Description
Just visit the link and you will get all the weather information for next 7 days  [https://weather-helper.netlify.app](https://weather-helper.netlify.app) 
# Used APIs 
- darksky api to get all temprature details from endpoint [https://api.darksky.net/forecast/[API_KEY]/[latitude],[longitude]].
- BigData Cloud api to get city name using latitude and longitude from endpoint [https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=[latitude]&longitude=[longitude]&localityLanguage=en]

# Notes 
- Had to change darksky endpoint to get over the CORS problems from the server using  [https://cors.bridged.cc /[darksky endpoint]].
- Used BigData Cloud Api becouse it is free and didn't require any payment details, the documentation for endpoint is [here](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api)
- Used Media query to make the page is reponsive for all screens
- Test design and functionality on browsers(google chrome and firefox)
- Calculated Min and Max today temprature from data in hourly object (get array of attribute temprature in every hour
- Change temprature to celsius from equation `celsius = (fahrenheit - 32) * 5 / 9`  


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

