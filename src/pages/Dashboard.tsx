import React from 'react';
import { useRobots } from '../context/RobotContext';
import { RobotCard } from '../components/RobotCard';
import { Loader2, WifiOff } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { robots, loading, error, isConnected } = useRobots();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <WifiOff className="w-12 h-12 text-red-500" />
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="mt-2">
            {isConnected ? 'Reconnected! Waiting for data...' : 'Attempting to reconnect...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Robot Monitor</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {robots.map((robot) => (
          <RobotCard key={robot._id} robot={robot} />
        ))}
      </div>
    </div>
  );
};