import { Schema, model, models, Model } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  data: {
    type: {},
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
});

export interface QuestionType {
  question: string;
  tags: string[];
  data:
    | {
        choices?: string[];
        correct?: number;
      }
    | {
        content: string;
        position: number;
        regex: boolean;
      }[];
  author_id: string;
}

export default (models.Question as Model<QuestionType>) ||
  model<QuestionType>("Question", questionSchema);
