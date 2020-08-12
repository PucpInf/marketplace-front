/**
 * product slider component
 */
/* eslint-disable */
import React from 'react';
import Slider from "react-slick";
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from "@material-ui/core/IconButton";
import RatingStar from './RatingStar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { addProductItem, showAlert, addToWishlist } from "@actions/action";
import CurrencyIcon from '@components/global/currency/CurrencyIcon';

// helpers
import { isProductExist, productExitsInWishlist } from "../../helpers";

function ProductItem(props) {

   const { data, onProductAddToCart, onProductAddToWhislist, onPostDetail } = props;
   return (
      <Card>
         <div className="iron-overlay-wrap overflow-hidden d-flex justify-content-center align-items-center">
            <Link to={`/products/detail/${data.id}`} className='d-block'>
               {data.images && data.images.length > 0 ? 
                  <CardMedia
                     height="140"
                     component="img"
                     // image={require(`../../assets/images/post-1.jpg`)}
                     image = {data.images[0].ImageUrl}
                  /> 
               :
                  <CardMedia
                     height="140"
                     component="img"
                     image={require(`../../assets/images/post-1.jpg`)}
                     // image = {data}
                  /> 
               }
            </Link>
         </div>
         <CardContent className="iron-product-content p-20 border">
            <h5 className="text-truncate" ><Link to={`/products/detail/${data.id}`} >{data.title}</Link></h5>
            <div className="d-flex justify-content-between align-items-center">
               <div className="price-wrap">
                  <span> <CurrencyIcon /> {data.price}</span>
               </div>
               <RatingStar ratingAvg= {data.avgRating} />
            </div>
         </CardContent>
      </Card>
   );
}

class ProductSlider extends React.Component {

   state = {
      selectedTab: 0,
      rtl: true
   }

   //define function for select tab
   onTabClick(index) {
      this.setState({ selectedTab: index })
   }

   // define function for add product in cart
   onAddToCart(product) {
      this.props.addProductItem(product);

      setTimeout(() => {
         this.props.showAlert('Your product Is Successfully added in cart', 'success')
      }, 500)
   }

   //add product to wishlist
   addProductToWishList(productdata) {
      this.props.addToWishlist(productdata);
      setTimeout(() => {
         this.props.showAlert('Your product Is Successfully added in whislist', 'success')
      }, 500)
   }

   render() {
      const { rtl } = this.state;
      console.log()
      const settings = {
         dots: true,
         infinite: true,
         arrows: false,
         speed: 500,
         autoplay: true,
         slidesToShow: 4,
         slidesToScroll: 1,
         rtl: rtl,
         responsive: [
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
               }
            },
            {
               breakpoint: 961,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
               }
            },
            {
               breakpoint: 500,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               }
            }
         ]
      };

      const { contentData } = this.props;
      console.log(contentData);
      return (
         <div className="product-categories-slider">
            <div className="iron-custom-tab-container">
               <div className="iron-tab-content">
                  <div className="iron-product-slider iron-product-wrap slider-style">
                     <div className="iron-tab-content">
                        <Slider {...settings}>
                           {contentData && contentData.map((contentData, objectID) => (
                              <div key={contentData.id} className="iron-product-item post-rounded">
                                 {/* <span>{contentData.id}</span> */}
                                 <ProductItem
                                    data={contentData}
                                    onProductAddToCart={() => this.onAddToCart(contentData)}
                                    onProductAddToWhislist={() => this.addProductToWishList(contentData)}
                                 />
                              </div>
                           ))}
                        </Slider>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ ecommerce }) => {
   const { cart, wishlist } = ecommerce;
   return { cart, wishlist };
}

export default connect(mapStateToProps, {
   addProductItem,
   addToWishlist,
   showAlert
})(ProductSlider);