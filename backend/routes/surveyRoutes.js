import express from 'express';
const router = express.Router();
import {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  createSurveyReview,
  getTopSurveys,
} from '../controllers/surveyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getSurveys).post(protect, admin, createSurvey);
router.route('/:id/reviews').post(protect, createSurveyReview);
router.get('/top', getTopSurveys);
router
  .route('/:id')
  .get(getSurveyById)
  .put(protect, admin, updateSurvey)
  .delete(protect, admin, deleteSurvey);

export default router;
