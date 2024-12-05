import { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { Robot } from '../types/robot';

export function useRobotData() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRobots = () => {
      setLoading(true);
      socket.emit('findAllRobots', {});
    };

    const onAllRobots = (data: Robot[]) => {
      setRobots(data);
      setLoading(false);
    };

    const onRobotCreated = () => {
      fetchRobots();
    };

    socket.on('connect', fetchRobots);
    socket.on('allRobots', onAllRobots);
    socket.on('robotCreated', onRobotCreated);

    return () => {
      socket.off('connect', fetchRobots);
      socket.off('allRobots', onAllRobots);
      socket.off('robotCreated', onRobotCreated);
    };
  }, []);

  return { robots, loading };
}