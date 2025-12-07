import { configureStore } from "@reduxjs/toolkit";
import { userRolesApi } from "../query/server/RolesSlice";
import { SignInSinUpApi } from "../query/server/SignupSignInSlice";

import authReducer from "@/src/utils/authSlice"
const store = configureStore({
    reducer: {

        // API Reducers 

        [userRolesApi.reducerPath]: userRolesApi.reducer,
        [SignInSinUpApi.reducerPath]: SignInSinUpApi.reducer,


        // Client Reducers 
        auth: authReducer



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userRolesApi.middleware)
            .concat(SignInSinUpApi.middleware)

});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;