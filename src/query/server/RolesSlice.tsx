import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";
import { getRolesResonse } from "@/src/types/rolesType";

const userRolesApi = createApi({
  reducerPath: "userrolesapi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUserRoles: builder.query<getRolesResonse, void>({
      query: () => ({
        url: "roles",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUserRolesQuery } = userRolesApi;
export { userRolesApi };
