import joi from 'joi';

export class ResponseHandler {
  constructor(code, message, records, count) {
    this.code = code;
    this.msg = message;
    this.records = records || undefined;
    this.totalRecordCount = count || undefined;
  }
}

export const recordRequestSchema = joi.object().keys({
  startDate: joi.string().required(),
  endDate: joi.string().required(),
  minCount: joi.number().required(),
  maxCount: joi.number().required(),
});
