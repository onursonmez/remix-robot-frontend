import { useEffect, useState } from 'react';
import { socket } from '../services/socket';

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setError('Connection lost. Attempting to reconnect...');
    };

    const onConnectError = () => {
      setError('Failed to connect to the server.');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, []);

  return { isConnected, error };
}