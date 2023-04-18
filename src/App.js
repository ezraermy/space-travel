import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Rockets from 'components/Rockets';
import Missions from 'components/Missions';
import MyProfile from 'components/MyProfile';
import NoMatch from 'components/NoMatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Rockets />} />
        <Route path="missions" element={<Missions />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
