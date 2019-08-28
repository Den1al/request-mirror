# request-mirror

## About
A server that reflects the client's request data. This is very useful when you want to inspect the HTTP behaviour of a certain HTTP client. In example, when requesting a resource to this server using `curl` with the following command:

```bash
$ curl -d "a:2" http://localhost:1337/lala/dada\?q\=1 | jq
```

We would get:

```json
{
  "meta": {
    "method": "POST",
    "path": "/lala/dada",
    "version": "HTTP/1.1"
  },
  "data": {
    "query": "q=1",
    "body": "a:2"
  },
  "headers": [
    [
      "Host",
      " localhost:1337"
    ],
    [
      "User-Agent",
      " curl/7.54.0"
    ],
    [
      "Accept",
      " */*"
    ],
    [
      "Content-Length",
      " 3"
    ],
    [
      "Content-Type",
      " application/x-www-form-urlencoded"
    ]
  ],
  "address": "127.0.0.1",
  "port": 57983
}
```

## Installation
After cloning this repo, simply install the dependencies with:
```bash
$ npm install
```

## Usage
### Basic
To run the server:
```bash
$ npm start
```

### PM2
To run the server with pm2 (recommended):
```bash
$ npm install -g pm2
$ pm2 start ecosystem.config
```

This will run the server in the background

## Notes
* The header values are the raw values (containing the space at the start).
* This server was written with a custom HTTP parser, that handles only the necessary components.
* This server was created for testing purposes only (use at your own responsability)