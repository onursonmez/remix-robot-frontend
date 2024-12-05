import React, { createContext, useContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useRobotData } from '../hooks/useRobotData';
import { Robot } from '../types/robot';

interface RobotContextType {
  robots: Robot[];
  loading: boolean;
  error: string | null;
  isConnected: boolean;
}

const RobotContext = createContext<RobotContextType>({
  robots: [],
  loading: false,
  error: null,
  isConnected: false,
});

const useRobots = () => useContext(RobotContext);

const RobotProvider = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, error } = useSocket();
  const { robots, loading } = useRobotData();

  const value = {
    robots,
    loading,
    error,
    isConnected,
  };

  return (
    <RobotContext.Provider value={value}>
      {children}
    </RobotContext.Provider>
  );
};

export { useRobots, RobotProvider };