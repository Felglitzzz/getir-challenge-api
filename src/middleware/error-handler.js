import { ResponseHandler } from '../utils';

// eslint-disable-next-line no-unused-vars
export const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send(new ResponseHandler(1, message));
};
