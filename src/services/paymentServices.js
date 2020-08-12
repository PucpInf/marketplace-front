import apiPayment from './api/paymentApi';

const ROUTES = {
  //Eduardo
  CHARGES: '/charges',
  COSTUMBER: '/customers',
  //Christian
};

const paymentServices = {
  //Eduardo
  payment: (value) => apiPayment.post(`${ROUTES.CHARGES}`, value),
  createCostumer: (value) => apiPayment.post(`${ROUTES.COSTUMBER}`, value),
  //Christian
};

export default paymentServices;
