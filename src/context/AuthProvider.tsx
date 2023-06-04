import { createContext, useContext, useState, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
