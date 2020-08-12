import {
  //Eduardo
  TEST,
  GET_PLANS,
  GET_COUNTRIES,
  LOGIN,
  //Christian
  GET_CATEGORIES,
  GET_CONTENT_ITEM,
  GET_CURRENT_REGION,
  GET_CONTENTS,
  VERIFY_EMAIL,
} from '@actions/types';

const initialState = {
  //Eduardo
  testData: [],
  testError: false,
  testLoading: false,
  plansData: [],
  plansError: false,
  plansLoading: false,
  countriesData: [],
  countriesError: false,
  countriesLoading: false,
  userLoggedData: {},
  userLoggedError: false,
  userLoggedLoading: false,

  //Walter
  emailData: {},
  emailError: false,
  emailLoading: false,

  //Christian
  categoriesData: [],
  categoriesError: false,
  categoriesLoading: false,

  contentsData: null,
  contentsError: false,
  contentsLoading: false,

  contentItemData: null,
  contentItemError: false,
  contentItemLoading: false,

  regionData: [],
  regionError: false,
  regionLoading: false,
};


const generalReducer = (state = initialState, action) => {
  const { type, payload, target } = action;
  switch (type) {
    //Eduardo
    case TEST:
    case GET_COUNTRIES:
    case LOGIN:
    //Walter
    case VERIFY_EMAIL:
    //Christian
    case GET_CONTENTS:
    case GET_CONTENT_ITEM:
    case GET_CURRENT_REGION:
    case GET_CATEGORIES:
    case GET_PLANS:
      const fieldData = `${target}Data`;
      const fieldError = `${target}Error`;
      const fieldLoading = `${target}Loading`;
      if (typeof payload[fieldData] === 'boolean') {
        return { ...state, ...{
          [fieldError]: payload[fieldError],
          [fieldLoading]: payload[fieldLoading],
        } };
      }
      return { ...state, ...payload };
    
    default:
      return state;
  }
};

export default generalReducer;
