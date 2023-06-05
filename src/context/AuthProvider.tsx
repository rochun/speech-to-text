import { createContext, useContext, useState, ReactNode, useEffect, SetStateAction } from 'react';
import { supabase } from '../server/client';
import { AuthSession, User } from '@supabase/supabase-js';

interface Props {
  children?: ReactNode;
}

interface UserContext {
  user?: User | null | undefined;
  login: Function;
  signOut: Function;
  auth?: boolean;
}

const login = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthContext = createContext<UserContext>({
  user: undefined,
  login: login,
  signOut: signOut,
  auth: undefined,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState<Boolean | null>(null);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    getUser();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
