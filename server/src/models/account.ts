import mongoose, { Document, Schema } from "mongoose";

export interface IAccount {
  email: string;
  name: string;
  date: Date;
}

export interface IAccountModel extends IAccount, Document {}

const AccountSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IAccountModel>("Accounts", AccountSchema);
