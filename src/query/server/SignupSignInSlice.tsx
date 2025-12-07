import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseurl/axiosBaseQuery";
import BASE_URL from "../baseurl/base_url";
import {
  loginProps,
  signupProps,
  SignUpResponse,
} from "@/src/types/SignupSingInType";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;

  id: string;
  username: string;
  role: string;
}

const SignInSinUpApi = createApi({
  reducerPath: "signInSignUpapi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignUpResponse, signupProps>({
      query: (body) => ({
        url: "users/signup",
        method: "POST",
        data: body,
      }),
    }),

    login: builder.mutation<LoginResponse, loginProps>({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        data: body,
      }),
    }),
  }),
});
export const { useSignupMutation, useLoginMutation } = SignInSinUpApi;
export { SignInSinUpApi };
