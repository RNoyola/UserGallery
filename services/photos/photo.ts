import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Photo } from "../types"

export const photoApi = createApi({
  reducerPath: "photoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], number>({
      query: (albumId: number) => {
        return {
          url: `photos?albumId=${albumId}`,
          method: "GET",
        }
      },
    }),
    getAllPhotos: builder.query<Photo[], void>({
      query: () => {
        return {
          url: `photos`,
          method: "GET",
        }
      },
    }),
  }),
})

export const { useGetAllPhotosQuery, useGetPhotosQuery } = photoApi
