import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  refreshAuth: () => void;
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

  const refreshAuth = async () => {
    setAuthLoading(true);

    const accessToken = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("access-token="))?.split("=")[1];
    if (!accessToken) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      const payload = jwtDecode(accessToken) as any;
      const userId = payload.userId as string;

      if (!userId) throw new Error("Invalid token");

      await axios.get("/api/users/me")
        .then(res => {
          console.log(res.data.data)
          setUser(res.data.data)
        })
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }

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