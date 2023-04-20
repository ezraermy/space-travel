import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const getRockets = createAsyncThunk(
  'rocktes/getRockets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SPACE_X_API}/rockets`
      );
      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserve: (state, { payload }) => ({
      ...state,
      items: state.items.map((rocket) => {
        if (rocket.id === payload) return { ...rocket, reserved: true };
        return rocket;
      }),
    }),
    cancelReserve: (state, { payload }) => ({
      ...state,
      items: state.items.map((rocket) => {
        if (rocket.id === payload) return { ...rocket, reserved: false };
        return rocket;
      }),
    }),
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
          flickr_images: flickrImages,
          description,
        }) => ({
          id,
          name,
          type,
          flickrImages,
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
