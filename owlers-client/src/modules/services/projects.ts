// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Project } from "../types";
import { REACT_APP_BACKEND_API } from "../../constants";

// Define a service using a base URL and expected endpoints
export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BACKEND_API }),
  endpoints: (builder) => ({
    getProjects: builder.query<any, number>({
      query: (page: number) => `api/projects?page=${page}`,
    }),
    getProject: builder.query<{ success: boolean; data: Project }, string>({
      query: (id: string) => `api/projects/${id}`,
    }),
    owl: builder.mutation<{ success: boolean; data: any }, Partial<any>>({
      query(body) {
        return {
          url: `api/projects/${body.id}/owl`,
          method: "POST",
          body,
        };
      },
    }),
    search: builder.query<{ success: boolean; data: Project }, string>({
      query: (query: string) => `api/projects/search?q=${query}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useOwlMutation,
  useLazyGetProjectQuery,
  useLazySearchQuery
} = projectsApi;
