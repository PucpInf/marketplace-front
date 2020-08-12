/**
 * shop Page
 */
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
   InstantSearch,
   Hits,
   Stats,
   SortBy,
   Configure,
   RefinementList,
   RatingMenu,
   NumericMenu,
   Panel,
   Pagination,
   ClearRefinements,
   RangeInput,
   SearchBox
} from 'react-instantsearch-dom';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";

//page title
import RctCard from '../../components/global/rct-card';
import Hit from '../../components/ecommerce/shop/hit';

//app config
import AppConfig from '../../constants/AppConfig';

class Shop extends React.Component {

   render() {
      const searchClient = algoliasearch(
         AppConfig.algoliaConfig.appId,
         AppConfig.algoliaConfig.apiKey,
      );
      const {regionData} = this.props;
      return (
         <div className="iron-Shop-page-wrap">
            {/* <PageTitle
               title="Products"
            /> */}
            <div className="product-list section-pad iron-shop-wrapper">
               <div className="container">
                  <InstantSearch
                     searchClient={searchClient}
                     indexName={AppConfig.algoliaConfig.indexName}
                  >
                     <Grid container spacing={32}>
                        <Grid item xs={12} sm={12} md={4} lg={3} className="mb-md-0 mb-30">
                           <div className="iron-filters-wrapper">
                              <RctCard>
                                 <SearchBox
                                    translations={{ placeholder: 'Search Contents' }}
                                    showLoadingIndicator
                                 />
                              </RctCard>
                              {/* <RctCard>
                                 <Panel header="Type">
                                    <RefinementList
                                       attribute="type"
                                       limit={5}
                                    />
                                 </Panel>
                              </RctCard> */}
                              <RctCard>
                                 <Panel header="Provider">
                                    <RefinementList
                                       attribute="provider.companyName"
                                       //searchable
                                       limit={5}
                                    />
                                 </Panel>
                              </RctCard>
                              <RctCard>
                                 <Panel header="Category">
                                    <RefinementList
                                       attribute="categories.code"
                                       //searchable
                                       limit={5}
                                    />
                                 </Panel>
                              </RctCard>
                              <RctCard>
                                 <Panel
                                    header="Price"
                                    className="mb-20"
                                 >
                                    <NumericMenu
                                       attribute="price"
                                       items={[
                                          { end: 10, label: 'Below $10' },
                                          { start: 10, end: 30, label: '$10 - $30' },
                                          { start: 30 , end: 50, label: '$30 - $50' },
                                          { start: 50, label: 'Above $50' },
                                       ]}
                                    />
                                 </Panel>
                                 <Panel header="Enter Price Range">
                                    <RangeInput
                                       attribute="price"
                                       className="py-2"
                                       translations={{
                                          submit: 'Go',
                                          separator: '-'
                                       }}
                                    />
                                 </Panel>
                              </RctCard>
                              <RctCard>
                                 <Panel header="Rating Menu">
                                    <RatingMenu
                                       attribute="rating"
                                       min={0}
                                       max={5}
                                       translations={{
                                          ratingLabel: ""
                                       }}
                                    />
                                 </Panel>
                              </RctCard>
                              <RctCard>
                                 <ClearRefinements />
                              </RctCard>
                           </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={9}>
                           <div className="stats-info d-md-flex mb-30 justify-content-between align-items-center">
                              <div className="app-selectbox-sm mb-30 mb-md-0">
                                 <SortBy
                                    defaultRefinement="dev_content"
                                    items={[
                                       { value: 'dev_content_featured', label: 'Featured' },
                                       { value: 'dev_content_price_asc', label: 'Lowest Price' },
                                       { value: 'dev_content_price_desc', label: 'Highest Price' },
                                       { value: 'dev_content_title_asc', label: 'A to Z'},
                                       { value: 'dev_content_title_desc', label: 'Z to A'}
                                    ]}
                                 />
                              </div>
                              <Stats />
                           </div>
                           { regionData ? 
                              <Configure hitsPerPage={8} filters={'regions.code:'.concat('\'',regionData.code,'\'')}/>
                              :
                              <Configure hitsPerPage={8}/>}
                           {/* <Configure hitsPerPage={8} filters={"regions.code:" + "'" + userRegion + "'"}/> */}
                           <Hits
                              hitComponent={Hit}
                              className="mb-30"
                              showLoadingIndicator
                           />
                           <div className="iron-pagination-wrap">
                              <Pagination
                                 totalPages={5}
                                 showFirst
                                 showLast
                                 showNext
                                 showPrevious
                              />
                           </div>
                        </Grid>
                     </Grid>
                  </InstantSearch>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (store) => {
   return {
      regionData: store.data.regionData
   };
}
export default connect(mapStateToProps)(Shop);