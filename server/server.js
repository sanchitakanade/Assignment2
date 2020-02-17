/*
Name: Sanchita Kanade
Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
Assignment: 2
File: server.js
*/
const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);
app.listen(3000, function () {
    console.log('App started on port 3000');
  });