import { createContext, useContext, useState, ReactNode, useEffect, SetStateAction } from 'react';
import { supabase } from '../server/client';
import { AuthSession, User } from '@supabase/supabase-js';

interface Props {
  children?: ReactNode;
}

interface UserContext {
  user: User | undefined;
  login: Function
}

const AuthContext = createContext<UserContext>({});

export const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password });


const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user);
        setAuth(true);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
