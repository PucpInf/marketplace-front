//Invoice popup
/* eslint-disable */
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CSVReader from 'react-csv-reader'
import Divider from '@material-ui/core/Divider';
import CurrencyIcon from '../../../../../components/global/currency/CurrencyIcon';
import publicServices from '@services/publicServices';
import privateServices from '@services/privateServices';

class InvoicePopup extends React.Component {
   state = {
      open: false,
      listCodes: [],
   };

   componentDidMount() {
   }

   //Define function for open confirmation dialog box
   handleClickOpen = () => {
      this.setState({
         open: true,
      });
   };

   //Define function for close confirmation dialog box and callback for delete item 
   closeDialog = () => {
      this.setState({ open: false });
   };

   approveProduct = () => {
      privateServices.uploadCodes({
         contentId: this.props.data.id,
         codes: this.state.listCodes
      }).then(res => {
         alert('Se ha actualizado la informacion del producto correctamente');
      }).catch(err => {
         alert('Hubo un error al actualizar el producto');
      });
   };

   handleOkCSV = (data) => {
      const auxList = [];
      data.forEach(str => str[0] && auxList.push(str[0]));
      console.log(auxList);
      this.setState({ listCodes: auxList});
   };

   handleDarkSideForce = () => {
      alert('Hubo un error al cargar el csv');
   }

   render() {
      const { data } = this.props;
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
                           <h4 className="mb-sm-20 mb-10">{data.title}</h4>
                           <h5 className="mb-sm-25 mb-10">{data.description}</h5>
                           <h6 className="mb-sm-25 mb-10">{`Requested: ${data.created.slice(0,10)}`}</h6>
                           <h6 className="mb-sm-25 mb-10">{`Price: $${data.price}`}</h6>
                        </div>
                        <div className="p-sm-30 p-15">
                           <div className="pt-sm-20 pb-sm-40 pb-15">
                              <Grid container spacing={0}>
                                 <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <div className="mb-md-0 mb-20 text-left">
                                       <h6>Plans:</h6>
                                       {
                                          (data.plans || []).map((elem, idx)=>(
                                             <p className="mb-5" key={idx}>{`- ${elem.sp_name} ~ $${elem.sp_price}`}</p>
                                          ))
                                       }
                                    </div>
                                 </Grid>
                              </Grid>
                              <Divider className="my-sm-30 my-15"></Divider>
                              <Grid container spacing={0}>
                                 <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <div className="mb-md-0 mb-20 text-left">
                                       <h6>Regions:</h6>
                                       {
                                          data.regions.map((elem, idx)=>(
                                             <p className="mb-5" key={idx}>{`- ${elem.code}`}</p>
                                          ))
                                       }
                                    </div>
                                 </Grid>
                              </Grid>
                              <Divider className="my-sm-30 my-15"></Divider>
                              <Grid container spacing={0}>
                                 <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <div className="mb-md-0 mb-20 text-left">
                                       <h6>Categories:</h6>
                                       {
                                          data.categories.map((elem, idx)=>(
                                             <p className="mb-5" key={idx}>{`- ${elem.code}`}</p>
                                          ))
                                       }
                                    </div>
                                 </Grid>
                              </Grid>
                              <Divider className="my-sm-30 my-15"></Divider>
                                 <Grid container spacing={0}>
                                    <Grid item xs={12} sm={6} md={6} lg={6} >
                                       <div className="mb-md-0 mb-20 text-left">
                                          <h6>Upload codes:</h6>
                                          <CSVReader
                                             cssClass="csv-reader-input"
                                             label="Select CSV with a single colum of codes"
                                             onFileLoaded={this.handleOkCSV}
                                             onError={this.handleDarkSideForce}
                                             inputId="ObiWan"
                                             inputStyle={{color: 'red'}}
                                          />
                                       </div>
                                    </Grid>
                                 </Grid>
                           </div>
                        </div>
                     </div>
                     <div className="p-sm-30 p-15 d-sm-flex justify-content-between align-items-center">
                        <Button className="button btn-active btn-lg mb-20 mr-20" onClick={this.approveProduct}>Approve</Button>
                        <Button className="button btn-active btn-lg  mb-20 " onClick={this.closeDialog}>Cancel</Button>
                     </div>
                  </div>
               </DialogContent>
            </Dialog >
         </Fragment>
      );
   }
}

export default InvoicePopup;