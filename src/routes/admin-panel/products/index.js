/**
 * Products
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
import publicServices from '@services/publicServices';

//firebase
import firebase from '../../../firebase';

//component
import ContentLoader from '../../../components/global/loaders/ContentLoader';
import ProductsGrid from '../../../components/widgets/productGrid';
import ConfirmProduct from './components/ConfirmProduct';
import qs from 'query-string-object'

export default class Products extends Component {
   constructor(props) {
      super(props);
      this.confirmationDialog = React.createRef();
   }

   state = {
      name: '',
      allProducts: null,
      gridlayout: true,
      products: null,
      variations: {
         type: '',
         time_interval: '',
         quantity: ''
      },
      searchContentText: '',
   };

   componentDidMount() {
      this.getContents();
   }

   //get products data
   getContents() {
      const user = localStorage.getItem('user');
      let urlparams;

      if (user) {
         const parsedUser = JSON.parse(user);
         urlparams = qs.stringify({
            ownerid: parsedUser.provider.id
         });
      }

      publicServices.getContentsProvider(urlparams).then((res)=>{
         if(res.status == 200) {
            this.setState({products: res.data});
            this.setState({allProducts: res.data});
         }
      }).catch((err)=>{console.log(err)});

   }

   handleChange = name => event => {
      this.setState({ [name]: event.target.value });
   };

   // show list layout
   gridLayout = () => {
      this.setState({ gridlayout: true });
   };

   // show grid layout
   listLayout = () => {
      this.setState({ gridlayout: false });
   };

   //function for product variation
   changeProductVariation(type, e) {
      this.setState({
         variations: {
            ...this.state.variations,
            [type]: e.target.value
         }
      })
   }

   onDeleteProductItem(dataitem) {
      this.dataitem = dataitem;
      this.confirmationDialog.current.openDialog();
   }

   /**
    * function for delete cart product
    * @param {boolean} popupResponse 
    */
   deleteDataItem(popupResponse) {
      if (popupResponse) {
         let deleteItem = this.dataitem;
         let newData = this.state.products.filter((productsItem) => productsItem.objectID !== deleteItem.objectID)
         this.setState({
            products: newData
         })
      }
   }

   onSearchContent(searchText) {
      if (searchText === '') {
         this.setState({
            ...this.state,
            products: this.state.allProducts,
            searchContentText: searchText,
         });
      } else {
         let searchContent = this.state.allProducts.filter((content) => {
            if (searchText === searchText.toLowerCase()) {
               let title = content.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
               return (
                  title
               )
            }
            else {
               let title = content.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1
               return (
                  title
               )
            }
         });
         this.setState({
            ...this.state,
            searchContentText: searchText,
            products: searchContent
         })
      }
   }

   render() {
      const { products } = this.state;
      const columns = [
         {
            maxWidth: 75,
            Header: 'id',
            accessor: 'id'
         },
         {
            sortable: false,
            maxWidth: 100,
            Header: 'image',
            accessor: 'image',
            Cell: props =>
               <span className='avatar'>
                  {/* <img src={require(`../../../assets/images/${props.value}`)} alt="client-avatar" width="30" height="30" /> */}
                  <img src={require(`../../../assets/images/post-1.jpg`)} alt="client-avatar" width="30" height="30" />
               </span>
         },
         {
            minWidth: 150,
            Header: 'title',
            accessor: 'title',
         },
         {
            minWidth: 120,
            Header: 'size',
            accessor: 'size',
            Cell: props => 
               <span>{props.original.size} B</span>
         },
         {
            Header: 'category',
            accessor: 'category',
            Cell: props => {
               return (
                  <div>
                     {props.original.categories.map((category, index) => {
                        return (
                           <span key={index}>{category.code} </span>
                        )
                     })}
                  </div>
               )
            },
         },
         {
            Header: 'price',
            accessor: 'price',
         },
         {
            Header: 'action',
            Cell: props => {
               return (
                  <div>
                     <Button component={Link} to={`/admin-panel/admin/content-version/${props.original.id}`} className="action-btn"><i className="material-icons primary-color">update</i>
                     </Button>
                     {/* <Button className="action-btn"
                        onClick={() => this.onDeleteProductItem(props.original)}
                     >
                        <i className="material-icons active-color">delete</i></Button> */}
                  </div>
               )
            },
         }
      ]
      return (
         <Fragment>
            {products !== null ?
               <div className="inner-container">
                  <div className="iron-products-wrap">
                     <div className="iron-shadow rounded p-sm-20 p-15 mb-20 bg-base">
                        <Grid container spacing={24} className="search-box-wrap my-0">
                           <Grid item sm={12} md={3} lg={3} className="py-0 d-flex justify-content-start align-items-center">
                              <h4 className="mb-lg-0 mb-5 text-uppercase">Search</h4>
                           </Grid>
                           <Grid item sm={12} md={9} lg={9} className="py-0 d-sm-flex d-block">
                              <div className="search-box d-block d-sm-flex align-items-center">
                                 {/* <TextField
                                    id="standard-name"
                                    label="Search Products"
                                    className="my-0 iron-form-input-wrap mr-5"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                 /> */}
                                 <TextField
                                    id="standard-name"
                                    label="Search Content"
                                    className="my-0 iron-form-input-wrap mr-5"
                                    fullWidth
                                    value={this.state.searchContentText}
                                    onChange={(e) => this.onSearchContent(e.target.value)}
                                 />
                                 {/* <Button className="button btn-primary mx-sm-10 my-10 my-sm-0">search</Button> */}
                              </div>
                              <div className="btn-wrap d-sm-flex d-block justify-content-between align-items-center">
                                 <Button component={Link} to="/admin-panel/admin/product-add" className="button btn-primary">add products<i className="material-icons ml-5">add</i></Button>
                              </div>
                           </Grid>
                        </Grid>
                     </div>
                     <div>
                        <div className="d-flex justify-content-between align-items-center my-15">
                           <h5 className="text-capitalize mb-0">
                              {this.state.gridlayout === true ?
                                 'content grid'
                                 :
                                 'content list'
                              }
                           </h5>
                           <div className="projects-icon">
                              <Button className={`btn-icon ${this.state.gridlayout === true ? 'active' : ''}`} onClick={() => this.gridLayout()}>
                                 <i className="material-icons">apps</i>
                              </Button>
                              <Button className={`btn-icon ${this.state.gridlayout === false ? 'active' : ''}`} onClick={() => this.listLayout()}>
                                 <i className="material-icons">list</i>
                              </Button>
                           </div>
                        </div>
                        {/* <div className="mb-10">
                           <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={6} lg={4}>
                                 <form className="product-values">
                                    <FormControl className="iron-select-width2">
                                       <InputLabel htmlFor="age-simple">type</InputLabel>
                                       <Select
                                          value={this.state.variations.type}
                                          onChange={(e) => this.changeProductVariation('type', e)}
                                          inputProps={{
                                             name: 'age',
                                             id: 'age-simple',
                                          }}
                                       >
                                          <MenuItem value={'app'}>App</MenuItem>
                                          <MenuItem value={'stream'}>Stream</MenuItem>
                                       </Select>
                                    </FormControl>
                                    <FormControl className="iron-select-width2">
                                       <InputLabel htmlFor="age-simple">Recent</InputLabel>
                                       <Select
                                          value={this.state.variations.time_interval}
                                          onChange={(e) => this.changeProductVariation('time_interval', e)}
                                          inputProps={{
                                             name: 'age',
                                             id: 'age-simple',
                                          }}
                                       >
                                          <MenuItem value={'this week'}>This week</MenuItem>
                                          <MenuItem value={'this month'}>This month</MenuItem>
                                          <MenuItem value={'past month'}>Past month</MenuItem>
                                          <MenuItem value={'this year'}>This year</MenuItem>
                                       </Select>
                                    </FormControl>
                                 </form>
                              </Grid>
                           </Grid>
                        </div> */}
                        <div>
                           {this.state.gridlayout === true ?
                              <Fragment>
                                 <div className="product-grid-wrap">
                                    <Grid container spacing={32}>
                                       {products.map((dataitem, index) => {
                                          return (
                                             <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                                <ProductsGrid data={dataitem} deleteProduct={() => this.onDeleteProductItem(dataitem)} />
                                             </Grid>
                                          )
                                       })}
                                    </Grid>
                                 </div >
                              </Fragment>
                              :
                              <Fragment>
                                 <div className="product-list-wrap iron-shadow p-20 bg-base rounded" >
                                    <ReactTable
                                       data={products}
                                       columns={columns}
                                       defaultPageSize={8}
                                    />
                                 </div >
                              </Fragment>
                           }
                        </div>
                     </div>
                  </div>
                  <ConfirmProduct
                     ref={this.confirmationDialog}
                     onConfirm={(res) => this.deleteDataItem(res)}
                  />
               </div>
               :
               <ContentLoader />
            }
         </Fragment>
      );
   }
}