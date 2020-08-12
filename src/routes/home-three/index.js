/**
 * Home Page Three
 */
/* eslint-disable */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

//component
import BannerSliderThree from '../../components/widgets/BannerSliderThree';
import ProductSlider from '../../components/widgets/ProductSlider';
import FeaturesV2 from '../../components/widgets/FeaturesV2';
import CollectionGallery from '../../components/widgets/CollectionGallery';
import TopProducts from '../../components/widgets/TopProducts';
import ShopCategory from '../../components/widgets/ShopCategory';
import SubscribeBoxV2 from '../../components/widgets/SubscribeBoxV2';
import PartenersSliderV2 from '../../components/widgets/PartenersSliderV2';
import DownloadApp from '../../components/widgets/DownloadApp';
import ContentLoader from '../../components/global/loaders/ContentLoader';
import CtaBannerSection from '../../components/widgets/CtaBannerSection';

import ShopCard from '../../components/widgets/ShopCard';
import shopCardData from '../../assets/data/shopCardData';
import qs from 'query-string-object'
import publicServices from '../../services/publicServices';

// data
import shopCategory from '../../assets/data/shopCategory';

//firebase
import firebase from '../../firebase';
import 'firebase/database';

//redux
import { generalActions } from "@actions/action";
import { connect } from 'react-redux';


