/**
 * product review component
 */
/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid, Divider, TextField } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import { generalActions } from "@actions/action";
import { connect } from 'react-redux';
import { compose } from 'recompose';

//components
import RatingStar from '../../widgets/RatingStar';

// actions
import { showAlert } from "@actions/action";
import publicServices from '../../../services/publicServices';

class ProductReview extends React.Component {
   
   constructor(props) {
      super(props);
      this.state = {
         open: false,
         canReview: false,
         reviewOpen: false,
         rating: 0,
         ratingDescription: ""
      };
   }

   //Define function for open review dialog box
   open = () => {
      this.setState({ open: true });
   };

   //Define function for close review dialog box
   close = () => {
      this.setState({ open: false });
   };

   static getDerivedStateFromProps(props, state) {
      if(props.contentData) {
         if(props.contentData.FlagDownload != state.canReview){
            return {
               canReview: props.contentData.FlagDownload,
            };
         }
      }
      // Return null to indicate no change to state.
      return null;
   }

   //Rating
   onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
   }

   onShowReviewForm(){
      this.setState({reviewOpen: true})
   }

   handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
         const user = JSON.parse(userInfo);
         const contentId = this.props.contentData.info.id;
         const calification = this.state.rating;
         if(calification == 0){
            alert('You must enter a rating');
            return;
         }
         const description = this.state.ratingDescription;
         const contentReview = { userid: user.client.id, contentid: contentId, calification: calification, description : description };
         console.log(contentReview);
         publicServices.rateContent(contentReview).then(() => {alert('Rating Added')}).catch(() => {alert('Rating failed');});
         // this.props.rateContent(contentReview,
         //    () => {alert('Rating Added');},
         //    () => {alert('Rating failed');}
         // );
         this.close();
         this.setState({canReview: false,
            reviewOpen: false,
            rating: 0,
            ratingDescription: ""})
      }
   }

   renderReviewFields() {
      const { rating, reviewOpen } = this.state;
      return (
         <div className="pb-md-0 pb-30">   
            { !reviewOpen?
               <div className="pb-md-0 pb-30">
                  <h4 className="mb-0">Client review</h4>
                  <Button type="button" className="button btn-active btn-sm mt-10" onClick={()=>this.onShowReviewForm()}>Write review</Button>
               </div>                 
               :        
               <div className="pb-md-0 pb-30">
                  <h4 className="mb-0">rate and review</h4>  
                  <form onSubmit={this.handleSubmit}>
                     <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                           <TextField
                              // required
                              id="standard-multiline-flexible"
                              label="write review"
                              multiline
                              rowsMax="4"
                              name="ratingDescription"
                              value={this.state.ratingDescription}
                              className="iron-form-input-wrap"
                              onChange={this.handleChange}
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                           <span>Rating: </span>
                           <StarRatingComponent 
                              name="rate1" 
                              starCount={5}
                              value={rating}
                              onStarClick={this.onStarClick.bind(this)}
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                           <Button type="submit" className="button btn-active btn-lg mt-10">post review</Button>
                        </Grid>
                     </Grid>
                  </form>
               </div>       
            }
         </div>
      );
   }

   render() {
      const { contentData } = this.props;
      const { canReview } = this.state;
      return (
         <Dialog
            fullWidth={true}
            maxWidth = {'md'}
            open={this.state.open}
            onClose={this.close}
            aria-labelledby="responsive-dialog-title"
            className="iron-review-dialog">
            {contentData ? 
               <DialogContent>
                  <Grid container spacing={0}>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                           <h4 className="primary-color mb-10">{contentData.info.title}</h4>
                           <p className="mb-30">{contentData.info.description}</p>
                           <RatingStar ratingAvg={contentData.info.avgRating}/>
                           <h5>{contentData.calification.length} Reviews</h5>
                     </Grid>
                     {/* <Grid item xs={12} sm={12} md={5} lg={6} className="text-right">
                        <Button onClick={this.close} className="button btn-active btn-lg">
                           add later
                           </Button>
                     </Grid> */}
                  </Grid>
                  <Divider className="my-20" />
                  <Grid container spacing={32} className="my-0 mt-40">
                     <Grid item xs={12} sm={12} md={7} lg={6} className="py-0">
                        <ul className="iron-user-list-wrap">
                           {contentData.calification.map((rating, index) => {
                              return (
                                 <li key={index} className="user-list-item d-block">
                                    {rating.description.length > 0 ? 
                                       <Grid container spacing={0}>
                                          <Grid item xs={12} sm={12} md={2} lg={2} >
                                             <img src={require("../../../assets/images/user-1.jpg")} width="90" alt="Review user" />
                                          </Grid>
                                          <Grid item xs={12} sm={12} md={10} lg={10} className="pl-md-30">
                                             <div>
                                                {/* <h6 className="mb-10">{rating.UserId}</h6> */}
                                                {/* <div className="star"></div><span>a Month Ago</span> */}
                                                <p className="mb-0">{rating.description}</p>
                                             </div>
                                          </Grid>
                                       </Grid>
                                       :
                                       <span></span>
                                    }
                                 </li>
                              )
                           })}
                        </ul>
                     </Grid>
                     <Grid item xs={12} sm={12} md={5} lg={6} className="py-0">
                           { canReview == true ?
                              this.renderReviewFields()
                           :
                              <span></span>
                           }
                     </Grid>
                  </Grid>
               </DialogContent>
               :
               <DialogContent>
                  <span></span>
               </DialogContent>
            }
         </Dialog>
      );
   }
}

// function mapStateToProps(store) {
//    return {
//      contentReview: store.data.contentReview,
//    };
//  }

// function mapDispatchToProps(dispatch) {
//    return {
//      rateContent: (data, success, failure) => (
//        dispatch(generalActions.rateContent(data, success, failure))
//      ),
//    };
// }

// export default connect(mapStateToProps, mapDispatchToProps ,null ,{ withRef: true } ) (ProductReview);

export default ProductReview;