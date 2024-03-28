
import express from 'express';
import next from 'next';
import bodyParser from "body-parser";
import cors from "cors";
import expRoutes from './expressRoutes/routes.js';

import http from 'http';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Your Express app
const expressApp = express();
expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

expressApp.use(expRoutes);

// Define Next.js request handler
app.prepare().then(() => {
  const server = http.createServer(serverCallback); // Create server using serverCallback

  function serverCallback(req, res) {
    if (req.url.startsWith('/api/')) {
      return expressApp(req, res);
    }
    return handle(req, res);
  }

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${3000}`);
  });
});
