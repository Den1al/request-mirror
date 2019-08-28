import { MirrorServer } from './lib/server';

function main() {
  const server = new MirrorServer(1337, '127.0.0.1');
  server.listen();
}

main();
