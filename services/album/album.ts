import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User, Album, UserAlbums } from "../types"

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  endpoints: (builder) => ({
    getAlbum: builder.query<Album[], User>({
      query: (user: User) => {
        return {
          url: `albums?userId=${user.id}`,
          method: "GET",
        }
      },
    }),
    getAlbums: builder.query<UserAlbums[], User[]>({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        if (arg) {
          return {data: Promise.all(arg.map(async (user: User) => {
            const result = await fetchWithBQ(`albums?userId=${user.id}`)
            if (result.error) {
              return { error:  result.error as FetchBaseQueryError}
            }
            const album = result.data as Album[]
            return {
              title: user.username,
              data: album
            }
          }))
        }}
      return []
      }
    }),
  }),
})

export const { useGetAlbumQuery, useGetAlbumsQuery } = albumApi
export default albumApi
