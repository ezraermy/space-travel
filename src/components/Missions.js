import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission, leaveMission } from 'redux/missions/missionsSlice';

const MissionList = () => {
  const dispatch = useDispatch();
  const { missions, isLoading, isSucceed } = useSelector((state) => state.missions);

  useEffect(() => {
    if (missions.length > 0) return;
    dispatch(fetchMissions());
  }, [dispatch, missions.length]);

  const handleJoinMission = (id) => {
    dispatch(joinMission(id));
  };

  const handleLeaveMission = (id) => {
    dispatch(leaveMission(id));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSucceed) {
    return <p>Unable to fetch missions.</p>;
  }

  return (
    <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-10 mt-6">
      <table className="w-full border-spacing-2">
        <thead>
          <tr className="text-lg text-black-900 my-2">
            <th className="text-left py-2">Mission</th>
            <th className="text-left py-2 pl-5">Description</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {missions.map((mission) => (
            <tr key={mission.missionID} className="odd:bg-white even:bg-gray-200">
              <td className="text-lg text-slate-700 font-semibold my-2">{mission.missionName}</td>
              <td className="px-6 py-8 text-lg text-slate-700 font-semibold my-2">{mission.description}</td>
              <td>
                {mission.joined ? <span className="text-base text-white px-2 bg-cyan-600 font-semibold mr-2 rounded-md whitespace-nowrap">Active Member</span>
                  : <span className="text-base text-white px-2 bg-gray-600 font-semibold mr-2 rounded-md whitespace-nowrap">NOT A MEMBER</span>}
              </td>
              <td>
                {mission.joined ? (
                  <button
                    type="button"
                    onClick={() => handleLeaveMission(mission.missionID)}
                    className="px-6 text-2xl py-3 text-red-500 border-2 border-red-500 rounded-md mt-4 whitespace-nowrap"
                  >
                    Leave Mission
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleJoinMission(mission.missionID)}
                    className="px-6 text-2xl py-3 text-slate-500 border-2 border-slate-500 rounded-md mt-4 whitespace-nowrap"
                  >
                    Join Mission
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MissionList;
