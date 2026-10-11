import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  role: string;
  organization?: string;
  domainProfile?: Record<string, any>;
  passwordHash?: string;
  avatarUrl?: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
      trim: true,
      index: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    domainProfile: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    passwordHash: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    provider: {
      type: String,
      default: 'email',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
