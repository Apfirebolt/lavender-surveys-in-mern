import mongoose from 'mongoose';

const optionSchema = mongoose.Schema(
    {
        heading: { type: String, required: true },
    },
);

const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    options: [optionSchema],
  },
  {
    timestamps: true,
  }
);

const surveySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    numResponses: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
