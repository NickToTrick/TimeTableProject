import axios from 'axios';
import { StopData } from '@/types';

const BASE_URL = 'http://localhost:3000';
export const fetchStops = async (): Promise<StopData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/stops`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching stops:', error);
    throw error;
  }
};