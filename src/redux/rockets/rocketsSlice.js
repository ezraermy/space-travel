import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  isLoading: false,
  error: null,
};

export const getRockets = createAsyncThunk(
  'rocktes/getRockets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SPACE_X_API}/rockets`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRockets.pending, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));
    builder.addCase(getRockets.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      rockets: payload.map(
        ({ id, rocket_name: name, rocket_type: type, flickr_images }) => ({
          id,
          name,
          type,
          flickr_images,
        })
      ),
      error: null,
    }));
    builder.addCase(getRockets.rejected, (state) => ({
      ...state,
      isLoading: false,
      error: 'Failed to fetch',
    }));
  },
});

export default rocketSlice.reducer;
