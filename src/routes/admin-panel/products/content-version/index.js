import React, { Fragment } from 'react';
import { Grid, Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import ImageUploader from 'react-images-upload';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import qs from 'query-string-object'

//components
// import SocialIcons from '../../../../components/widgets/SocialIcons';

//connect to store
import { connect } from 'react-redux';

import ContentLoader from '../../../../components/global/loaders/ContentLoader';
import publicServices from '../../../../services/publicServices';

class ContentVersion extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         pictures: [],
         age: 5,
         allProducts: [],
         productId: parseInt(this.props.match.params.id, 10),
         productType: this.props.match.params,
         currentDataItem: null,

         contentId: '',
         title: '',
         description: '',
         price: 0.0,

         contentCategories: [],
         contentRegions: [],
         contentPlans: [],
         contentFiles: [],

         listCategories: [],
         listRegions: [],
         listPlans: [],
         listTypes: [],
         listFiles: [],
      };
   }

   componentDidMount() {
      this.getContentItem();
      publicServices.getCategories().then((res)=>{
         if(res.status === 200) {
            this.setState({listCategories: res.data});
         }
      });
      publicServices.getListRegions().then((res) => {
         if(res.status === 200) {
            this.setState({listRegions: res.data});
         }
      });
      publicServices.getPlans().then((res) => {
         if(res.status === 200) {
            this.setState({listPlans: res.data});
         }
      });
      publicServices.getListTypes().then((res)=>{
         if(res.status === 200) {
            this.setState({listTypes: res.data});
         }
      });
   }

   loadData(){
      this.setState({contentId: this.state.currentDataItem.info.id});
      this.setState({title: this.state.currentDataItem.info.title});
      this.setState({price: this.state.currentDataItem.info.price});
      this.setState({description: this.state.currentDataItem.info.description});
      //load categories
      const item = this.state.currentDataItem.info;
      const loadCatsIds = item.categories.map(a => a.id);
      this.setState({contentCategories:loadCatsIds});
      //load regions
      const loadRegionsIds = item.regions.map(a => a.id);
      this.setState({contentRegions:loadRegionsIds});
      //load plans
      const loadPlansIds = this.state.currentDataItem.suscripciones.map( a => a.subscriptionPlanPId );
      this.setState({contentPlans:loadPlansIds})
      //load files

   }
   
   getContentItem(){
      let urlparams;
      urlparams = qs.stringify({
         contentid: this.state.productId
      });
      publicServices.getContentItem(urlparams).then((res)=>{
         if(res.status == 200) {
            this.setState({currentDataItem:res.data},()=>{this.loadData()});
         }
      });
   }

   updateContent(){
      const { contentId, title, description, price, contentCategories, contentRegions, contentPlans, contentFiles } = this.state;

      console.log(title);
      var formData = new FormData();
      formData.append('id',contentId)
      formData.append('Title', title);
      formData.append('Description', description);
      formData.append('Price', price);
      for(let i=0; i<contentCategories.length; i++) {
         formData.append('Categorys[]', contentCategories[i]);
      }
      for(let i=0; i<contentRegions.length; i++) {
         formData.append('Regions[]', contentRegions[i]);
      }
      for(let i=0; i<contentPlans.length; i++) {
         formData.append('Subscriptions[]', contentPlans[i]);
      }
      for(let i=0; i<contentFiles.length; i++) {
         formData.append('attachment[]', contentFiles[i].attachment);
         formData.append('Types[]', contentFiles[i].type);
      }
      for (var pair of formData.entries()) {
         console.log(pair[0]+ ', ' + pair[1]); 
     }
      publicServices.updateContentVersion(formData).then((res)=>{
         console.log('resss', res);
      });
   }

   handleChangeCategories = (e) => {
      const value = e.target.value;
      if (!this.state.contentCategories.includes(value)){
         const newCats = [ ...this.state.contentCategories].concat(value);
         this.setState({contentCategories: newCats});
      }
   }

   handleChangeRegions = (e) => {
      const value = e.target.value;
      if (!this.state.contentRegions.includes(value)){
         const newRegs = [ ...this.state.contentRegions].concat(value);
         this.setState({contentRegions: newRegs});
      }
   }

   handleChangePlans = (e) => {
      const value = e.target.value;
      if (!this.state.contentPlans.includes(value)){
         const newPlans = [ ...this.state.contentPlans].concat(value);
         this.setState({contentPlans: newPlans});
      }
   }

   handleChangeFile = (e, index) => {
      const file  = e.target.files[0];
      const listFiles = [...this.state.listFiles];
      listFiles[index].attachment = file;
      this.setState({
         listFiles: listFiles,
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

   onDrop(picture) {
      this.setState({
         pictures: this.state.pictures.concat(picture),
      });
   }

   handleChange = name => event => {
      this.setState({
         [name]: event.target.value,
      });
   };


   handleChangeText = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
   }

   render() {
      const { currentDataItem, contentId, title, price, description, contentCategories, contentRegions, contentPlans, listCategories, listRegions, listPlans, listFiles, listTypes} = this.state;
      console.log(currentDataItem);
      return (
         <Fragment>
            {currentDataItem !== null  ?
               <div className="iron-product-add-wrap iron-product-edit-wrap pt-50 px-sm-50 px-md-0">
                  <Grid container spacing={32} className="my-0">
                     <Grid item xs={12} sm={12} md={10} lg={9} className="py-0 mx-auto">
                        <Grid container spacing={32} className="my-0">
                           <Grid item xs={12} sm={12} md={6} lg={6} className="py-0 mb-md-0 mb-30">
                              <Grid container spacing={24} className="iron-product-gallery my-0">
                                 {/* <Grid item xs={3} sm={2} md={2} lg={2} className="py-0">
                                    <div className="product-gallery-nav">
                                       {currentDataItem.image_gallery && currentDataItem.image_gallery.map((gallery, index) => {
                                          return (
                                             <div className="product-gallery-item">
                                                <div className="image-upload">
                                                   <a href="javascript:void(0)">
                                                      <img
                                                         // src={require(`../../../../assets/images/${gallery}`)}
                                                         src={require(`../../../../assets/images/post-1.jpg`)}
                                                         alt="product-item"
                                                         height="50"
                                                      />
                                                   </a>
                                                   <div className="image-content d-flex justify-content-center align-items-center">
                                                      <ImageUploader
                                                         withPreview
                                                         withIcon={false}
                                                         buttonClassName="primary-color bg-base border-circle"
                                                         buttonText=""
                                                         onChange={() => this.onDrop()}
                                                         imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                         maxFileSize={5242880}
                                                      />
                                                   </div>
                                                </div>
                                             </div>
                                           )
                                       })}}
                                    </div>
                                 </Grid> */}
                                 <Grid item xs={9} sm={10} md={10} lg={10} className="py-0">
                                    <div className="preview-full-image">
                                       <div className="iron-shadow product-gallery-item ">
                                          <div>
                                             <a href="javascript:void(0)">
                                                {currentDataItem.imagesurls && currentDataItem.imagesurls.length > 0 ?
                                                      <img
                                                         src={currentDataItem.imagesurls[0].ImageUrl}
                                                         alt="poster"
                                                      />
                                                   :
                                                      <img
                                                         src={require(`../../../../assets/images/post-1.jpg`)}
                                                         alt="poster"
                                                      />
                                                 }
                                             </a>
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
                                       <i className="zmdi zmdi-edit mr-5 primary-color pt-10 text-h4 "></i>
                                       <Input
                                          value = {title}
                                          name="title"
                                          onChange={this.handleChangeText}
                                          className="text-capitalize add-product-input text-h3"

                                       />
                                    </div>
                                    <div className="d-flex justify-content-start align-items-start mb-10">
                                       <i className="zmdi zmdi-edit mr-5 primary-color pt-5 text-h5"></i>
                                       <Input
                                          value = {price}
                                          name="price"
                                          type="number"
                                          onChange={this.handleChangeText}
                                          className="text-capitalize add-product-input text-h4 active-input"
                                       />
                                    </div>
                                    <div className="mb-10">
                                       <h6 className="text-14 mb-0">product code : #</h6>
                                       <Input
                                          defaultValue={contentId}
                                          className="text-capitalize add-product-input pl-30"
                                          disabled
                                       />
                                    </div>
                                    <div className="mb-10">
                                       <h6 className="text-14 mb-0 edit-text">categories :</h6>
                                       <div style={{marginLeft: '30px', width:'250px'}}>
                                          <Select
                                             value={''}
                                             onChange={this.handleChangeCategories}
                                             className="iron-form-input-wrap"
                                             input={<Input name="categories" id="select-categoriesEdit" />}
                                          >
                                             {
                                                listCategories.map(elem=> (
                                                   <MenuItem key={elem.id} value={elem.id}>{elem.code}</MenuItem>
                                                ))
                                             }
                                          </Select>
                                       </div>
                                       { listCategories.length!= 0 && contentCategories.map((catId, index) => {
                                          return (
                                             <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${listCategories.filter(e => e.id === catId)[0].code}`}</p>
                                          );

                                       })}
                                    </div>
                                    <div className="mb-10">
                                       <h6 className="text-14 mb-0 edit-text">Region availability :</h6>
                                       <div style={{marginLeft: '30px', width:'250px'}}>
                                          <Select
                                             value={''}
                                             onChange={this.handleChangeRegions}
                                             className="iron-form-input-wrap"
                                             input={<Input name="regions" id="select-regionsEdit" />}
                                          >
                                             {
                                                listRegions.map(elem=> (
                                                   <MenuItem key={elem.id} value={elem.id}>{elem.code}</MenuItem>
                                                ))
                                             }
                                          </Select>
                                       </div>
                                       { listRegions.length!= 0 && contentRegions.map((regId, index) => {
                                          return (
                                             <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${listRegions.filter(e => e.id === regId)[0].code}`}</p>
                                          );
                                       })}
                                    </div>
                                    <div className="mb-10">
                                       <h6 className="text-14 mb-0 edit-text">Plans :</h6>
                                       <div style={{marginLeft: '30px', width:'250px'}}>
                                          <Select
                                             value={''}
                                             onChange={this.handleChangePlans}
                                             className="iron-form-input-wrap"
                                             input={<Input name="plans" id="select-plansEdit" />}
                                          >
                                             {
                                                listPlans.map(elem=> (
                                                   <MenuItem key={elem.pId} value={elem.pId}>{`${elem.name}-${elem.description}`}</MenuItem>
                                                ))
                                             }
                                          </Select>
                                       </div>
                                       { listPlans.length!= 0 && contentPlans.map((catId, index) => {
                                          return (
                                             <p style={{marginLeft: '30px', marginBottom: '5px'}} key={index}>{`-> ${listPlans.filter(e => e.pId === catId)[0].name}-${listPlans.filter(e => e.pId === catId)[0].description}`}</p>
                                          );
                                       })}
                                    </div>
                                    <div className="mb-10">
                                       <h6 className="text-14 mb-0 edit-text">description :</h6>
                                       <TextField
                                          value={description}
                                          name="description"
                                          fullWidth
                                          multiline
                                          rows="3"
                                          onChange={this.handleChangeText}
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
                                       onClick={()=>this.updateContent()}
                                    >
                                       save
                                    </Button>
                                 </div>
                              </div>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </div >
               :
               <ContentLoader />
            }
         </Fragment>
      )
   }
}

export default (ContentVersion);