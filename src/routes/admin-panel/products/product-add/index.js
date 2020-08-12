/**
 * product add page
*/
/* eslint-disable */
import React, { Fragment } from 'react';
import { Grid, Button } from '@material-ui/core';
import { generalActions } from "@actions/action";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import publicServices from '@services/publicServices';
import ImageUploader from 'react-images-upload';

//components
import SocialIcons from '../../../../components/widgets/SocialIcons';

const data = {
   Preview_Image: "https://via.placeholder.com/625x800",
   image_gallery: [
      "https://via.placeholder.com/625x800",
      "https://via.placeholder.com/625x800",
      "https://via.placeholder.com/625x800",
      "https://via.placeholder.com/625x800",
      "https://via.placeholder.com/625x800"
   ]
}
class ProductAdd extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         pictures: [],
         age: '',
         listTypes: [],
         listRegions: [],
         
         
         
         title: 'Product Name',
         description: '',
         price: 0.0,
         productCategories: [],
         productRegions: [],
         productPlans: [],
         listFiles: [],
         imgData: null,

      };
      this.onDrop = this.onDrop.bind(this);
   }

   componentDidMount(){
      this.props.getPlans();
      this.props.getCategories();
      publicServices.getListTypes().then((res) => {
         this.setState({listTypes: res.data});
      });
      publicServices.getListRegions().then((res) => {
         this.setState({listRegions: res.data});
      });
   }

   //function for upload image
   onDrop(picture) {
      this.setState({
         pictures: this.state.pictures.concat(picture),
      });
   }

   //function for change variation type
   handleChange = name => event => {
      this.setState({
         [name]: event.target.value,
      });
   };

   handleChangeFile = (e, index) => {
      const file  = e.target.files[0];
      const listFiles = [...this.state.listFiles];
      listFiles[index].attachment = file;
      this.setState({
         listFiles: listFiles,
      });
   }

   createProduct = () => {
      const { title, description, price, productCategories, productRegions, productPlans, listFiles, imgData } = this.state;

      let ownerId = 1;
      const userInfo = localStorage.getItem('user');
      if(userInfo) {
         const user = JSON.parse(userInfo);
         ownerId = user.provider.id;
      }
      var formData = new FormData();
      formData.append('Title', title);
      formData.append('Description', description);
      formData.append('OwnerId', ownerId);
      formData.append('Price', price);
      for(let i=0; i<productCategories.length; i++) {
         formData.append('Categorys[]', productCategories[i]);
      }
      for(let i=0; i<productRegions.length; i++) {
         formData.append('Regions[]', productRegions[i]);
      }
      for(let i=0; i<productPlans.length; i++) {
         formData.append('Subscriptions[]', productPlans[i]);
      }
      for(let i=0; i<listFiles.length; i++) {
         formData.append('attachment[]', listFiles[i].attachment);
         formData.append('Types[]', listFiles[i].type);
      }
      publicServices.uploadFileTest(formData).then((res)=>{
         if (imgData) {
            var formDataImg = new FormData();
            formDataImg.append('images', imgData);
            formDataImg.append('contentid', res.data.id);
            publicServices.uploadImgProduct(formDataImg).then((resImg) => {
               console.log(resImg);
               alert('Se ha enviado su solicitud');
            })
         }
      });
   }

   handleChangeTypes = (e, index) => {

      const valueType  = e.target.value;
      const listFiles = [...this.state.listFiles];
      listFiles[index].type = valueType;
      this.setState({
         listFiles: listFiles,
      });
   }

   handleAddAttachment = () => {
      const newCat = [...this.state.listFiles].concat({
         attachment: null,
         type: '',
      });
      this.setState({
         listFiles: newCat,
      });
   }
   
   handleChangeCategories = (e) => {
      const value = e.target.value;
      if (!this.state.productCategories.includes(value)){
         const newCats = [ ...this.state.productCategories].concat(value);
         this.setState({productCategories: newCats});
      }
   }

   handleChangeRegions = (e) => {
      const value = e.target.value;
      if (!this.state.productRegions.includes(value)){
         const newRegs = [ ...this.state.productRegions].concat(value);
         this.setState({productRegions: newRegs});
      }
   }

   handleChangePlans = (e) => {
      const value = e.target.value;
      if (!this.state.productPlans.includes(value)){
         const newPlans = [ ...this.state.productPlans].concat(value);
         this.setState({productPlans: newPlans});
      }
   }

   handleChangeText = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({[name]: value});

   }

   handleChangeImg = (file) => {
      if (file.length) {
         console.log(file[0]);
         this.setState({
            imgData: file[0],
         });
      }
   }

   render() {
      const { categories, plans } = this.props;
      const { productCategories, listFiles, listTypes, listRegions, productRegions, productPlans, title, description, price } = this.state;
      return (
         <div className="iron-product-add-wrap pt-50 px-sm-50 px-md-0">
            <Grid container spacing={32} className="my-0">
               <Grid item xs={12} sm={12} md={10} lg={9} className="py-0 mx-auto">
                  <Grid container spacing={32} className="my-0">
                     <Grid item xs={12} sm={12} md={6} lg={6} className="py-0 mb-md-0 mb-30">
                        <Grid container spacing={24} className="iron-product-gallery my-0">
                           <Grid item xs={9} sm={10} md={10} lg={10} className="py-0">
                              <div className="preview-full-image">
                                 <div className="iron-shadow product-gallery-item ">
                                    <div>
                                    <div className="image-upload">
                                             <a href="javascript:void(0)">
                                                <img
                                                   src={data.Preview_Image}
                                                   alt="product-item"
                                                   height="50"
                                                />
                                             </a>
                                             <div className="image-content d-flex justify-content-center align-items-center">
                                                <ImageUploader
                                                   withPreview
                                                   withIcon={false}
                                                   buttonClassName="primary-color bg-base border-circle add-Button"
                                                   buttonText=""
                                                   onChange={this.handleChangeImg}
                                                   imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                   maxFileSize={5242880}
                                                />
                                             </div>
                                          </div>
                                    </div>
                                 </div>
                              </div>
                           </Grid>
                        </Grid>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6} className="py-0">
                        <div className="detail-content">
                           <Link to="/admin-panel/admin/products" className="text-14 d-inline-block font-medium py-10 mb-10">Back to products</Link>
                           <form className="product-values">
                              <div className="d-flex justify-content-start align-items-start mb-10">
                                 <i className="zmdi zmdi-plus mr-10 primary-color pt-10 text-h4 "></i>
                                 <Input
                                    value={title}
                                    name="title"
                                    onChange={this.handleChangeText}
                                    className="text-capitalize add-product-input text-h3"
                                    inputProps={{
                                       'aria-label': 'Description',
                                    }}
                                 />
                              </div>
                              <div style={{flexDirection: 'column'}} className="d-flex justify-content-start align-items-start mb-10">
                                 <h6 className="text-14 mb-0 add-text">Price (Dollars):</h6>
                                 <div style={{marginLeft: '30px'}}><Input
                                    value={price}
                                    name="price"
                                    onChange={this.handleChangeText}
                                    type="number"
                                    className="text-capitalize add-product-input text-h4 active-input"
                                    inputProps={{
                                       'aria-label': 'Description',
                                    }}
                                 /></div>
                              </div>
                              <div className="mb-10">
                                 <h6 className="text-14 mb-0 add-text">categories :</h6>
                                 <div style={{marginLeft: '30px', width:'250px'}}>
                                    <Select
                                       value={''}
                                       onChange={this.handleChangeCategories}
                                       className="iron-form-input-wrap"
                                       input={<Input name="categories" id="select-categories" />}
                                    >
                                       {
                                          categories.map(elem=> (
                                             <MenuItem key={elem.id} value={elem.id}>{elem.code}</MenuItem>
                                          ))
                                       }
                                    </Select>
                                 </div>
                                 { productCategories.map((catId, index) => {
                                    return (
                                       <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${categories.filter(e => e.id === catId)[0].code}`}</p>
                                    );

                                 })}
                              </div>
                              <div className="mb-10">
                                 <h6 className="text-14 mb-0 add-text">Region availability :</h6>
                                 <div style={{marginLeft: '30px', width:'250px'}}>
                                    <Select
                                       value={''}
                                       onChange={this.handleChangeRegions}
                                       className="iron-form-input-wrap"
                                       input={<Input name="regions" id="select-categories" />}
                                    >
                                       {
                                          listRegions.map(elem=> (
                                             <MenuItem key={elem.id} value={elem.id}>{elem.code}</MenuItem>
                                          ))
                                       }
                                    </Select>
                                 </div>
                                 { productRegions.map((catId, index) => {
                                    return (
                                       <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${listRegions.filter(e => e.id === catId)[0].code}`}</p>
                                    );
                                 })}
                              </div>
                              <div className="mb-10">
                                 <h6 className="text-14 mb-0 add-text">Plans :</h6>
                                 <div style={{marginLeft: '30px', width:'250px'}}>
                                    <Select
                                       value={''}
                                       onChange={this.handleChangePlans}
                                       className="iron-form-input-wrap"
                                       input={<Input name="plans" id="select-plans" />}
                                    >
                                       {
                                          plans.map(elem=> (
                                             <MenuItem key={elem.pId} value={elem.pId}>{`${elem.name}-${elem.description}`}</MenuItem>
                                          ))
                                       }
                                    </Select>
                                 </div>
                                 { productPlans.map((catId, index) => {
                                    return (
                                       <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${plans.filter(e => e.pId === catId)[0].name}-${plans.filter(e => e.pId === catId)[0].description}`}</p>
                                    );
                                 })}
                              </div>
                              <div className="mb-10">
                                 <h6 className="text-14 mb-0 add-text">add description :</h6>
                                 <TextField
                                    value={description}
                                    name="description"
                                    onChange={this.handleChangeText}
                                    id="filled-multiline-static"
                                    multiline
                                    rows="2"
                                    className="text-capitalize add-product-input pl-30"
                                 />
                              </div>
                              <div className="mb-10">
                                 <h6 className="text-14 mb-0 add-text">Upload files :</h6>
                                 <button type="button" onClick={this.handleAddAttachment}>Add an attachment</button>
                              </div>
                              <div className="mb-10">
                              <table style={{width: '320px'}}>
                                 <thead style={{backgroundColor: 'rgb(255, 87, 34)', color: 'white'}}>
                                    <tr style={{height: '35px', textAlign: 'center', border: '1px solid black'}}>
                                       <th>Filename</th>
                                       <th>Content Type</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {
                                       (listFiles || []).map((fileInfo, index) => {
                                          let idx = index;
                                          return (
                                             <tr key={index} style={{height:'35px', border: '1px solid black'}}>
                                                <td style={{border:'1px solid black'}}>
                                                   <Fragment>
                                                      <label htmlFor="fileUploader" style={{
                                                         border: '1px solid black',
                                                         padding: '1px 5px',
                                                         marginLeft: '30px',
                                                         cursor: 'pointer',
                                                         backgroundColor: '#fff',
                                                      }}>{fileInfo.attachment ? fileInfo.attachment.name : 'Choose a file' }</label>
                                                      <input id="fileUploader" type="file" name="file" style={{display: 'none'}} onChange={ (e) => this.handleChangeFile(e, idx)}/>
                                                   </Fragment>
                                                </td>
                                                <td>
                                                   <Select
                                                      value={fileInfo.type}
                                                      onChange={(e) => this.handleChangeTypes(e, index)}
                                                      className="iron-form-input-wrap"
                                                      input={<Input name="categories" id="select-categories" />}
                                                   >
                                                      {
                                                         (listTypes || []).map(elem=> (
                                                            <MenuItem key={elem.id} value={elem.id}>{elem.type}</MenuItem>
                                                         ))
                                                      }
                                                   </Select>
                                                </td>
                                             </tr>
                                          )
                                       })
                                    }
                                 </tbody>
                              </table>
                              </div>
                           </form>
                           <div className="mb-sm-50 mb-20 detail-btns">
                              <Button
                                 className="button btn-active btn-lg mr-15 mb-20 mb-sm-0"
                                 onClick={this.createProduct}
                              >
                                 create
                              </Button>
                              <Button
                                 className="button btn-base btn-lg mb-20 mb-sm-0"
                              >
                                 discard
                              </Button>
                           </div>
                        </div>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </div >
      )
   }
}

const mapStateToProps = (store) => {
   return {
      categories: store.data.categoriesData,
      plans: store.data.plansData,
   };
}

const mapDispatchToProps = (dispatch) => {
   return {
      getCategories: () => dispatch(generalActions.getCategories()),
      getPlans: () => (
         dispatch(generalActions.getPlans())
       ),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);