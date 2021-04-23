import { Chance } from 'chance';
import RecordModel from '../database/model';

const chance = new Chance();

class RecordTestFixtures {
  async add(number, metadata) {
    const records = [];
    for (let i = 0; i < number; i += 1) {
      const record = RecordModel.create({
        key: chance.string(),
        createdAt: metadata?.createdAt || new Date().toISOString(),
        value: chance.string(),
        counts: metadata?.counts || [chance.integer(), chance.integer(), chance.integer()],
      });
      records.push(record);
    }
    await Promise.all(records);
  }

  async purge() {
    await RecordModel.remove();
  }
}

export default new RecordTestFixtures();
