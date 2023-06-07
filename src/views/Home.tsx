import { useAuth } from '../context/AuthProvider';
import { UserDashboard } from './UserDashboard';

export const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <div>You are logged in: {user?.email}</div>
      <UserDashboard />
    </>
  );
}