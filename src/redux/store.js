import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rocketReducer from './rockets/rocketsSlice';
import missionsReducer from './missions/missionsSlice';

const middleware = [thunk, logger];

const store = configureStore({
  reducer: {
    rockets: rocketReducer,
    missions: missionsReducer,
  },
  middleware,
});

export default store;
