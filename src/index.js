import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {StripeProvider, Elements} from 'react-stripe-elements'
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// configureStore 
import { configureStore } from './redux/store/index';

// store
export const store = configureStore();


ReactDOM.render(
   <StripeProvider apiKey="pk_test_ASRcMrpo4eukfXH0c2jqPYha005wqfr1zc">
      <Elements>
         <Provider store={store}>
            <BrowserRouter>
               <Switch>
                  <Route path="/" component={App} />
               </Switch>
            </BrowserRouter>
         </Provider>
      </Elements>
   </StripeProvider>
   , document.getElementById('root'));

registerServiceWorker();
