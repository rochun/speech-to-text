import React from 'react';
import { useAuth } from '../context/AuthProvider';

export const Home = () => {
  const { user } = useAuth();

  return <div>You are logged in: {user?.email}</div>
}