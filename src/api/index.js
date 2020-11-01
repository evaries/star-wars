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
export const fetchPlanet = async (planetId) => {
  try {
    const { data } = await axios.get(`${baseURL}planets/${planetId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const fetchPeoples = async (url) => {
  try {
    const people = await axios.get(url);
    return people.data.name;
  } catch (e) {
    console.log(e);
  }
};
