import axios from 'axios';
import { baseURL } from '../constants/api';

export const fetchPlanets = async (page) => {
  try {
    const { data } = await axios.get(`${baseURL}planets/?page=${page}`);
    return data;
  } catch (e) {
    throw e;
  }
};
