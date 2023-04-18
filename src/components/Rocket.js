import { useDispatch } from 'react-redux';
import { cancelReserve, reserve } from 'redux/rockets/rocketsSlice';

function Rocket({ rocket }) {
  const dispatch = useDispatch();

  const handleReserve = () => {
    dispatch(reserve(rocket.id));
  };
  const handleCancelReserve = () => {
    dispatch(cancelReserve(rocket.id));
  };

  return (
    <div className="flex justify-start items-start my-12">
      <img
        width={400}
        height="auto"
        src={rocket.flickr_images[0]}
        alt="rocket"
      />
      <div className="flex flex-col justify-between items-start px-8 w-full">
        <h1 className="text-3xl font-semibold mb-4 text-slate-700">
          {rocket.name}
        </h1>
        <p className="text-lg text-slate-700 font-semibold my-2">
          {rocket.reserved && (
            <span className="text-base text-white px-2 bg-cyan-600 font-semibold mr-2 rounded-md">
              Reserved
            </span>
          )}
          {rocket.description}
        </p>
        {rocket.reserved ? (
          <button
            onClick={handleCancelReserve}
            className="px-6 text-2xl py-3 text-slate-500 border-2 border-slate-500 rounded-md mt-4"
          >
            Cancel Reservation
          </button>
        ) : (
          <button
            onClick={handleReserve}
            className="px-6 text-2xl py-3 bg-blue-500 text-white rounded-md mt-4"
          >
            Reserve Rocket
          </button>
        )}
      </div>
    </div>
  );
}

export default Rocket;
