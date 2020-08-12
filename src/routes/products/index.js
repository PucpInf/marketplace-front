/**
 * product detail page
 */
/* eslint-disable */
import React, { Fragment } from 'react';
import { Grid, Button } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

//connect to store
import { connect } from 'react-redux';

//firebase
import firebase from '../../firebase';
import 'firebase/database';

//component
import RatingStar from '@components/widgets/RatingStar';
import CurrencyIcon from '@components/global/currency/CurrencyIcon';
import PostDetail from '@components/templates/post-detail';

//page title
import PageTitle from '@components/widgets/PageTitle';

// actions
import { addProductItem, showAlert, addToWishlist } from "@actions/action";

// helpers
import { isProductExist, productExitsInWishlist } from "@helpers";
import publicServices from '@services/publicServices';
import ContentLoader from '@components/global/loaders/ContentLoader';
import qs from 'query-string-object'

import { generalActions } from "@actions/action";



function ProductList(props) {

   const { data } = props;

   return (
      <Grid item xs={12} sm={6} md={6} lg={3} className="mb-30 py-0">
         <Card className="iron-product-item">
            <div className="iron-overlay-wrap overflow-hidden d-flex justify-content-center align-items-center">
               <Link to={`/products/${data.type}/${data.objectID}`} className='d-block'>
                  <CardMedia
                     height="140"
                     component="img"
                     image={require(`../../assets/images/${data.image}`)}
                  />
               </Link>
            </div>
            <CardContent className="iron-product-content p-20 border">
               <h5 className="text-truncate"><Link to={`/products/detail/${data.id}`}>{data.title}</Link></h5>
               <div className="d-flex justify-content-between align-items-center">
                  <div className="price-wrap">
                     <span><CurrencyIcon /> {data.price}</span>
                  </div>
                  <RatingStar></RatingStar>
               </div>
            </CardContent>
         </Card>
      </Grid>
   );
}

class ProductDetail extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         contentId: parseInt(this.props.match.params.id),
         currentDataItem: null,
         relatedContent: []
      }
   }

   componentDidMount() {
      this.getContentItem();
      this.getRelatedContent();
   }

   getContentItem(){
      const user = localStorage.getItem('user');
      let urlparams;
      if (user === null || user === undefined){
         urlparams = qs.stringify({
            contentid: this.state.contentId,
            clientid: '0'
         });
      }
      else {
         const parsedUser = JSON.parse(user);
         urlparams = qs.stringify({
            contentid: this.state.contentId,
            clientid: parsedUser.client.id
         });
      }
      publicServices.getContentItem(urlparams).then((res)=>{
         if(res.status == 200){
            this.setState({
               currentDataItem: res.data
            });
         }
      })  
   }

   getRelatedContent(){
      const urlparams = qs.stringify({
         contentId: this.state.contentId,
      });
      publicServices.getContentRelated(urlparams).then((res)=>{
         if(res.status == 200){
            this.setState({relatedContent: res.data});
         }
      })
   }

   render() {
      const { currentDataItem, relatedContent } = this.state;
      return (
         <Fragment>
            {currentDataItem !== null ?
               <div className="product-detail-page" >
                  {/* <PageTitle
                     title="product details"
                  /> */}
                  <div className="inner-container">
                     <div className="bg-base section-pad">
                        <div className="container">
                           <Grid container spacing={0}>
                              <Grid item lg={12} className="mx-auto">
                                 <PostDetail
                                    contentData={currentDataItem}
                                 />
                              </Grid>
                           </Grid>
                        </div>
                     </div>
                     <div className="bg-secondary section-gap">
                        <div className="container">
                           <div className="block-title text-center mb-50">
                              <h4>You Might Also Like</h4>
                           </div>
                           <Grid container spacing={32} className="iron-product-wrap my-0">
                              {
                                 relatedContent.slice(0, 4).map((dataItem, index) => {
                                    return (
                                       <ProductList
                                          key={index}
                                          data={dataItem}
                                       />
                                    )
                                 })
                              }
                           </Grid>
                           <div className="text-center mt-30">
                              <Link to="/shop">
                                 <Button className="button btn-base">show all</Button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               :
               <ContentLoader />
            }
         </Fragment>
      )
   }
}

export default (ProductDetail);