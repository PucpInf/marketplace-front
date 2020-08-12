import { create } from 'apisauce';
import AppConfig from '@constants/AppConfig';

const apiMk = create({
  baseURL: AppConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export default apiMk;
