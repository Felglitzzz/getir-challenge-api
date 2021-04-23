import { recordRequestSchema, ResponseHandler } from '../utils';

class Validator {
  /**
   * validates request body to get records
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   * @returns
   */
  requestValidator(req, res, next) {
    const { error } = recordRequestSchema.validate(req.body);
    if (error) return res.status(400).send(new ResponseHandler(1, error?.message));
    next();
  }
}

export default new Validator();
