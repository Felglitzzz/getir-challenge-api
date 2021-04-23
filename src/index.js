import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

import router from './routes';
import Database from './database';
import { handleError } from './middleware/error-handler';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-unused-vars
  const instance = new Database();
}

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/api/v1', router);
app.use(handleError);

const server = app.listen(PORT, () => {
  console.info(`API listening on port ${PORT}`);
});

const shutdown = (err) => {
  if (err) console.error(err);
  server.close();
  process.exit(1);
};

process.on('uncaughtException', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', shutdown);

export default app;
