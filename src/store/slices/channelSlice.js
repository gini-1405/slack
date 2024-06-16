import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChannel: [],
  loading: true,
};
export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannel(state, action) {
      state.currentChannel = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
// RISHABH GOEL 2K22/CO/365
export const { setChannel, setLoading } = channelSlice.actions;
export default channelSlice.reducer;
