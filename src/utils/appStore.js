import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import connectionSlice from "./connectionSlice";
import requestsSlice from "./requestsSlice";
import feedSlice from "./feedSlice";

const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice,
        requests: requestsSlice,
    },
});

export default appStore;
