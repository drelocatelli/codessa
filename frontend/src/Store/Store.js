import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authentication/AuthReducer";

export default configureStore({
    reducer: {
        authentication: AuthReducer
    }
});