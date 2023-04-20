import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.spacexdata.com/v3/missions';

const initialState = {
  missions: [],
  isSucceed: false,
  isLoading: false,
  error: null,
};

export const missionsData = (comingArr) => {
  const missions = comingArr.map((item) => {
    const { mission_id: missionID, mission_name: missionName, description } = item;
    return {
      missionID,
      missionName,
      description,
      joined: false, // <-- set joined property to false by default
    };
  });
  return missions;
};

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.map((mission) => ({
    missionID: mission.mission_id, // use missionID instead of mission_id
    missionName: mission.mission_name, // use missionName instead of mission_name
    description: mission.description,
    joined: false,
  }));
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, { payload }) => {
      const id = payload;
      return {
        ...state,
        missions: state.missions.map((mission) => {
          if (id === mission.missionID) {
            return { ...mission, joined: true };
          }
          return mission;
        }),
      };
    },
    leaveMission: (state, { payload }) => {
      const id = payload;
      return {
        ...state,
        missions: state.missions.map((mission) => {
          if (id !== mission.missionID) {
            return mission;
          }
          return { ...mission, joined: false };
        }),
      };
    },
  },

  extraReducers: {
    [fetchMissions.pending]: (state) => ({
      ...state,
      status: true,
    }),
    [fetchMissions.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      isSucceed: true,
      missions: action.payload,
    }),
    [fetchMissions.rejected]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export { fetchMissions };
export const { joinMission, leaveMission } = missionSlice.actions;
export default missionSlice.reducer;
