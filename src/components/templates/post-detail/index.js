/**
 * post detail component
*/
/* eslint-disable */
import React, { Fragment } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import { compose } from 'recompose';
import RatingStar from '../../widgets/RatingStar';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';
import AppConfig from '@constants/AppConfig';
import publicServices from '@services/publicServices';
import privateServices from '@services/privateServices';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

//connect to store
import { connect } from 'react-redux';

//components
import CurrencyIcon from '@components/global/currency/CurrencyIcon';
import ProductReview from '@components/global/review-popup/ProductReview';
import StreamPopup from '@components/global/stream-popup/StreamPopup';

// actions
import { showAlert } from "@actions/action";

class PostDetail extends React.Component {

   constructor(props) {
      super(props);
      this.reviewDialog = React.createRef();
      this.streamDialog = React.createRef();
   }

   state = {
      // newImage: this.props.data.image,
      newImage: '',
      showStripe: false,
      variations: {
         color: '',
         size: '',
         quantity: ''
      },
      typeUser: '',
      data: Object.assign({},this.props.contentData.info),
      flagBuy: this.props.contentData.FlagBuy,
      flagPlan: this.props.contentData.FlagPlan,
      flagDownload: this.props.contentData.FlagDownload,
      type: '',
      showModalRequest: false,
      textRequest: '',
   }

   

   componentDidMount() {
      
      
      
      const userInfo = localStorage.getItem('user');
      let user = {};
      let type = 'web';
      if (userInfo) {
         user = JSON.parse(userInfo);
         if (user.os.includes('iOS')) {
            type = 'ios';
         } else if (user.os.includes('Android')) {
            type = 'android';

         } else {
            type = 'web';
         }


      }
      const imgProd = this.props.contentData.imagesurls && this.props.contentData.imagesurls.length && this.props.contentData.imagesurls[0].ImageUrl;
      this.setState({
         newImage: imgProd || require(`../../../assets/images/post-1.jpg`),
         data: Object.assign({},this.props.contentData.info),
         type: type,
      })
   }

   //function for preview images
   changePreviewImage(image) {
      this.setState({
         newImage: image
      });
   }

   //function for product variation
   changeProductVariation(type, e) {
      this.setState({
         variations: {
            ...this.state.variations,
            [type]: e.target.value
         }
      })
   }

   //function for review popup ref.
   postReviewOpen() {
      // this.refs.content.getWrappedInstance().open();
      this.reviewDialog.current.open();
   }

   streamViewOpen() {
      this.streamDialog.current.open();
   }

   //add product to wishlist
   addProductToWishList(productdata) {
      this.props.addToWishlist(productdata);
      setTimeout(() => {
         this.props.showAlert('Your product Is Successfully added in whislist', 'success')
      }, 500)
   }

   // define function for add product in cart
   onAddToCart(product) {
      this.props.addProductItem(product);
      setTimeout(() => {
         this.props.showAlert('Your product Is Successfully added in cart', 'success')
      }, 500)
   }

