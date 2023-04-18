import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRockets } from 'redux/rockets/rocketsSlice';

function MyProfile() {
  const [rockets, isLoading] = useSelector((store) => [
    store.rockets.items,
    store.rockets.isLoading,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rockets.length) return;
    dispatch(getRockets());
  }, []);

  return (
    <div className="px-16 grid grid-cols-2">
      {isLoading && <div>Loading...</div>}
      <div className="p-4">
        <h2 className="text-3xl font-semibold mb-4 text-slate-700">
          My Missions
        </h2>
        <ul className="border rounded-md py-4 text-xl">
          <li className="border-b p-4 pt-2 pb-8 last-of-type:border-none">
            Telstar
          </li>
          <li className="border-b p-4 pt-2 pb-8 last-of-type:border-none">
            SES
          </li>
          <li className="border-b p-4 pt-2 pb-8 last-of-type:border-none">
            AsiaSat
          </li>
          <li className="border-b p-4 pt-2 pb-8 last-of-type:border-none">
            ABS
          </li>
        </ul>
      </div>
      <div className="p-4">
        <h2 className="text-3xl font-semibold mb-4 text-slate-700">
          My Rockets
        </h2>
        <ul className="border rounded-md py-4 text-xl">
          {rockets.length &&
            rockets
              .filter((rocket) => rocket.reserved)
              .map((rocket) => (
                <li className="border-b p-4 pt-2 pb-8 last-of-type:border-none">
                  {rocket.name}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default MyProfile;
