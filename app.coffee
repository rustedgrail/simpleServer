#!/usr/bin/env coffee

express = require 'express'
http = require 'http'
https = require 'https'
fs = require 'fs'
path = require 'path'

ports = []
key = ''
cert = ''

process.argv.forEach (val, index, array) ->
  if (+ val)
    ports.push val
  else
    ext = path.extname(val)
    if ext == '.key'
      key = fs.readFileSync val
    else if ext == '.crt'
      cert = fs.readFileSync val

secure = key && cert
if ports.length == 0
  ports.push if secure then 443 else 80

app = express()

options = { key, cert }

app.use express.static process.cwd()

for port in ports
  if secure
    https.createServer(options, app).listen port
  else
    http.createServer(app).listen port
