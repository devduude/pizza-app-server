import Hapi from '@hapi/hapi';

import routes from './routes.js';

const server = Hapi.server({
  port: process.env.PORT || 3030,
  host: process.env.HOST || 'localhost',
  routes: { cors: { origin: [ '*' ] } },
});

async function init () {
  await server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

/**
 * Process event,
 * Triggered by Ctrl+C
 * Stops the server
 */
process.on('SIGINT', () => {
  console.log('Stopping the server');

  server.stop({ timeout: 10 * 1000 })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
});

/**
 * Process event,
 * Triggered by unhandled rejection
 * Stops the server
 */
process.on('unhandledRejection', (err) => {
  console.error(err);
  console.log('unhandledRejection', err, 'error');

  server.stop({ timeout: 10 * 1000 })
    .finally(() => process.exit(1));
});


export default init;
