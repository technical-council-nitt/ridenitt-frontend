import axios from "axios";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  refreshAuth: (quiet?: boolean) => void;
  hasSignedUp: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const hasSignedUp = useMemo(() => {
    if (!user) return false
    if (!user.gender || !user.phoneNumber) return false
    return true
  }, [user])

 const refreshAuth = async (quiet: boolean = false) => {
  if (!quiet) setAuthLoading(true);

  try {
    const res = await axios.get(
      "https://api-ridenitt.duckdns.org/api/users/me",
      {
        withCredentials: true,
      }
    );

    setUser(res.data.data);
  } catch (err) {
    console.error(err);
    setUser(null);
  } finally {
    setAuthLoading(false);
  }
};

  useEffect(() => {
    refreshAuth();
  }, [])

  return (
    <AuthContext.Provider value={{
      user, authLoading, refreshAuth, hasSignedUp
    }}>
      {children}
    </AuthContext.Provider>
  )
}