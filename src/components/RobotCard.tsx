import React from 'react';
import { Battery, Signal, Clock } from 'lucide-react';
import { Robot } from '../types/robot';

interface RobotCardProps {
  robot: Robot;
}

export const RobotCard: React.FC<RobotCardProps> = ({ robot }) => {
  const statusColor = {
    IN_PROGRESS: 'bg-green-500',
    IDLE: 'bg-gray-500',
    MAINTENANCE: 'bg-red-500'
  }[robot.status];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{robot.serialNumber}</h3>
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-gray-600" />
          <span className="text-sm">{robot.robotType?.name}%</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Signal className="w-5 h-5 text-gray-600" />
          <span className="text-sm capitalize">{robot.status}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-sm">
            {new Date(robot.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};