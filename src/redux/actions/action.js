import publicServices from '@services/publicServices';
// import privateServices from '@services/privateServices';

/**
 * Action Types
 */
import {
   COLLAPSED_SIDEBAR,
   RTL_LAYOUT,
   ADD_TO_CART,
   ADD_TO_WISHLIST,
   SHOW_ALERT,
   HIDE_ALERT,
   REMOVE_FROM_CART,
   UPDATE_PRODUCT_QUANTITY,
   CHANGE_CURRENCY,
   SET_LANGUAGE,
   FINAL_PAYMENT,
   MOVE_WISHLISTITEM_TO_CART,
   REMOVE_FROM_WISHLIST,
   DELETE_USER,
   ADD_NEW_USER,
   //Eduardo
   TEST,
   GET_PLANS,
   GET_COUNTRIES,
   LOGIN,
   //Walter
   VERIFY_EMAIL,
   //Christian
   GET_CATEGORIES,
   GET_CONTENTS,
   GET_CONTENT_ITEM,
   RATE_CONTENT,
   GET_CURRENT_REGION,

} from './types';

export const generalActions = {
   //=========================================================================
   //Eduardo
   //=========================================================================
   getTest: (success, failure) => ({
     type: TEST,
     target: 'test',
     service: publicServices.test(),
     response: resp => resp.data,
     ...(success && { success }),
     ...(failure && { failure }),
   }),
   getPlans: (success, failure) => ({
      type: GET_PLANS,
      target: 'plans',
      service: publicServices.getPlans(),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
    }),
    getCountries: (success, failure) => ({
      type: GET_COUNTRIES,
      target: 'countries',
      service: publicServices.getCountries(),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
    }),
    login: (data, success, failure) => ({
      type: LOGIN,
      target: 'userLogged',
      service: publicServices.login(data),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
    }),

   //=========================================================================
   //Walter
   //=========================================================================
   verifyEmail: (data, success, failure) => ({
      type: VERIFY_EMAIL,
      target: 'emailVerified',
      service: publicServices.verifyEmail(data),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),    

   //=========================================================================
   //Christian
   //=========================================================================
   getCategories: ( success, failure ) => ({
      type: GET_CATEGORIES,
      target: 'categories',
      service: publicServices.getCategories(),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),
   getContents: (success, failure) => ({
      type: GET_CONTENTS,
      target: 'contents',
      service: publicServices.getContents(),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),
   getContentItem: (data, success, failure) => ({
      type: GET_CONTENT_ITEM,
      target: 'contentItem',
      service: publicServices.getContentItem(data),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),
   rateContent: (data, success, failure) => ({
      type: RATE_CONTENT,
      target: 'rateContent',
      service: publicServices.rateContent(data),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),
   getCurrentRegion: (success, failure) => ({
      type: GET_CURRENT_REGION,
      target: 'region',
      service: publicServices.getCurrentRegion(),
      response: resp => resp.data,
      ...(success && { success }),
      ...(failure && { failure }),
   }),

};


//add product item
export const addProductItem = (data, alertMessage) => (dispatch) => {
   dispatch({
      type: ADD_TO_CART,
      payload: data
   })
}

//show alert box
export const showAlert = (message, type) => ({
   type: SHOW_ALERT,
   payload: { message, type }
})

//hide alert box
export const hideAlert = () => ({
   type: HIDE_ALERT,
})

// add product to wishlist
export const addToWishlist = (data, alertMessage) => (dispatch) => {
   dispatch({
      type: ADD_TO_WISHLIST,
      payload: data
   })
}

//move all wishlist item to cart
export const moveWishlistItemToCart = () => ({
   type: MOVE_WISHLISTITEM_TO_CART
})

//delete wishlist item 
export const deleteItemFromWishlist = (data) => ({
   type: REMOVE_FROM_WISHLIST,
   payload: data
})

//Remove product item
export const removeProductItem = (data) => ({
   type: REMOVE_FROM_CART,
   payload: data
})

//update product quantity
export const updateProductQuantity = (data) => ({
   type: UPDATE_PRODUCT_QUANTITY,
   payload: data
})

// change currency
export const changeCurrency = (currency) => ({
   type: CHANGE_CURRENCY,
   payload: currency
})

// change language
export const setLanguage = (locale) => ({
   type: SET_LANGUAGE,
   payload: locale
})

//final payment 
export const finalPayment = (history) => (dispatch) => {
   history.push('/final-receipt');
   dispatch({ type: FINAL_PAYMENT });

}

// Rtl Layout
export const rtlLayoutAction = (isRtlLayout) => ({
   type: RTL_LAYOUT,
   payload: isRtlLayout
});

//Redux Action To Emit Collapse Sidebar
export const collapsedSidebarAction = (isCollapsed) => ({
   type: COLLAPSED_SIDEBAR,
   isCollapsed
});

//======== Admin-panel actions ========

//add user
export const addNewUser = (data) => ({
   type: ADD_NEW_USER,
   payload: data
})

//delete user 
export const deleteUser = (data) => ({
   type: DELETE_USER,
   payload: data
})