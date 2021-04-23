import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {
  env: {
    DATABASE_URL,
  },
} = process;

class Database {
  constructor() {
    this.databaseUrl = DATABASE_URL;
    this.connect();
  }

  /**
   * connects to mongo url
   */
  async connect() {
    await mongoose.connect(this.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.info('connected to database successfully');
  }
}

export default Database;
