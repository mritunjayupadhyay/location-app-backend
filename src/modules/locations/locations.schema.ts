import * as mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export interface ILocation extends mongoose.Document {
  userId: string;
  latitude: string;
  longitude: string;
  address: string;
}
