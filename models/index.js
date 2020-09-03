import mongoose from 'mongoose';

const dbSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
});

const db = mongoose.model('grade', dbSchema);

db.mongoose = mongoose;

db.url = process.env.MONGODB;

export { db };
