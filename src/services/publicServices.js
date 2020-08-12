import apiMk from './api';
import apiFormData from './api/apiformData';

const setHeaders = () => {
  const accessToken = localStorage.getItem('mk-token');
  apiMk.setHeader('Authorization', accessToken);
};

setHeaders();

const ROUTES = {
  //Eduardo
  ROOT: '/',
  COUNTRIES: '/allCountry',
  PLANS: '/plans',
  LIST_TYPES: '/contents/types',
  LOGIN: '/users/login',
  CREATE_CLIENT: '/clients/create',
  CREATE_PROVIDER: '/providers/create',
  UPLOAD_FILE: '/contents/upload',
  LIST_REGIONS: '/regions/all',
  LIST_REQUESTS: '/contents/allByState?state=0',
  UPDATE_STATUS: '/contents/respondRequest',
  SINGLE_PAYMENT: '/contents/buyContent',
  DOWNLOAD_PRODUCT: '/contents/download',
  UPLOAD_IMG_PRODUCT: '/contents/images',
  CREATE_REQUEST: '/solicitud/create',
  //Walter
  VERIFY_EMAIL: '/users/verifyEmail',
  CLIENTS_PAYMENTS: '/clients/getClientPayments',
  //Christian
  ALL_CATEGORIES:'/categorys/all',
  ALL_REGIONS:'/regions/all',
  GET_CURRENT_REGION: '/',
  ALL_CONTENTS:'/contents/allContentLocation',
  CONTENT_ITEM:'/contents/find',
  RATE_CONTENT:'/contents/calificate',
  APP_REQUESTS_PROVIDER: '/solicitud/findbyowner',
  CONTENTS_PROVIDER:'/contents/findbyowner',
  UPLOAD_REQUEST_FILE: '/solicitud/upfile',
  UPDATE_REQUEST_STATE: '/solicitud/updatestate',
  UPDATE_CONTENT_VERSION: '/contents/modificate',

  GET_CONTENT_LATEST: '/contents/latestContent',
  GET_CONTENT_RELATED: '/contents/relatedItems',
  GET_CONTENT_RECOMENDED: '/contents/recommendToUser',
  GET_CONTENT_CATEGORIES: 'categorys/getCountCategories',
  
  GET_PROVIDER_REVENEU: '/providers/getProviderRevenue',
  GET_PROVIDER_REVENEU_REGION: '/providers/getProviderRevenueRegion',

  GET_PROVIDER_LIST: '/providers',
  WHITELIST_PROVIDER: '/plans/providerWhitelist',
};

const publicServices = {
  //Eduardo
  test: () => apiMk.get(ROUTES.ROOT),
  getPlans: () => apiMk.get(ROUTES.PLANS),
  getCountries: () => apiMk.get(ROUTES.COUNTRIES),
  createClient: (data) => apiMk.post(ROUTES.CREATE_CLIENT, data),
  createProvider: (data) => apiMk.post(ROUTES.CREATE_PROVIDER, data),
  login: (data) => apiMk.post(ROUTES.LOGIN, data),
  uploadFileTest: (data) => apiFormData.post(ROUTES.UPLOAD_FILE, data),
  uploadImgProduct: (data) => apiFormData.post(ROUTES.UPLOAD_IMG_PRODUCT, data),
  getListTypes: () => apiMk.get(ROUTES.LIST_TYPES),
  getListRegions: () => apiMk.get(ROUTES.LIST_REGIONS),
  getListRequests: () => apiMk.get(ROUTES.LIST_REQUESTS),
  getUpdateStatus: (data) => apiMk.post(ROUTES.UPDATE_STATUS, data),
  singlePayment: (data) => apiMk.post(ROUTES.SINGLE_PAYMENT, data),
  createRequest: (data) => apiMk.post(ROUTES.CREATE_REQUEST, data),
  historyProducts: (userId) => apiMk.get(`${ROUTES.CLIENTS_PAYMENTS}?clientId=${userId}`),
  downloadProduct: (userId, contentId) => apiMk.get(`${ROUTES.DOWNLOAD_PRODUCT}?userId=${userId}&contentid=${contentId}`),
  // Walter
  verifyEmail: (email) => apiMk.get(`${ROUTES.VERIFY_EMAIL}?email=${email}`),
  //Christian
  getCategories: () => apiMk.get(ROUTES.ALL_CATEGORIES),
  getRegions: () => apiMk.get(ROUTES.ALL_REGIONS),
  getCurrentRegion: () => apiMk.get(ROUTES.GET_CURRENT_REGION),

  //get main page content
  getContentLatest: () => apiMk.get(ROUTES.GET_CONTENT_LATEST),
  getContentRelated: (query) => apiMk.get(`${ROUTES.GET_CONTENT_RELATED}?${query}`),
  getContentRecomended: (query) => apiMk.get(`${ROUTES.GET_CONTENT_RECOMENDED}?${query}`),
  getContents: () => apiMk.get(ROUTES.ALL_CONTENTS),
  getContentCategories: () => apiMk.get(ROUTES.GET_CONTENT_CATEGORIES),

  //content detail
  getContentItem: (query) => apiMk.get(`${ROUTES.CONTENT_ITEM}?${query}`),
  rateContent: (data) =>apiMk.post(ROUTES.RATE_CONTENT,data),

  //provider admin panel
  getAppRequestProvider: (query) =>apiMk.get(`${ROUTES.APP_REQUESTS_PROVIDER}?${query}`),
  getContentsProvider:(query) => apiMk.get(`${ROUTES.CONTENTS_PROVIDER}?${query}`),
  uploadRequestFile:(data) => apiMk.post(ROUTES.UPLOAD_REQUEST_FILE,data),
  updateRequestState: (data) => apiMk.post(ROUTES.UPDATE_REQUEST_STATE,data),
  getReveneuStats: (query) => apiMk.get(`${ROUTES.GET_PROVIDER_REVENEU}?${query}`),
  getReveneuRegion: (query) => apiMk.get(`${ROUTES.GET_PROVIDER_REVENEU}?${query}`),

  updateContentVersion: (data) => apiMk.post(ROUTES.UPDATE_CONTENT_VERSION,data),

  //admin admin panel
  getProviderList: () => apiMk.get(ROUTES.GET_PROVIDER_LIST),
  whitelistProvider: (data) => apiMk.post(ROUTES.WHITELIST_PROVIDER,data),
  
};

export default publicServices;
