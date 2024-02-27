import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User } from "../types"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => {
        return {
          url: "users",
          method: "GET",
        }
      },
    }),
  }),
})

export const { useGetUsersQuery } = userApi
