import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from  "./slices/projects";
import walletReducer from  "./slices/wallet";
import { projectsApi } from "../services/projects";
import { decisionsApi } from "../services/decisions";
import { setupListeners } from '@reduxjs/toolkit/query';
import uiReducer from "./slices/ui";

export const store = configureStore({
    reducer: {
        [projectsApi.reducerPath]: projectsApi.reducer,
        [decisionsApi.reducerPath]: decisionsApi.reducer,
        projects: projectsReducer,
        wallet: walletReducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectsApi.middleware, decisionsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);
