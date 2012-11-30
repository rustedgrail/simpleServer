#!/usr/bin/env node

// Generated by CoffeeScript 1.4.0
(function() {
  var app, cert, express, fs, http, https, key, options, path, port, ports, secure, _i, _len;

  express = require('express');

  http = require('http');

  https = require('https');

  fs = require('fs');

  path = require('path');

  ports = [];

  key = '';

  cert = '';

  process.argv.forEach(function(val, index, array) {
    var ext;
    if (+val) {
      return ports.push(val);
    } else {
      ext = path.extname(val);
      if (ext === '.key') {
        return key = fs.readFileSync(val);
      } else if (ext === '.crt') {
        return cert = fs.readFileSync(val);
      }
    }
  });

  secure = key && cert;

  if (ports.length === 0) {
    ports.push(secure ? 443 : 80);
  }

  app = express();

  options = {
    key: key,
    cert: cert
  };

  app.use(express["static"](process.cwd()));

  for (_i = 0, _len = ports.length; _i < _len; _i++) {
    port = ports[_i];
    if (secure) {
      https.createServer(options, app).listen(port);
    } else {
      http.createServer(app).listen(port);
    }
  }

}).call(this);
