/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncInvoiceListComponent,
   AsyncReportsComponent,
   AsyncProductsGridComponent,
   AsyncProductAddComponent,
   AsyncProductEditComponent,
   AsyncProfileDetailComponent,
   AsyncProductRequestsComponent,
   AsyncAppRequestsComponent,
   AsyncContentVersionComponent,
   AsyncProviderProductsComponent,
   AsyncProductReveneuStats,
   AsyncProductDownloadStats,
   AsyncProviderWhitelist
} from '../../util/AsyncRoutes';

const AdminPanel = ({ match }) => {
   return (
      <div className="dashboard-wrapper">
         <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/reveneuStats`} />
            <Route path={`${match.url}/reports`} component={AsyncReportsComponent} />
            <Route path={`${match.url}/invoices`} component={AsyncInvoiceListComponent} />

            {/*Provider routes */}
            <Route path={`${match.url}/products`} component={AsyncProductsGridComponent} />
            <Route path={`${match.url}/product-add`} component={AsyncProductAddComponent} />
            <Route path={`${match.url}/product-requests`} component={AsyncProductRequestsComponent} />
            <Route path={`${match.url}/product-edit/:id`} component={AsyncProductEditComponent} />
            <Route path={`${match.url}/content-version/:id`} component={AsyncContentVersionComponent} />
            <Route path={`${match.url}/provider-products`} component={AsyncProviderProductsComponent} />
            <Route path={`${match.url}/account`} component={AsyncProfileDetailComponent} />
            <Route path={`${match.url}/app-requests`} component={AsyncAppRequestsComponent} />
            <Route path={`${match.url}/reveneuStats`} component={AsyncProductReveneuStats} />
            <Route path={`${match.url}/downloadStats`} component={AsyncProductDownloadStats} />

            {/*Admin routes */}
            <Route path={`${match.url}/whitelist`} component={AsyncProviderWhitelist}/>
         </Switch>
      </div>
   )
}

export default AdminPanel;