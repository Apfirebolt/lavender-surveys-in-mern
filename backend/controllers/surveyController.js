import asyncHandler from '../middleware/asyncHandler.js';
import Survey from '../models/surveyModel.js';

// @desc    Fetch all surveys
// @route   GET /api/surveys
// @access  Public
const getSurveys = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Survey.countDocuments({ ...keyword });
  const surveys = await Survey.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ surveys, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single survey
// @route   GET /api/surveys/:id
// @access  Public
const getSurveyById = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  if (survey) {
    return res.json(survey);
  }
  res.status(404);
  throw new Error('Resource not found');
});

// @desc    Create a survey
// @route   POST /api/surveys
// @access  Private/Admin
const createSurvey = asyncHandler(async (req, res) => {
  const { title, category, description } =
    req.body;
  const survey = new Survey({
    title,
    category,
    user: req.user._id,
    description,
  });

  const createdSurvey = await survey.save();
  res.status(201).json(createdSurvey);
});

// @desc    Update a survey
// @route   PUT /api/surveys/:id
// @access  Private/Admin
const updateSurvey = asyncHandler(async (req, res) => {
  const { title, category, description } =
    req.body;

  const survey = await Survey.findById(req.params.id);
  
  if (survey) {
    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.category = category || survey.category;

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Delete a survey
// @route   DELETE /api/surveys/:id
// @access  Private/Admin
const deleteSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (survey) {
    await Survey.deleteOne({ _id: survey._id });
    res.json({ message: 'Survey removed' });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});


export {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
