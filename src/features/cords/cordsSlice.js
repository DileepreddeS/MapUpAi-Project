import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action creator
export const setLocation = (location) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${location}&polygon_geojson=1&format=json`
    );
    const data = response.data;
    
    dispatch(setLocationSuccess([data[0].lat, data[0].lon]));
  } catch (error) {
    console.log(error);
  }
  
};

export const cordsSlice = createSlice({
  name: "cords",
  initialState: {
    value: [22.3511148, 78.6677428],
  },
  reducers: {
    setLocationSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocationSuccess } = cordsSlice.actions;

export default cordsSlice.reducer;
