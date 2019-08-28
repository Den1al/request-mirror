import { createServer } from 'net';
import { createResponseData, constructResponse } from './utils';

export class MirrorServer {
  constructor(port, host) {
    this.server = createServer();
    this.port = port;
    this.host = host;

    this.setup();
  }

  setup() {
    this.server.on('connection', this.handleConnection);
  }

  listen() {
    this.server.listen(this.port, this.host, () => {
      console.log(`server listening on ${this.host}:${this.port}`);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleConnection(connection) {
    const remoteAddress = `${connection.remoteAddress}:${
      connection.remotePort
    }`;
    console.log(`new connection from ${remoteAddress}`);

    connection.on('data', function(data) {
      console.log('connection data from %s', remoteAddress);

      const responseData = {
        ...createResponseData(data),
        address: connection.remoteAddress,
        port: connection.remotePort,
      };

      console.log(responseData);

      connection.write(constructResponse(responseData));
      connection.end();
    });

    connection.on('close', () => {
      console.log('connection from %s closed', remoteAddress);
    });

    connection.on('error', err => {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    });
  }
}
