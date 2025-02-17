import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  ongoingSignup: Omit<User, 'id'> | false;
  setOngoingSignup: (user: Omit<User, 'id'> | false) => void;
  ongoingResetPw: { phoneNumber: string | null };
  setOngoingResetPw: (data:  { phoneNumber: string | null }) => void;
  ongoingUpdatePh: { name: string, oldPh: string, newPh: string } | false;
  setOngoingUpdatePh: (data: { name: string, oldPh: string, newPh: string } | false) => void;
  authLoading: boolean;
  refreshAuth: () => void;
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
  const [ongoingSignup, _setOngoingSignup] = useState<Omit<User, 'id'> | false>(false);
  const [ongoingResetPw, _setOngoingResetPw] = useState<{ phoneNumber: string | null }>({ phoneNumber: null});
  const [ongoingUpdatePh, _setOngoingUpdatePh] = useState<{ name: string, oldPh: string, newPh: string } | false>(false);
  const [authLoading, setAuthLoading] = useState(true);

  const setOngoingSignup = (user: Omit<User, 'id'> | false) => {
    _setOngoingSignup(user);
  }

  const setOngoingResetPw = (data: { phoneNumber: string | null }) => {
    _setOngoingResetPw(data);
  }

  const setOngoingUpdatePh = (data: { name: string, oldPh: string, newPh: string } | false) => {
    _setOngoingUpdatePh(data);
  }

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
      user, ongoingResetPw, setOngoingResetPw, ongoingSignup, setOngoingSignup, ongoingUpdatePh, setOngoingUpdatePh, authLoading, refreshAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}