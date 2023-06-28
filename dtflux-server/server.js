// ************************************************************ 
// This file is part of DT-Flux Project. 
// It is subject to the license terms in the LICENSE file found 
// in the top-level directory of this distribution 
// and at https://github.com/a2mSystemes/DTFlux/blob/master/LICENSE. 
// No part of DT-Flux Project, including this file, 
// may be copied, modified, propagated, or distributed except 
// according to the terms contained in the LICENSE file.
// ************************************************************ 

const express = require('express');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 3001})
const app = express();
// const model = require('./model');

app.use((req, res, next) => {
// load websocket in requests.
  req.wss = wss;
  req.model = model;
  next();
})

const apiRouter = require('./routes/api');
const displayRouter = require('./routes/displays');

app.use("/dt-api/v1/", apiRouter);
app.use("/displays/", displayRouter);

 const server = app.listen(3000, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});