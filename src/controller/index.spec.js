import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';

import RecordTestFixtures from '../utils/fixtures';

const testUri = 'mongodb://localhost:27017/records';
const server = request(app);

describe('Records', () => {
  let connection;

  beforeAll(async () => {
    await mongoose.connect(testUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection
      .once('open', () => console.info('connected to test database'))
      .on('error', (error) => {
        console.error('Error occurred connecting to test database : ', error);
      });
  });

  beforeEach(async () => {
    connection = mongoose.connection;
  });

  afterEach(async () => RecordTestFixtures.purge());

  afterAll(async () => {
    await connection.close();
  });

  describe('GET /api/v1/records', () => {
    it('should throw error if startDate is not passed to the request body', async () => {
      const response = await server
        .get('/api/v1/records')
        .send({
          endDate: '2016-02-02',
          minCount: 2700,
          maxCount: 3000,
        });
      expect(response.body?.code).toEqual(1);
      expect(response.body?.msg).toEqual('"startDate" is required');
    });

    it('should throw error if endDate is not passed to the request body', async () => {
      const response = await server
        .get('/api/v1/records')
        .send({
          startDate: '2016-02-02',
          minCount: 2700,
          maxCount: 3000,
        });
      expect(response.body?.code).toEqual(1);
      expect(response.body?.msg).toEqual('"endDate" is required');
    });

    it('should throw error if minCount is not passed to the request body', async () => {
      const response = await server
        .get('/api/v1/records')
        .send({
          startDate: '2016-02-02',
          endDate: '2018-02-02',
          maxCount: 3000,
        });
      expect(response.body?.code).toEqual(1);
      expect(response.body?.msg).toEqual('"minCount" is required');
    });

    it('should throw error if maxCount is not passed to the request body', async () => {
      const response = await server
        .get('/api/v1/records')
        .send({
          startDate: '2016-02-02',
          endDate: '2018-02-02',
          minCount: 2700,
        });
      expect(response.body?.code).toEqual(1);
      expect(response.body?.msg).toEqual('"maxCount" is required');
    });

    it('should return empty array if no record', async () => {
      const response = await server
        .get('/api/v1/records')
        .send({
          startDate: '2016-01-16',
          endDate: '2016-02-02',
          minCount: 2700,
          maxCount: 3000,
        });
      expect(response.body?.code).toEqual(0);
      expect(response.body?.msg).toEqual('Success');
      expect(response.body?.records).toEqual([]);
    });

    it('should return records with filters', async () => {
      const counts = [100, 1000, 1800];
      const createdAt = new Date(2017, 1, 5).toISOString();
      const length = 3;

      await RecordTestFixtures.add(length, { createdAt, counts });

      const response = await server
        .get('/api/v1/records')
        .send({
          startDate: '2016-01-16',
          endDate: '2018-02-02',
          minCount: 2700,
          maxCount: 3000,
        });

      expect(response.body?.code).toEqual(0);
      expect(response.body?.msg).toEqual('Success');
      expect(response.body.totalRecordCount).toEqual(length);
    });

    it('should return paginated records with filters', async () => {
      const counts = [100, 1000, 1800];
      const createdAt = new Date(2017, 1, 5).toISOString();
      const length = 3;
      const limit = 2;
      await RecordTestFixtures.add(3, { createdAt, counts });

      const response = await server
        .get(`/api/v1/records?skip=0&limit=${limit}`)
        .send({
          startDate: '2016-01-16',
          endDate: '2018-02-02',
          minCount: 2700,
          maxCount: 3000,
        });

      expect(response.body?.code).toEqual(0);
      expect(response.body?.msg).toEqual('Success');
      expect(response.body?.records?.length).toEqual(limit);
      expect(response.body.totalRecordCount).toEqual(length);
    });
  });
});
