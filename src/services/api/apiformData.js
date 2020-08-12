import { create } from 'apisauce';
import AppConfig from '@constants/AppConfig';

const apiFD = create({
  baseURL: AppConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

export default apiFD;