   onDownload(content) {
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
         const user = JSON.parse(userInfo);

         let hasIOS = this.state.hasIOS;
         let unassignedCodes = this.state.productAvailable;
         window.open(`${AppConfig.apiUrl}/contents/download?userId=${user.client.id}&contentid=${content.id}`);
      }
   }

   onRequest = (content) => {
      this.setState(prevState => ({
         showModalRequest: !prevState.showModalRequest
      }));
   }

   onRequestSend = () => {
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
         const user = JSON.parse(userInfo);
         publicServices.createRequest({
            contentid: this.props.contentData.info.id,
            clientid: user.client.id,
            typeid: 5,
            description: this.state.textRequest,
         }).then(res => {
            alert('Solicitud Registrada');
            window.location.reload();
         })
      } else {
         alert('Primero, debe iniciar sesion');
      }
      
      this.setState(prevState => ({
         showModalRequest: !prevState.showModalRequest
      }));
   }

   onBuy(content) {
      if(!this.state.showStripe){
         const userInfo = localStorage.getItem('user');
         if(userInfo) {
            const user = JSON.parse(userInfo);
            let typeuSER = Object.keys(user.admin).length ? 'admin' : '';
            typeuSER = Object.keys(user.client).length ? 'client' : typeuSER;
            typeuSER = Object.keys(user.provider).length ? 'provider' : typeuSER;
            if (typeuSER === 'client') {
               this.setState({typeUser: typeuSER, showStripe: true});
            } else {
               alert('Necesitas iniciar sesion como cliente para comprar el producto');
               window.location.href = `${window.location.origin}/sign-in`;
            }
         } else {
            window.location.href = `${window.location.origin}/sign-in`;
         }
      } else {
         const userInfo = localStorage.getItem('user');
         if(userInfo) {
            const user = JSON.parse(userInfo);
            this.props.stripe.createToken().then(({token}) => {
               publicServices.singlePayment({
                  "stripeToken":token.id,
                  "productId":content.id,
                  "clientId": user.client.id,
               }).then((res) => {
                  alert('Se ha comprado el producto');
                  window.location.reload();
               })
            });
         }
         
      }
   }

   doOwnProduct(id){
      return this.state.flagBuy || this.state.flagPlan;
   }

   canStream(){
      if(this.props.contentData && this.props.contentData.types.length > 0){
         return this.props.contentData.types[0].id === 1 || this.props.contentData.types[0].id === 2 
      }
      return false;
   }

   getMyIOScode = () => {
      const userInfo = localStorage.getItem('user');
      const user = JSON.parse(userInfo);
      privateServices.getIOScode({
         contentId: this.props.contentData.info.id,
         clientId: user.client.id,
      }).then((res) => {
         if(res.status != 200) {
            alert('Ha ocurrido un error procesando su solicitud');
         } else {
            alert('Codigo obtenido con exito');
            window.location.reload();
         }
      });
   }

   handleChangeRequestMessage = (e) => {
      this.setState({
         textRequest: e.target.value,
      });
   }
   
   getProductComponent = () => {
      let component = <Fragment/>;
      let downloadable = false;
      let isCodeForIos = false;
      let hasCodeIos = false;
      let unassignedCodes = 0;
      let vrRequest = false;
      const productType = this.state.type;
      switch(productType) {
         case 'ios': 
            this.props.contentData.types.forEach(elem => {
               if (elem.type === 'Video' || elem.type === 'Audio'){
                  downloadable = true;
               }
               if (elem.type === 'Virtual Reality App'){
                  vrRequest = true;
               }
               if (elem.type === 'Ios App'){
                  isCodeForIos = true;
                  hasCodeIos = !!this.props.contentData.iosCode;
                  unassignedCodes = parseInt(elem.unassignedCodes, 10);
               }
            });
            if (downloadable && !vrRequest) {
               component = (
                  <Button
                     className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     onClick={() => this.onDownload(this.state.data)}
                  >
                     Download
                  </Button>
               );
            } else if (isCodeForIos) {
               if (hasCodeIos) {
                  component = (
                     <div style={{border: '1px solid orange'}}>
                        My IOS code is: {this.props.contentData.iosCode.code}
                     </div>
                  );
               } else if (unassignedCodes > 0) {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.getMyIOScode(this.state.data)}
                     >
                        Get my code
                     </Button>
                  );
               } else {
                  component = (
                     <div
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     >
                        No hay codigos disponibles
                     </div>
                  );
               }
            } else if (vrRequest) {
               if (this.props.contentData.Flagsolicitud == -1) {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onRequest(this.state.data)}
                     >
                        Request this product
                     </Button>
                  );
               } else if (this.props.contentData.Flagsolicitud == 0) {
                  component = (
                     <div
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     >
                        Solicitud en proceso
                     </div>
                  );
               } else {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onDownload(this.state.data)}
                     >
                        Download my product
                     </Button>
                  );
               }
            }
            break;
         case 'android':
            this.props.contentData.types.forEach(elem => {
               if (elem.type === 'Android App' || elem.type === 'Video' || elem.type === 'Audio' || elem.type === 'Virtual Reality App'){
                  downloadable = true;
               }
               if (elem.type === 'Virtual Reality App'){
                  vrRequest = true;
               }
            });
            if (downloadable && !vrRequest) {
               component = (
                  <Button
                     className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     onClick={() => this.onDownload(this.state.data)}
                  >
                     Download
                  </Button>
               );
            } else if (vrRequest) {
               if (this.props.contentData.Flagsolicitud == -1) {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onRequest(this.state.data)}
                     >
                        Request this product
                     </Button>
                  );
               } else if (this.props.contentData.Flagsolicitud == 0) {
                  component = (
                     <div
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     >
                        Solicitud en proceso
                     </div>
                  );
               } else {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onDownload(this.state.data)}
                     >
                        Download my product
                     </Button>
                  );
               }
            }
            
            break;
         case 'web':
            this.props.contentData.types.forEach(elem => {
               if (elem.downloadable){
                  downloadable = true;
               }
               if (elem.type === 'Virtual Reality App'){
                  vrRequest = true;
               }
            });
            if (downloadable && !vrRequest) {
               component = (
                  <Button
                     className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     onClick={() => this.onDownload(this.state.data)}
                  >
                     Download
                  </Button>
               );
            } else if (vrRequest) {
               if (this.props.contentData.Flagsolicitud == -1) {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onRequest(this.state.data)}
                     >
                        Request this product
                     </Button>
                  );
               } else if (this.props.contentData.Flagsolicitud == 0) {
                  component = (
                     <div
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                     >
                        Solicitud en proceso
                     </div>
                  );
               } else {
                  component = (
                     <Button
                        className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                        onClick={() => this.onDownload(this.state.data)}
                     >
                        Download my product
                     </Button>
                  );
               }
            }
            break;
         default:
            console.log('btt default');
      }
      return component;
   }

   render() {
      const { newImage, showModalRequest } = this.state;
      const { contentData } = this.props;
      const { id,title, description, price, size , categories, avgRating} = contentData.info;
      const { calification } = contentData;
      return (
         < div >
            <Grid container spacing={32} className="my-0">
               <Grid item xs={12} sm={12} md={6} lg={6} className="py-0 mb-md-0 mb-sm-30">
                  <Grid container spacing={24} className="iron-product-gallery">
                     <Grid item xs={9} sm={10} md={10} lg={10}>
                        <div className="preview-full-image">
                           <div className="iron-shadow product-gallery-item ">
                              <div>
                                 <a href="javascript:void(0)">
                                    <img
                                       src={this.state.newImage}
                                       alt="poster-image"
                                    />
                                 </a>
                              </div>
                           </div>
                        </div>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={12} sm={12} md={6} lg={6} className="py-0">
                  <div className="detail-content">
                     <Link to="/" className="text-14 d-inline-block mb-10">Back to shop</Link>
                     <h3>{title}</h3>
                     <div>                        
                        <RatingStar ratingAvg={avgRating}/>
                        { (avgRating && avgRating > 0 ) ?
                           <p>{ avgRating} of 5 stars on average | <a className="text-underline d-inline-block dark-color" onClick={() => this.postReviewOpen()}> {calification.length} client reviews</a></p> 
                           :
                           <p> No reviews registered | <a className="text-underline d-inline-block dark-color" onClick={() => this.postReviewOpen()}> {calification.length} client reviews</a></p>}                      
                     </div>
                     <p>Price:</p><h4 className="active-color"><CurrencyIcon /> {price}</h4>                 
                     <ul className="no-style mb-20">
                        <li className="mb-10"><span className="font-medium text-14"> Tags </span> :
                           {categories && categories.map((tag, index) => {
                              return (
                                 <span key={index} className="text-14 ml-5">{tag.code}</span>
                              )
                           })}
                        </li>
                     </ul>
                     <div className="short-desc">
                        <p>{description}</p>
                     </div>
                     <div className="mb-sm-50 mb-20 detail-btns">
                        {!(this.doOwnProduct(id)) ?
                           (
                              <Fragment>
                                 <Button
                                    className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                                    onClick={() => this.onBuy(this.state.data)}
                                 >
                                    Buy
                                 </Button>
                                 { this.state.showStripe ?
                                    (
                                       <Fragment>
                                          <InputLabel style={{display:'block', marginTop: '15px'}} htmlFor="select-type">Complete your card credentials and then click again in Buy</InputLabel>
                                          <CardElement style={{height: '32px'}}/>
                                       </Fragment>
                                    ) : <Fragment/>
                                 }
                              </Fragment>          
                           )
                           :
                              this.getProductComponent()
                        }
                        {this.doOwnProduct(id) && this.canStream(id)? (
                           <Button className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                                 onClick={() => this.streamViewOpen()}>
                              View
                           </Button>
                        ):
                        <span></span>}

                     </div>
                  </div>
               </Grid>
            </Grid>
               <Dialog
                  open={this.state.showModalRequest}
                  onClose={this.onRequest}
                  aria-labelledby="responsive-dialog-title"
               >
                  <DialogContent className="p-20 text-center">
                     <h5 className="pt-sm-20 mb-0">Complete la informacion solicitada por el proveedor:</h5>
                     <br/>
                     <TextField
                        id="standard-multiline-static"
                        label="Detalles del producto"
                        multiline
                        rows="5"
                        className="iron-form-input-wrap"
                        ref="message"
                        onChange={this.handleChangeRequestMessage}
                        value={this.state.textRequest}
                     />
                  </DialogContent>
                  <DialogActions className="px-20 pb-20 pt-sm-15 justify-content-center">
                     <Button onClick={this.onRequest} className="button btn-active mr-15" autoFocus>
                        Cancelar
                     </Button>
                     <Button onClick={this.onRequestSend} className="button btn-active mr-15">
                        Enviar
                     </Button>
                  </DialogActions>
               </Dialog >
            <ProductReview ref={this.reviewDialog} contentData={this.props.contentData}/>
            <StreamPopup ref={this.streamDialog} contentData={this.props.contentData}/>
            {/* <ProductReview ref="content" contentData={this.props.contentData}/> */}
         </div >
      )
   }
}
// const mapStateToProps = ({ ecommerce }) => {
//    const { cart, wishlist } = ecommerce;
//    return { cart, wishlist };
// }

const enhance = compose(
   injectStripe,
   connect(null, {
      showAlert
   })
);

export default enhance(PostDetail);
