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
  type: {
    type: Number,
    required: true,
    min: 0,
  },
  data: {
    type: {},
    required: true,
  },
});

interface QuestionType {
  question: string;
  tags: string[];
  type: number;
  data: {
    choice?: {
      choices: string[];
      correct: number;
    };
    gaps?: {
      content: string;
      regex: boolean;
    }[];
    pairs?: {
      first: string;
      second: string;
    };
  };
}

export default (models.Question as Model<QuestionType>) ||
  model<QuestionType>("Question", questionSchema);
