import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRockets } from 'redux/rockets/rocketsSlice';

function Rockets(props) {
  const rockets = useSelector((store) => store.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRockets());
  }, []);

  return (
    <div className="px-16">
      <div className="text-3xl text-blue-500">Rockets</div>
    </div>
  );
}

export default Rockets;
