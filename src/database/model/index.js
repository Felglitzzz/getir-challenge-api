import mongoose, { Schema } from 'mongoose';

/**
 * Schema Definition for Records
 */
const RecordSchema = new Schema({
  key: String,
  value: String,
  createdAt: { type: Date, default: Date.now },
  counts: { type: [Number] },
});

export default mongoose.model('records', RecordSchema);
