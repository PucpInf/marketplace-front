/**
 * reducer 
 */
import { combineReducers } from "redux";
import ecommerceReducer from "./ecommerceReducer";
import generalReducer from "./generalReducer";
import appSettings from "./appSettings";

const reducers = combineReducers({
   ecommerce: ecommerceReducer,
   data: generalReducer,
   appSettings
})

export default reducers;