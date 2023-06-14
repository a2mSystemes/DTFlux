const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ port: 8080 });
let data = { message: 'Hello, World!' };
 wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.send(JSON.stringify(data));
});
 app.get('/data', (req, res) => {
  res.send(data);
});
 const server = app.listen(3000, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});
 wss.on('close', () => {
  console.log('WebSocket client disconnected');
});