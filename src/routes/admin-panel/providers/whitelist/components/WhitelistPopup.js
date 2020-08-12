//Invoice popup
/* eslint-disable */
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CurrencyIcon from '../../../../../components/global/currency/CurrencyIcon';
import publicServices from '../../../../../services/publicServices';

class WhitelistPopup extends React.Component {
   state = {
      open: false,
   };

   constructor(props) {
      super(props);
   };

   //Define function for open confirmation dialog box
   handleClickOpen = () => {
      this.setState({
         open: true,
      });
   };

   //Define function for close confirmation dialog box and callback for delete item 
   closeDialog() {
      this.setState({ open: false });
   };
   
   whitelistProvider() {
      const providerData = {
         providerId: this.props.data.id,
         action:1
      }
      publicServices.whitelistProvider(providerData).then(
         (res)=>{
            if(res.status == 200) {
               console.log(res);
               this.closeDialog();
               window.location.reload();       
            }
         }
      ).catch((e)=>{console.log(e)});
   }


   render() {
      const {data} = this.props;
      return (
         <Fragment>
            <Button
               className="action-btn"
               onClick={this.handleClickOpen}
            >
               <i className="material-icons primary-color">remove_red_eye</i>
            </Button>
            <Dialog
               className="admin-invoice-wrap"
               open={this.state.open}
               onClose={() => this.closeDialog()}
               aria-labelledby="responsive-dialog-title"
            >
               <DialogContent className="p-20 text-center">
                  <div className="iron-invoice-wrap bg-base">
                     <div id="payment-receipt">
                        <div className="text-center bg-secondary px-sm-50 px-15 py-sm-50 py-20">
                           <h4 className="mb-sm-20 mb-10">Provider data</h4>
                           {/* <h5 className="mb-sm-25 mb-10">Payment is successfully processsed and your order delivred</h5> */}
                           <h6 className="mb-sm-25 mb-10">{data.companyName}</h6>
                           {/* <img
                              src={require("../../../../assets/images/checked.png")} alt="success"
                           /> */}
                        </div>
                        <div className="p-sm-30 p-15">
                           {/**include provider data of sales */}
                           {/* <div className="pt-sm-20 pb-sm-40 pb-15">
                              <Grid container spacing={0}>
                                 <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <div className="mb-md-0 mb-20 text-left">
                                       <h6>Summary</h6>
                                       <p className="mb-5">Request ID: {data.id}</p>
                                       <p className="mb-5">Request Date: {data.created.slice(0,10)} </p>
                                    </div>
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <div className="text-sm-right text-left">
                                       <h6>User</h6>
                                       <p className="mb-5 text-capitalize">
                                          User ID:{data.clientid}
                                       </p>
                                       <p className="mb-5">Juan perez</p>
                                       <p className="mb-5">john@gmail.com</p>
                                    </div>
                                 </Grid>
                              </Grid>
                           </div> */}
                           {/* <div className="py-25 px-15  text-center bg-secondary mb-sm-50 mb-30">
                              <h4 className="mb-sm-15 mb-0">Expected Date of Delivery</h4>
                              <h3 className="mb-sm-15 mb-0">April 30, 2019</h3>
                           </div> */}
                           {/* <div>
                              <h6 className="pt-5">Request details</h6>
                              <Divider className="my-20" />
                           </div>
                           <div>
                              <Grid container spacing={0}>
                                 <Grid item xs={12} sm={12} md={12} lg={12} className="pt-10" >
                                    <div className="d-flex justify-content-between align-items-center mb-15">
                                       <span className="d-inline-block text-capitalize text-14">{data.description}
                                                        </span>
                                    </div>
                                    <Divider className="my-sm-30 my-15"></Divider>
                                 </Grid>
                              </Grid>
                           </div> */}
                        </div>
                     </div>
                     <div className="p-sm-30 p-15 d-sm-flex justify-content-between align-items-center">
                        <Button className="button btn-active btn-lg mb-20 mr-20" onClick={()=>this.whitelistProvider()}>Whitelist provider</Button>
                        <Button className="button btn-active btn-lg  mb-20 " onClick={()=>this.closeDialog()}>Cancel</Button>
                     </div>
                  </div>
               </DialogContent>
            </Dialog >
         </Fragment>
      );
   }
}

export default WhitelistPopup;