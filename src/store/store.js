import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import channelReducer from "./slices/channelSlice";
import favouriteChannelReducer from "./slices/setfavouriteChannelSlice"; // Correct import

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    favouriteChannel: favouriteChannelReducer,
  },
});

export default store;
