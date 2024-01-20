// Set up empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middlewear */
// Configure express to sue body-parser as middle-ware.
AudioParamMap.arguments(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialise the main project folder
app.use(express.static("website"));

// Setup Server
