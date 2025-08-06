import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import debugMiddleware from '../_server/debugMiddleware.js';
import routes from './routes.js';

const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const PORT = process.env.ADMIN_SERVER_PORT;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4321', process.env.ADMIN_SITE_URL],
  methods: ['GET', 'POST']
}));

// Global Middleware
if (isDev) app.use(debugMiddleware);

// Routing
app.use('/', routes);

// Start Express Server
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log(`> admin server up @ ${PORT}`);
});