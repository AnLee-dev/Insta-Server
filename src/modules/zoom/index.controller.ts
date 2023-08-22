import jwt from 'jsonwebtoken';
import { AxiosRequestConfig } from 'axios';
import config from '../../config/config';

const payload = {
  iss: config.zoom.apiKey,
  exp: new Date().getTime() + 5000,
  email: 'caotu.jvb@gmail.com',
};
const token = jwt.sign(payload, config.zoom.apiSecret);

const zoomController = (): AxiosRequestConfig => {
  const options = {
    method: 'POST',
    url: `https://api.zoom.us/v2/users/${payload.email}/meetings`,
    data: {
      topic: 'Zoom Mettings',
      schedule_for: payload.email,
      type: 1,
      settings: {
        host_video: 'true',
        participant_video: 'true',
      },
    },
    headers: {
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return options;
};

export default zoomController;
