A simple way to serve either secure or non-secure files on any port.  Just run nodeServer [port] [cert file] [key file].  If no ports are included files will be served on port 80 for http and port 443 for https.  To use https, just include a cert and key file.

The makeKeys file will generate keys for you and put them in ssl/server.crt and ssl/server.key.  Just follow the prompts.
