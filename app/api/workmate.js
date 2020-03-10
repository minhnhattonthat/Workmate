import axios from 'axios';

axios.defaults.validateStatus = () => {
  return true;
};

const BASE_URL = 'https://api.helpster.tech/v1';

export const login = async (username, password) => {
  const data = {
    username,
    password,
  };
  const response = await axios.post(`${BASE_URL}/auth/login/`, data);
  return response.data.key;
};

export const fetchJob = async (jobId, token) => {
  const response = await axios.get(`${BASE_URL}/staff-requests/${jobId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const clockIn = async (jobId, latitude, longitude, token) => {
  const data = {
    latitude,
    longitude,
  };
  const response = await axios.post(
    `${BASE_URL}/staff-requests/${jobId}/clock-in/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  if (response.status === 400) {
    throw new Error(response.data.detail);
  }
  return response.data;
};

export const clockOut = async (jobId, latitude, longitude, token) => {
  const data = {
    latitude,
    longitude,
  };
  const response = await axios.post(
    `${BASE_URL}/staff-requests/${jobId}/clock-out/`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  if (response.status === 400) {
    throw new Error(response.data.detail);
  }
  return response.data;
};
