import express from 'express';
const router = express.Router();
import {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
} from '../controllers/surveyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getSurveys).post(protect, createSurvey);
router
  .route('/:id')
  .get(getSurveyById)
  .put(protect, updateSurvey)
  .delete(protect, deleteSurvey);

export default router;
