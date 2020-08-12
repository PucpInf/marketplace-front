import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import publicServices from '@services/publicServices';
import Chip from '@material-ui/core/Chip';
import ReactTable from 'react-table';
//firebase
// import firebase from '../../../../firebase';
//component
import ContentLoader from '../../../../components/global/loaders/ContentLoader';
// import ConfirmationBox from './components/ConfirmationBox';
import AppRequestPopup from './components/AppRequestPopup';
import qs from 'query-string-object'

class AppRequests extends Component {

   constructor(props) {
      super(props);
      this.confirmationDialog = React.createRef();
   }

   state = {
      searchContentText: '',
      listRequests: null,
      allRequests: null
   };

   handleChange = name => event => {
      this.setState({ [name]: event.target.value });
   };

   componentDidMount() {
      this.getRequestsData();
   }

   //get app request list
   getRequestsData() {

      const user = localStorage.getItem('user');
      let urlparams;

      if (user) {
         const parsedUser = JSON.parse(user);
         urlparams = qs.stringify({
            ownerid: parsedUser.provider.id
         });
      }

      publicServices.getAppRequestProvider(urlparams).then((res)=>{
         res.data.forEach((obj)=>{
            obj.contentTitle = obj.ContentInfo.title;
            switch (obj.state) {
               case 0:
                  obj.color = 'badge-secondary';
                  obj.stateName = 'Pending';
                  break;
               case 1:
                  obj.color = 'badge-primary';
                  obj.stateName = 'Resolved';
                  break;
               default:
                  break;
            }
         });
         this.setState({listRequests: res.data});
         this.setState({allRequests: res.data});
      }).catch((err)=>{console.log(err)});

   }

   onSearchContent(searchText) {
      if (searchText === '') {
         this.setState({
            ...this.state,
            listRequests: this.state.allRequests,
            searchContentText: searchText,
         });
      } else {
         let searchContent = this.state.allRequests.filter((request) => {
            if (searchText === searchText.toLowerCase()) {
               let title = request.contentTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1
               return (
                  title
               )
            }
            else {
               let title = request.contentTitle.toUpperCase().indexOf(searchText.toUpperCase()) > -1
               return (
                  title
               )
            }
         });
         this.setState({
            ...this.state,
            searchContentText: searchText,
            listRequests: searchContent
         })
      }
   }

   render() {
      const { listRequests } = this.state;
      const columns = [
         {
            Header:'N.',
            accessor: 'id',
         },
         {
            Header:'content',
            accessor: 'contentTitle',
         },
         {
            Header:'user',
            accessor: 'clientid',
         },
         {
            Header:'created date',
            accessor: 'created',
            Cell: props => {
               return (
                  `${props.original.created.slice(0,10)}`
               )
            },
         },
         {
            Header:'status',
            accessor: 'stateName',
            Cell: props => {
               return (
                  <div>
                     <Chip label={props.original.stateName} className={props.original.color} />
                  </div>
               )
            },
         },
         {
            Header: 'action',
            accessor: 'action',
            Cell: props => {
               return (
                  <div>
                     {props.original.state === 0 ? <AppRequestPopup data={props.original}/> : <span></span>}
                  </div>
               )
            },
         }
      ];
      return (
         <Fragment>
            {listRequests !== null ?
               <div className="inner-container">
                  <div className="iron-invoice-list-wrap">
                     <div className="page-title mb-20">
                        <h4 className="mb-0">App request list:</h4>
                     </div>
                     <div className="iron-shadow rounded p-sm-20 p-15 mb-30 bg-base">
                        <Grid container spacing={24} className="search-box-wrap my-0">
                           <Grid item sm={12} md={12} lg={12} className="py-0 d-sm-flex d-block">
                              <div className="search-box d-block d-sm-flex align-items-center">
                                 <TextField
                                    id="standard-name"
                                    label="Search Contents"
                                    className="my-0 iron-form-input-wrap mr-5"
                                    fullWidth
                                    value={this.state.searchContentText}
                                    onChange={(e) => this.onSearchContent(e.target.value)}
                                 />
                              </div>
                           </Grid>
                        </Grid>
                     </div>
                     <div className="iron-shadow rounded p-20 bg-base">
                        <ReactTable
                           data={listRequests}
                           columns={columns}
                           minRows={10}
                           defaultPageSize={10}
                        />
                     </div>
                  </div>
                  {/* <ConfirmationBox
                     ref={this.confirmationDialog}
                     onConfirm={(res) => this.deleteCartItem(res)}
                  /> */}
               </div>
               :
               <ContentLoader />
            }
         </Fragment>
      )
   }
}

export default AppRequests;