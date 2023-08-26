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
  const survey = new Survey({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdSurvey = await survey.save();
  res.status(201).json(createdSurvey);
});

// @desc    Update a survey
// @route   PUT /api/surveys/:id
// @access  Private/Admin
const updateSurvey = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const survey = await Survey.findById(req.params.id);

  if (survey) {
    survey.name = name;
    survey.price = price;
    survey.description = description;
    survey.image = image;
    survey.brand = brand;
    survey.category = category;
    survey.countInStock = countInStock;

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

// @desc    Create new review
// @route   POST /api/surveys/:id/reviews
// @access  Private
const createSurveyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const survey = await Survey.findById(req.params.id);

  if (survey) {
    const alreadyReviewed = survey.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Survey already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    survey.reviews.push(review);

    survey.numReviews = survey.reviews.length;

    survey.rating =
      survey.reviews.reduce((acc, item) => item.rating + acc, 0) /
      survey.reviews.length;

    await survey.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Survey not found');
  }
});

// @desc    Get top rated surveys
// @route   GET /api/surveys/top
// @access  Public
const getTopSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({}).sort({ rating: -1 }).limit(3);

  res.json(surveys);
});

export {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  createSurveyReview,
  getTopSurveys,
};