class HomePageThree extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         banner: null,
         siteFeatures: [],
         products: null,
         clients: [],
         gallery: null,

         user: null,
         typeUser: null,
         showFeatures: true,
         recentContentList: null,
         recomendedContentList: null,
         categoriesList: null,
      }
   }

   componentDidMount() {
      this.getBannerData();
      this.getSiteFeaturesTwo();
      this.getContentList();
      this.getCategories();

      // this.getGallery();
      // this.getClients();
   }

   //get banner data
   getBannerData() {
      const banner = [
         {
            path: "/shop",
            subtitle: "Welcome to",
            thumb: "h-slider-1.jpg",
            title: "Patan's market"
         },
         {
            path: "/shop",
            subtitle: "",
            thumb: "h-slider-2.jpg",
            title: "Start shopping now"
         },
         {
            path: "/shop",
            subtitle: "",
            thumb: "h-slider-2.jpg",
            title: "Get the latest products"
         },
      ];
      this.setState({
         banner:banner
      });
   }

   //get site_features 2 data
   getSiteFeaturesTwo() {
      let siteFeatures = [
         {
            desc: "Shop at a reduced price compared to other stores",
            icon: "shopping_cart",
            title: "Afordable price"
         },
         {
            desc: "Contact the dev team and custom your app",
            icon: "thumb_up",
            title: "Custom products"
         },
         {
            desc: "View or download many content types",
            icon: "whatshot",
            title: "Multiple types"
         }
      ];
      this.setState({
         siteFeatures: siteFeatures
      });
   }

   getContentList() {      
      //get latest
      publicServices.getContentLatest().then((res)=>{
         if(res.status != 200) {
            console.log(res);
         } else {
            const recentContentList = res.data;
            this.setState({recentContentList: recentContentList });
         }
      });

      //get recomended content if logged
      const userInfo = localStorage.getItem('user');
      let typeUser, user;      
      if(userInfo) {
         user = JSON.parse(userInfo);
         typeUser = Object.keys(user.admin).length ? 'admin' : '';
         typeUser = Object.keys(user.client).length ? 'client' : typeUser;
         typeUser = Object.keys(user.provider).length ? 'provider' : typeUser;
         this.setState({user: user,typeUser : typeUser, showFeatures: false});
      } else {
         this.setState({showFeatures: true});
      }

      if(typeUser == 'client'){
         const urlparams = qs.stringify({
            userId: user.client.id
         });
         publicServices.getContentRecomended(urlparams).then((res)=>{
            if(res.status == 200) {
               const recomendedContentList = res.data;
               this.setState({recomendedContentList: recomendedContentList});
            }
         })
      }
   }

   getCategories(){
      publicServices.getContentCategories().then((res)=>{
         const categoriesList = res.data;
         this.setState({categoriesList:categoriesList});
      });
   }

   // //get gallery data
   // getGallery() {
   //    const galleryRef = firebase.database().ref('collection_gallery');
   //    galleryRef.on('value', (snapshot) => {
   //       let gallery = snapshot.val();
   //       this.setState({
   //          gallery: gallery
   //       });
   //    });
   // }

   // //get clients data
   // getClients() {
   //    const clientsRef = firebase.database().ref('clients');
   //    clientsRef.on('value', (snapshot) => {
   //       let clients = snapshot.val();
   //       this.setState({
   //          clients: clients
   //       });
   //    });
   // }


   render() {
      const { banner, siteFeatures, showFeatures ,recentContentList, recomendedContentList, categoriesList } = this.state;
      return (
         <Fragment>
            {(banner !== null && siteFeatures != null && recentContentList != null && categoriesList!= null) ? 
               <div className="iron-home-v3-wrap">

                  {showFeatures ? 
                     <div className="iron-banner-wrapper section-pad">
                        <div className="container">
                           <BannerSliderThree sliderData={banner} />
                        </div>
                     </div>
                  :
                     <span></span>
                  }
                  {showFeatures ? 
                     <div className="iron-features-wrap pt-md-15">
                        <div className="container">
                           <FeaturesV2 siteFeatures={siteFeatures} />
                        </div>
                     </div>
                  :
                     <span></span>
                  }
                  {/* collection gallery section start */}
                  {/* <div className="iron-collection-gallery-wrap section-pad">
                     <div className="container">
                        <CollectionGallery collectionData={gallery} />
                     </div>
                  </div> */}

                  {/* new content section start */}
                  < div className="iron-product-slider-wrap section-pad" >
                     <div className="container">
                        <div className="iron-sec-heading-wrap text-center mb-sm-60 mb-40">
                           <div className="heading-title">
                              <h3>Latest contents</h3>
                           </div>
                        </div>
                        <div>
                           <ProductSlider contentData={recentContentList} />
                        </div>
                     </div>
                  </div >

                  {/* Recomended section start */}
                  { recomendedContentList && recomendedContentList.length > 0? 
                  <div className="iron-cta-v2-wrapper section-pad pb-30">
                     <div className="container">
                        <div className="iron-sec-heading-wrap p-30 pb-0">
                           <div className="d-sm-flex justify-content-between align-items-center">
                              <div className="heading-title mb-sm-0 mb-10">
                                 <h3 className="mb-0">Recomended contents</h3>
                              </div>
                              <Link to="/shop" className="text-14 font-medium text-uppercase">view all</Link>
                           </div>
                        </div>
                        <ShopCard deals={recomendedContentList} />
                     </div>
                  </div>
                  : 
                  <span></span>}

                  {/* shop category section start */}
                  { categoriesList ?              
                  <div className="iron-shop-category-wrap section-pad bg-grey">
                     <div className="container">
                        <div className="iron-sec-heading-wrap mb-sm-50 mb-40">
                           <div className="heading-title">
                              <h3 className="font-light">Shop By Category</h3>
                           </div>
                        </div>
                        <ShopCategory shopCategory={categoriesList} />
                     </div>
                  </div>
                  :
                  <span></span>
                  }

                  {/* cta banner section start */}
                  {/* <div className="iron-cta-banner-wrapper">
                     <div className="container">
                        <CtaBannerSection />
                     </div>
                  </div> */}

                  {/* content for now */}
                  {/* <div className="iron-top-products-wrapper section-pad pb-0">
                     <div className="container">
                        <div className="iron-sec-heading-wrap mb-30">
                           <div className="d-sm-flex justify-content-between align-items-center">
                              <div className="heading-title  mb-sm-0 mb-10">
                                 <h3 className="mb-0">All products</h3>
                              </div>
                              <Link to="/shop" className="text-14 font-normal text-capitalize text-14 dark-color">view all</Link>
                           </div>
                        </div>
                        <TopProducts Data={contents.list} />
                     </div>
                  </div> */}
                  {/* parteners section start */}
                  {/* <div className="iron-partener-wrapper layout-v3 section-pad">
                     <div className="container">
                        <div className="iron-sec-heading-wrap text-center mb-md-50 mb-25">
                           <div className="heading-title">
                              <h3 className="mb-0">Top Providers</h3>
                           </div>
                        </div>
                        <PartenersSliderV2 clientdata={clients} />
                     </div>
                  </div> */}
                  {/* subscribe section start */}
                  {/* <div className="iron-subscribe-box-v2 bg-primary section-pad position-relative">
                     <SubscribeBoxV2 />
                  </div> */}
                  {/* download section start */}
                  {/* <div className="iron-dwnld-app-wrapper py-25">
                     <div className="container">
                        <DownloadApp />
                     </div>
                  </div> */}
               </div>
               :
               <ContentLoader />
            }
         </Fragment>
      )
   }
}

export default HomePageThree;