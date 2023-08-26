import { SURVEY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const surveysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSurveys: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: SURVEY_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getSurveyDetails: builder.query({
      query: (surveyId) => ({
        url: `${SURVEY_URL}/${surveyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSurvey: builder.mutation({
      query: () => ({
        url: `${SURVEY_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Survey'],
    }),
    updateSurvey: builder.mutation({
      query: (data) => ({
        url: `${SURVEY_URL}/${data.surveyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Survey'],
    }),
    uploadSurveyImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `${SURVEY_URL}/${surveyId}`,
        method: 'DELETE',
      }),
      providesTags: ['Survey'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${SURVEY_URL}/${data.surveyId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Survey'],
    }),
    getTopSurveys: builder.query({
      query: () => `${SURVEY_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetSurveysQuery,
  useGetSurveyDetailsQuery,
  useCreateSurveyMutation,
  useUpdateSurveyMutation,
  useUploadSurveyImageMutation,
  useDeleteSurveyMutation,
  useCreateReviewMutation,
  useGetTopSurveysQuery,
} = surveysApiSlice;
