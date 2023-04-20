import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRockets } from 'redux/rockets/rocketsSlice';
import Rocket from './Rocket';

function Rockets() {
  const [rockets, isLoading] = useSelector((store) => [
    store.rockets.items,
    store.rockets.isLoading,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rockets.length) return;
    dispatch(getRockets());
  }, [dispatch, rockets.length]);

  return (
    <div className="px-16">
      <div className="text-3xl text-blue-500">
        {isLoading && <div>Loading...</div>}
        {rockets.length
          && rockets.map((rocket) => (
            <Rocket data-testid="rocket" key={rocket.id} rocket={rocket} />
          ))}
      </div>
    </div>
  );
}

export default Rockets;
