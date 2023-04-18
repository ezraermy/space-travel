import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
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
  reducers: {
    reserve: (state, { payload }) => {
      return {
        ...state,
        items: state.items.map((rocket) => {
          return rocket.id === payload ? { ...rocket, reserved: true } : rocket;
        }),
      };
    },
    cancelReserve: (state, { payload }) => {
      return {
        ...state,
        items: state.items.map((rocket) => {
          return rocket.id === payload
            ? { ...rocket, reserved: false }
            : rocket;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRockets.pending, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));
    builder.addCase(getRockets.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      items: payload.map(
        ({
          id,
          rocket_name: name,
          rocket_type: type,
          flickr_images,
          description,
        }) => ({
          id,
          name,
          type,
          flickr_images,
          description,
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

export const { reserve, cancelReserve } = rocketSlice.actions;
export default rocketSlice.reducer;
