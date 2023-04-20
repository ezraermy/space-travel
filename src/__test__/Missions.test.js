import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMissions, joinMission, leaveMission } from 'redux/missions/missionsSlice';

const mockStore = configureMockStore([thunk]);

describe('missionsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [],
        isLoading: false,
        isSucceed: false,
        error: null,
      },
    });
  });

  it('should fetch missions from API', async () => {
    const expectedActions = [
      fetchMissions.pending.type,
      fetchMissions.fulfilled.type,
    ];

    await store.dispatch(fetchMissions());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });

  it('should join a mission', () => {
    const id = 123;
    const expectedAction = {
      type: joinMission.type,
      payload: id,
    };
    expect(joinMission(id)).toEqual(expectedAction);
  });

  it('should leave a mission', () => {
    const id = 123;
    const expectedAction = {
      type: leaveMission.type,
      payload: id,
    };
    expect(leaveMission(id)).toEqual(expectedAction);
  });
});
