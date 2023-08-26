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
      query: (SurveyId) => ({
        url: `${SURVEY_URL}/${SurveyId}`,
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
        url: `${SURVEY_URL}/${data.SurveyId}`,
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
      query: (SurveyId) => ({
        url: `${SURVEY_URL}/${SurveyId}`,
        method: 'DELETE',
      }),
      providesTags: ['Survey'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${SURVEY_URL}/${data.SurveyId}/reviews`,
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
