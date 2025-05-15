import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import debugMiddleware from './debugMiddleware.js';
import routes from './routes.js';

const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const WEB_PORT = process.env.PUBLIC_SERVER_PORT;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4321', process.env.PUBLIC_SITE_URL],
  methods: ['GET', 'POST']
}));

// Global Middleware
if (isDev) app.use(debugMiddleware);

// Routing
app.use('/', routes);

// Start Express Server
app.listen(WEB_PORT, function (err) {
  if (err) console.error(err);
  console.log(`> web server up @ ${WEB_PORT}`);
});