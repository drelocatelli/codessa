import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authentication/AuthReducer";
import PostReducer from "./Posts/PostReducer";

export default configureStore({
    reducer: {
        authentication: AuthReducer,
        PostReducer
    }
});