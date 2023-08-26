import { SURVEY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const surveysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSurveys: builder.query({
      query: () => ({
        url: SURVEY_URL,
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
      query: (data) => ({
        url: `${SURVEY_URL}`,
        method: 'POST',
        body: data,
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
    deleteSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `${SURVEY_URL}/${surveyId}`,
        method: 'DELETE',
      }),
      providesTags: ['Survey'],
    }),
  }),
});

export const {
  useGetSurveysQuery,
  useGetSurveyDetailsQuery,
  useCreateSurveyMutation,
  useUpdateSurveyMutation,
  useDeleteSurveyMutation,
} = surveysApiSlice;
