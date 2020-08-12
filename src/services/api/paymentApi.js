import { create } from 'apisauce';
import AppConfig from '@constants/AppConfig';

const apiPayment = create({
  // withCredentials: true,
  baseURL: AppConfig.apiPayment,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer sk_test_ungSgSAYizTDShl0fovt05Ja00m4c1tPJh`
  },
});
export default apiPayment;
