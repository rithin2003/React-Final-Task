
import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: [],
  reducers: {
    addMovie: (state, action) => {
      if (!state.some(movie => movie.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeMovie: (state, action) =>
      state.filter(movie => movie.id !== action.payload),
    clearWatchlist: () => []
  }
});

export const { addMovie, removeMovie, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
