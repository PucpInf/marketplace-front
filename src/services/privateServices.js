import apiMk from './api';

const setHeaders = () => {
  const accessToken = localStorage.getItem('mk-token');
  apiMk.setHeader('Authorization', accessToken);
};

setHeaders();

const ROUTES = {
  //Eduardo
  ROOT: '/',
  LIST_PROVIDER_PRODUCTS: '/contents/findbyowner?ownerid=',
  UPLOAD_CODES: '/contents/sendActivationCodes',
  GET_IOS_CODE: '/contents/assignCode'
  //Christian
};

const privateServices = {
  //Eduardo
  getProviderProducts: (id) => apiMk.get(`${ROUTES.LIST_PROVIDER_PRODUCTS}${id}`),
  uploadCodes: (data) => apiMk.post(ROUTES.UPLOAD_CODES, data),
  getIOScode: (data) => apiMk.post(ROUTES.GET_IOS_CODE, data),
  //Christian
};

export default privateServices;
