import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface CurrentRideContextType {
  currentRide: Ride | null;
  loading: boolean;
  refreshCurrentRide: () => void;
}

const CurrentRideContext = createContext<CurrentRideContextType | undefined>(undefined);

export const useCurrentRide = () => {
  const context = useContext(CurrentRideContext);

  if (context === undefined) {
    throw new Error("useCurrentRide must be used within a CurrentRideProvider");
  }

  return context;
}

export const CurrentRideProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentRide = () => {
    setLoading(true);

    axios.get("/api/rides/current")
      .then((response) => {
        setCurrentRide(response.data.data);
      })
      .catch((error) => {
        if (error.response.data?.data !== null) {
          console.error("Error fetching current ride", error);
        }
        setCurrentRide(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCurrentRide()
  }, []);

  return (
    <CurrentRideContext.Provider value={{ currentRide, loading, refreshCurrentRide: fetchCurrentRide }}>
      {children}
    </CurrentRideContext.Provider>
  );
};