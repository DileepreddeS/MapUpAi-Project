import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action creator
export const setLocationData = (location) => async (dispatch) => {
  try {
    console.log(location);
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${location}`
    );
    const data = response.data;

    dispatch(
      setLocationDataSuccess({
        name: data[0].name.common,
        currencySymbol:
          data[0].currencies[Object.keys(data[0].currencies)[0]].symbol,
        timezone: data[0].timezones[0],
        capital: data[0].capital,
        flag: data[0].flags.svg,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const cordsSlice = createSlice({
  name: "location",
  initialState: {
    value: {
      name: "",
      currencySymbol: "",
      timezone: "",
      capital: "",
      flag: "",
    },
  },
  reducers: {
    setLocationDataSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocationDataSuccess } = cordsSlice.actions;

export default cordsSlice.reducer;
