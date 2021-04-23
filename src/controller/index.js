import { ResponseHandler } from '../utils';
import Record from '../database/model';

/**
 * @class
 * @classdesc Records Controller
 */
class RecordsController {
  /**
   * Get records from the database
   * @param {object} req
   * @param {object} res
   * @returns response object
   */
  async getRecords(req, res) {
    const payload = req.body;
    const { limit = 10, skip = 0 } = req.query;
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);
    const aggregationPipeline = [
      {
        $project: {
          totalCount: { $sum: '$counts' }, createdAt: 1, key: 1, _id: 0,
        },
      },
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          totalCount: { $gte: payload.minCount, $lt: payload.maxCount },
        },
      },
      {
        $facet: {
          metadata: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
              },
            },
          ],
          records: [
            { $sort: { createdAt: -1 } },
            { $skip: Number(skip) },
            { $limit: Number(limit) },
          ],
        },
      },
      { $project: { total: { $arrayElemAt: ['$metadata.total', 0] }, records: 1 } },
    ];

    const results = await Record.aggregate(aggregationPipeline);
    const [{ records, total }] = results;
    return res.status(201).send(new ResponseHandler(0, 'Success', records, total));
  }
}

export default new RecordsController();
