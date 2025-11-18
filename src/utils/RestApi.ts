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
