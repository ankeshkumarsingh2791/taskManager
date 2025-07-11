import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/Layout';
import Sigin from './Components/Sigin';
import SignUp from './Components/SignUp';
import KanBanBoard from './Components/KanBanBoard';
import CreateTaskForm from './Components/CreateTaskForm';
import Verify from './Components/Verify';
import { useUserContext } from '../context/UserContext';

function App() {
  const { fetchedData } = useUserContext();
  const isAuthenticated = fetchedData?.statusCode === 200;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Sigin />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<KanBanBoard />} />
          <Route path="add-task" element={<CreateTaskForm />} />
          <Route path="dashboard-1" element={<SignUp />} />
          <Route path="dashboard-2" element={<Sigin />} />
        </Route>
      ) : (
        // Redirect unauthorized users to login
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
