/**
 * Invoices List
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import publicServices from '@services/publicServices';
import privateServices from '@services/privateServices';
import ReactTable from 'react-table';
//firebase
import firebase from '../../../../firebase';
//component
import ContentLoader from '../../../../components/global/loaders/ContentLoader';
import ConfirmationBox from './components/ConfirmationBox';
import InvoicePopup from './components/InvoicePopup';

export default class InvoiceList extends Component {
   constructor(props) {
      super(props);
      this.confirmationDialog = React.createRef();
   }

   state = {
      name: '',
      invoiceList: null,
      searchClientText: '',

      listProducts: [],
   };

   allUserInvoice = [];     //all clients data

   handleChange = name => event => {
      this.setState({ [name]: event.target.value });
   };
   componentDidMount() {
      this.getInvoiceData();
      const user = JSON.parse(localStorage.getItem('user'));
      privateServices.getProviderProducts(user.provider.id).then((res)=>{
         this.setState({listProducts: res.data});
      });
   }

   //get invoice list
   getInvoiceData() {
      const invoiceListRef = firebase.database().ref('invoice_list');
      invoiceListRef.on('value', (snapshot) => {
         let invoiceList = snapshot.val();
         this.setState({
            invoiceList: invoiceList
         });
         this.allUserInvoice = invoiceList;
      });
   }
   onSearchClient(searchText) {
   }

   onDeleteCartItem(data) {
   }

   deleteCartItem(popupResponse) {
      
   }

   render() {
      const { invoiceList, listProducts } = this.state;
      const columns = [
         {
            Header:'N.',
            accessor: 'id',
         },
         {
            Header:'Title',
            accessor: 'title',
         },
         {
            Header:'Description',
            accessor: 'description',
         },
         {
            Header:'Size',
            accessor: 'size',
            Cell: props => {
               return (
                  `${props.original.size} B`
               )
            },
         },
         {
            Header:'Date',
            accessor: 'created',
            Cell: props => {
               return (
                  `${props.original.created.slice(0,10)}`
               )
            },
         },
         {
            Header: 'action',
            accessor: 'action',
            Cell: props => {
               console.log('?', props.original);
               return (
                  <div>
                     <InvoicePopup data={props.original} />
                  </div>
               )
            },
         }
      ]
      return (
         <Fragment>
            {invoiceList !== null ?
               <div className="inner-container">
                  <div className="iron-invoice-list-wrap">
                     <div className="page-title mb-20">
                        <h4 className="mb-0">My products:</h4>
                     </div>
                     <div className="iron-shadow rounded p-sm-20 p-15 mb-30 bg-base">
                        <Grid container spacing={24} className="search-box-wrap my-0">
                           <Grid item sm={12} md={12} lg={12} className="py-0 d-sm-flex d-block">
                              <div className="search-box d-block d-sm-flex align-items-center">
                                 <TextField
                                    id="standard-name"
                                    label="Search Products"
                                    className="my-0 iron-form-input-wrap mr-5"
                                    fullWidth
                                    value={this.state.searchClientText}
                                    onChange={(e) => this.onSearchClient(e.target.value)}
                                 />
                              </div>
                           </Grid>
                        </Grid>
                     </div>
                     <div className="iron-shadow rounded p-20 bg-base">
                        <ReactTable
                           data={listProducts}
                           columns={columns}
                           minRows={6}
                           defaultPageSize={10}
                        />
                     </div>
                  </div>
                  <ConfirmationBox
                     ref={this.confirmationDialog}
                     onConfirm={(res) => this.deleteCartItem(res)}
                  />
               </div>
               :
               <ContentLoader />
            }
         </Fragment>
      )
   }
}