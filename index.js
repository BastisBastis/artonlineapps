require('dotenv').config();
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const path=require("path")

// Setup
const app = express();
const port = process.env['REACT_APP_PORT'];

if (process.env.NODE_ENV==="development") {

  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: false,
    watchOptions: {
      // Due to iOS devices memory constraints
      // disabling file watching is recommended 
      //ignored: true
    }
  });
  app.use(middleware);
} else if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, 'dist')));

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Set up API
const skissaRoutes=require("./server/skissa-routes");
skissaRoutes.setupRoutes(app);

const pitchyRoutes=require("./server/pitchy-routes")
pitchyRoutes.setupRoutes(app);


//Main route
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Launch app
app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );
});

/*
// Register app and middleware. Required for better
// performance when running from play.js

//try { pjs.register(app, middleware); } catch (error) { }
*/