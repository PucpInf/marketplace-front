/**
 * site header one component
 */
/* eslint-disable */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";

// components
import LanguageProvider from "./LanguageProvider";
import HeaderMenu from "./HeaderMenu";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Logout from "./Logout";
import SearchBox from "./SearchBox";
import SidebarMenu from '../sidebar';
import FixedHeader from '../headers/FixedHeader';
import AppConfig from '../../../constants/AppConfig';
import algoliasearch from 'algoliasearch/lite';
import {
   InstantSearch,
   Configure,
} from 'react-instantsearch-dom';

class HeaderOne extends React.Component {

   state = {
      fixedHeader: false,
      typeUser: '',
   }
   constructor(props){
      super(props);
   }

   onSuggestionSelected = (_, { suggestion }) => {
      window.location.reload();
   };
  
   onSuggestionCleared = () => {

   };

   componentWillMount() {
      window.addEventListener('scroll', this.hideBar);
      const userInfo = localStorage.getItem('user');
      if(userInfo) {
         const user = JSON.parse(userInfo);
         let typeuSER = Object.keys(user.admin).length ? 'admin' : 'client';
         typeuSER = Object.keys(user.client).length ? 'client' : typeuSER;
         typeuSER = Object.keys(user.provider).length ? 'provider' : typeuSER;
         this.setState({typeUser: typeuSER});
      } else {
         this.setState({typeUser: 'client'});
      }
   }

   componentWillUnmount() {
      window.removeEventListener('scroll', this.hideBar);
   }

   // function to show and hide fixed header
   hideBar = () => {
      const { fixedHeader } = this.state;
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.scrollTop >= 200 ?
         !fixedHeader && this.setState({ fixedHeader: true })
         :
         fixedHeader && this.setState({ fixedHeader: false });
   }

   render() {
      const {regionData} = this.props;
      const searchClient = algoliasearch(
         AppConfig.algoliaConfig.appId,
         AppConfig.algoliaConfig.apiKey,
      );
      return (
         <div>
            <AppBar position="static" className={`iron-header-wrapper bg-primary iron-header-v1 ${(this.state.fixedHeader) ? 'header-fixed' : ''}`}>
               <div className="iron-header-top py-30">
                  <div className="container">
                     <Grid container spacing={0} >
                        <Grid item md={4} lg={4} xl={4} className="d-flex justify-content-start align-items-center" >
                           <div className="iron-header-widgets d-flex justify-content-start align-items-center">
                              <LanguageProvider />
                           </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} >
                           <div className="iron-app-logo text-md-center">
                              <img className="logo-header" src={AppConfig.AppLogo} alt="header-logo" />
                           </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} className="d-flex justify-content-end align-items-center" >
                           <div className="iron-header-widgets d-flex justify-content-end align-items-center ">
                              {/* <Cart />
                              <Wishlist /> */}
                              <Logout />
                           </div>
                        </Grid>
                     </Grid>
                  </div>
               </div>
               <div className="iron-header-bottom">
                  <div className="container">
                     <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                           <div className="text-center position-relative">
                              <HeaderMenu typeUser={this.state.typeUser} />
                              <SidebarMenu typeUser={this.state.typeUser} />
                              <InstantSearch searchClient={searchClient}
                                             indexName={AppConfig.algoliaConfig.indexName}>
                                 < SearchBox 
                                    onSuggestionSelected={this.onSuggestionSelected}
                                    onSuggestionCleared={this.onSuggestionCleared} />
                                 { regionData ? 
                                    <Configure filters={'regions.code:'.concat('\'',regionData.code,'\'')}/>
                                    :
                                    <span></span>}
                              </InstantSearch>
                           </div>
                        </Grid>
                     </Grid>
                  </div>
               </div>
               <FixedHeader />
            </AppBar>
         </div>
      );
   }
}

export default HeaderOne;