# Experience-Room Player | XPR
This project is ment to be installed and run on localhost. It uses supabase to give the option to save programs in an online database but it is not requird since it also allows to save the program localy as json with a button click.

## Links:
 - More about the project [portfolio](https://portfolio.fh-salzburg.ac.at/projects/2023-experience-room)
 - Public page [https://taosy.art](https://taosy.art)

### technologies
- SocketIO and Express api endpoint for the server.
- ReactJS for the client frontend.
- SocketIO between the Server and the React Client.
- zustand for global state management in the frontent client.
- Arduino Tech and Sketches for the hardware that comunicates via http with the express api endpoint on the server. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

1. Install `node.js`.
2. run `npm i` in the project folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run server`

To start the server for the backend.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
