import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteChannel: {},
};

const favouriteChannelSlice = createSlice({
  name: "favouriteChannel",
  initialState,
  reducers: {
    setFavouriteChannel(state, action) {
      const { channelId, channelName } = action.payload.favouriteChannel;
      state.favouriteChannel[channelId] = channelName;
    },
    removeFavouriteChannel(state, action) {
      const { channelId } = action.payload.favouriteChannel;
      delete state.favouriteChannel[channelId];
    },
  },
});

export const { setFavouriteChannel, removeFavouriteChannel } =
  favouriteChannelSlice.actions;
export default favouriteChannelSlice.reducer;
