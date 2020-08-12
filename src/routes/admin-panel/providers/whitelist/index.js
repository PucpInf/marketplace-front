import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import publicServices from '@services/publicServices';
import Chip from '@material-ui/core/Chip';
import ReactTable from 'react-table';

//component
import ContentLoader from '../../../../components/global/loaders/ContentLoader';
import WhitelistPopup from './components/WhitelistPopup';

class WhiteList extends Component {

    constructor(props) {
        super(props);
        this.confirmationDialog = React.createRef();
     }
  
     state = {
        searchContentText: '',
        listProviders: null,
        allProviders: null,
     };
  
     handleChange = name => event => {
        this.setState({ [name]: event.target.value });
     };
  
     componentDidMount() {
        this.getProviderList();
     }
  
     //get provider list
     getProviderList(){
        publicServices.getProviderList().then((res)=>{
            if(res.status === 200) {
                res.data.forEach((obj)=>{
                    switch (obj.whitelisted) {
                        case 0:
                            obj.color = 'badge-secondary';
                            obj.stateName = 'No';
                            break;
                        case 1:
                            obj.color = 'badge-primary';
                            obj.stateName = 'Yes';
                            break;
                        default:
                            break;
                    }
                });
                this.setState({allProviders: res.data});
                this.setState({listProviders: res.data});
            }
        }).catch((e)=>{console.log(e)});
     }
  
     onSearchProvider(searchText) {
        if (searchText === '') {
            this.setState({
                ...this.state,
                listProviders: this.state.allProviders,
                searchContentText: searchText,
            });
        } else {
            let searchContent = this.state.allProviders.filter((provider) => {
                if (searchText === searchText.toLowerCase()) {
                    let name = provider.companyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    return (
                        name
                    )
                }
                else {
                    let name = provider.companyName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                    return (
                        name
                    )
                }
            });
            this.setState({
                ...this.state,
                searchContentText: searchText,
                listProviders: searchContent
            })
        }
     }
  
     render() {
        const { listProviders } = this.state;
        const columns = [
            {
                Header:'N.',
                accessor: 'id',
            },
            {
                Header:'ProviderName',
                accessor: 'companyName',
            },
            {
                Header:'email',
                accessor: 'companyName',
            },
            {
                Header:'Whitelisted',
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
                    console.log(props);
                    return (
                    <div>
                        {props.original.whitelisted === 0 ? <WhitelistPopup data={props.original}/> : <span></span>}
                    </div>
                    )
                },
            }
        ];
        return (
            <Fragment>
                {listProviders !== null ?
                    <div className="inner-container">
                        <div className="iron-invoice-list-wrap">
                        <div className="page-title mb-20">
                            <h4 className="mb-0">Provider list:</h4>
                        </div>
                        <div className="iron-shadow rounded p-sm-20 p-15 mb-30 bg-base">
                            <Grid container spacing={24} className="search-box-wrap my-0">
                                <Grid item sm={12} md={12} lg={12} className="py-0 d-sm-flex d-block">
                                    <div className="search-box d-block d-sm-flex align-items-center">
                                    <TextField
                                        id="standard-name"
                                        label="Search Providers"
                                        className="my-0 iron-form-input-wrap mr-5"
                                        fullWidth
                                        value={this.state.searchContentText}
                                        onChange={(e) => this.onSearchProvider(e.target.value)}
                                    />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="iron-shadow rounded p-20 bg-base">
                            <ReactTable
                                data={listProviders}
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

export default WhiteList;