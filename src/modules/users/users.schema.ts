import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
}
