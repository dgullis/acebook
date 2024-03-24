# Content
- [Installation Instructions](#Installation-Instructions)
- [Architecture](#Architecture)
- [Front-end Structure](#Front-end-Structure)
- [Back-end Structure](#Back-end-Structure)
- [Authentication](#Authentication)
- [Technologies](#Technologies)


### Installation Instructions

If you haven't already, make sure you have node and NVM installed.

Install Node Version Manager (NVM).

`brew install nvm`

Install the latest version of Node.js, (20.5.0 at time of writing).

`nvm install 20`

Clone the repository into your chosen location

`git clone https://github.com/dgullis/acebook
`

Install dependencies for both the frontend and api applications:

```
cd frontend
npm install

cd ../api
npm install
```

Install MongoDB

```
brew tap mongodb/brew
brew install mongodb-community@6.0
```

Environment Variables

Create a file frontend/.env with the following environment variables:

```
VITE_BACKEND_URL
VITE_FB_API_KEY
VITE_FB_AUTH_DOMAIN
VITE_FB_PROJECT_ID
VITE_FB_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID
VITE_APP_ID
```

Create a file api/.env with the following environment variables:

```
MONGODB_URL
NODE_ENV
JWT_SECRET
```
Values will be provided by the production team.

Once environment variables are set you can run the app locally.

How to run the server and use the app

Start the server application (in the api directory) in dev mode:

```
cd api
npm run dev
```

Start the front end application (in the frontend directory)

In a new terminal session...

```
cd frontend
npm run dev
```

You should now be able to open your browser and go to http://localhost:5173/ to see the homepage


### Architecture

This application is comprised of two distinct pieces:

A backend API built with Express

A frontend built with React

The only way the frontend can communicate with the API is through HTTP requests over the network. The React front end sends HTTP requests to the backend API and receives JSON responses.

### Frontend Structure

main.jsx

This file joins the initial HTML document with the React application. 

App.jsx

This file contains our application. It imports all of the pages we want in our application, and uses React Router to serve them at specific URLs. Any request to any of these routes will be served the same HTML and JS files for the React application, and the application will then determine how to handle the route.

Pages

Pages represent individual views of our application. Such as the login page or the feed page. They are built up of smaller components, and may interact with the backend through services.

Components

Components represent smaller, reusable pieces of code. They can be atomic components, which are not usable on their own, or more complex components made up of other components. They can hold their own state, if useful. They may interact with the backend through services.

Services

Services encapsulate communication with the backend, through HTTP requests. They make our code easier to read and understand, by abstracting the complexity of the fetch requests into their own functions, so they don't clutter our components.

Assets

Assets are static, non-code resources, such as images.

### Backend Structure

index.js

This file starts our server. It does two things:

1. Connects to the mongodb database.
2. Starts our app, listening for incoming HTTP requests.

app.js

This file is where we create our application, using the framework Express. It does a few things:

Configures our application, setting up CORS settings, and making it so request bodies are automatically parsed.
Sets up our api routes at /users, /posts and /tokens, through the use of routers.
Sets up a 404 handler, a default response if a request has a nonexistent route.
Sets up an error handler, so that if something goes wrong in our application, the whole thing doesn't crash.

routes

Our routes define the different request URLs that our api will respond to. They also define which controllers will handle which requests.

We can create a router, and use it in app.js, and the resulting endpoint URL will be the combination of the two. So for example if we have this router:

controllers

Controllers contain the functions that handle the requests that our app recieves. Each controller has a req and res argument, which are objects representing the request that comes in, and the response we send back.

We can add data to the req object with middleware, such as the tokenChecker, which can then be used by controller functions.

models

Our models are classes that handle interaction with the database. We create our models using a library called Mongoose. Each model is created with a schema, which defines the shape of the data in the database, ie. what fields the entries in our database have.

The models we create have a number of built-in methods, such as .find(), .findOne() and .countDocuments().

All interaction with the database (fetching entries or saving them) is asynchronous, so must be used with await or a callback.

middleware

Middleware are similar to our controller handler functions, but don't necessarily end with a response. Instead they call a next method to pass on to the next handler.

For example, the tokenChecker middleware makes sure that the request has been sent with a vaild token. If it has, it passes on to the next handler, such as the posts router. If it has an invalid token, it will send an error response back to the client.

app.js also uses a couple of third-party middlewares, cors and bodyParser.

lib

The lib directory simply contains functions which can be used from anywhere in our app. This template starts with a single file in lib, containing functions for encoding and decoding tokens. This function is used by both the tokenChecker middleware, and in our tests.

db

This directory contains functions related to interaction with the database. 

### Authentication

Authentication Flow

A registered user submits their email address and password via the React front end.
The Express backend receives the data and tries to find a user in the DB with the same email address.
If a user is found, the password in the database is compared to the password that was submitted.
If the passwords match, a JSON Web Token is generated and returned, as part of the response.
The React frontend receives the token and holds on to it.
When the user logs out, the front end discards the token.

###  Technologies

- MongoDB - database
- Express - server framework
- React - user interface framework
- Node - JavaScript runtime environment 
- Vite - to generate the React Project
- Vitest - unit testing on the frontend
- Jest - unit testing on the backend
- Mongoose - model objects in MongoDB
- Nodemon - reload the server automatically
- Firebase - image storage


