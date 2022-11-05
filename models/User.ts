import { Schema, model, models, Model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pictureUrl: String,
  permission: {
    type: Number,
    required: true,
  },
});

interface UserSchemaType {
  email: string;
  username: string;
  password: string;
  pictureUrl?: string;
}

export default (models.User as Model<UserSchemaType>) ||
  model<UserSchemaType>("User", userSchema);
