import axios from 'axios';

const networkApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_IP,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getNetworkInfo = async () => {
  try {
    console.log(
      'Calling getNetworkInfo API...',
      import.meta.env.VITE_API_SERVER_IP,
    );
    const response = await networkApi.get('/api');
    console.log('getNetworkInfo response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching network info:', error);
    throw error;
  } finally {
    console.log('getNetwork API call completed');
  }
};

export const postFanStart = async () => {
  try {
    const response = await networkApi.post('/api/fan/start');
    return response.data;
  } catch (error) {
    console.error('Error starting fan:', error);
    throw error;
  }
};

export const postFanClear = async () => {
  try {
    const response = await networkApi.post('/api/fan/clear');
    return response.data;
  } catch (error) {
    console.error('Error clearing fan:', error);
    throw error;
  }
};

export const postFanAccel = async () => {
  try {
    const response = await networkApi.post('/api/fan/acceleration');
    return response.data;
  } catch (error) {
    console.error('Error accelerating fan:', error);
    throw error;
  }
};

export const postFanDeaccel = async () => {
  try {
    const response = await networkApi.post('/api/fan/deacceleration');
    return response.data;
  } catch (error) {
    console.error('Error deaccelerating fan:', error);
    throw error;
  }
};
