export interface Robot {
  _id: string;
  serialNumber: string;
  url: string;
  status: 'IDLE' | 'IN_PROGRESS' | 'MAINTENANCE';
  connectionState: 'CONNECTED' | 'DISCONNECTED';
  mqttClient: {
    _id: string;
    clientId: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
},
  robotType?: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}