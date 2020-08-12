/**
 * Sign up Page Page
 */
import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { injectStripe } from 'react-stripe-elements';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { generalActions } from "@actions/action";
import { Link } from 'react-router-dom';
import paymentServices from '@services/paymentServices';
import publicServices from '@services/publicServices';
import { CardElement } from 'react-stripe-elements';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import qs from 'query-string-object';

class SignUp extends Component {

   state = {
      accountType: 'client',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      plan: '',
      companyName: '',
      accountNumber: '',
      country: '',
   }

   componentDidMount() {
      console.log('>>>',qs.stringify({
         currency: 'usd',
      }));
      this.props.getPlans();
      this.props.getCountries();
   }

   /* handleSubmit = (e) => {
      e.preventDefault();
      this.props.stripe.createToken().then(({token}) => {
         paymentServices.payment(
            qs.stringify({
               source: token.id,
               amount: 2000,
               currency: 'usd',
            }) //?state=0``
         ).then((resp)=>{
            console.log('funciona', resp.data);
         })
      });
   } */

   handleChangeText = (e) => {
      const field = e.target.name;
      const newValue = e.target.value;
      this.setState({ [field]: newValue });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const { firstName, lastName, email, plan, password, country, accountType, companyName, accountNumber } = this.state;
      const { plans } = this.props;

      if (accountType === 'client') {
         const [planSelected] = plans.filter( e => e.id === plan);
         let isFree = true;
         if (planSelected) {
            isFree = planSelected.price === 0;
         }
         
         if (isFree) {
            publicServices.createClient({
               planId: plan,
               name:firstName,
               lastName: lastName,
               password:password,
               email: email,
               countryId: country,
            }).then((res) => {
               alert('Se ha creado un usuario');
               window.location.href = `${window.location.origin}/sign-in`;
            });
         } else {
            this.props.stripe.createToken().then(({token}) => {
               paymentServices.createCostumer(
                  qs.stringify({
                     source: token.id || 'tok_br',
                     name: `${firstName} ${lastName}`,
                     email: email,
                  })
               ).then((resp) => {
                  console.log('costumer', resp);
                  publicServices.createClient({
                     costumerId: resp.data.id,
                     planId: plan,
                     name:firstName,
                     lastName: lastName,
                     password:password,
                     email: email,
                     countryId: country,
                  }).then((res) => {
                     alert('Se ha creado un usuario cliente');
                     window.location.href = `${window.location.origin}/sign-in`;
                  });
               });
            });
         }
      } else {
         publicServices.createProvider({
            name:firstName,
            lastName: lastName,
            password:password,
            email: email,
            countryId: country,
            companyName: companyName,
            account_number: accountNumber,
         }).then((res) => {
            alert('Se ha creado un usuario proveedor');
            window.location.href = `${window.location.origin}/sign-in`;
         });
      }
   }

   render() {
      const { firstName, lastName, email, password, accountType, plan, country, companyName, accountNumber } = this.state;
      const { plans, countries } = this.props;
      const isClient = accountType === 'client';
      const [planSelected] = plans.filter( e => e.id === plan);
      let isFree = true;
      if (planSelected) {
         isFree = planSelected.price === 0;
      }
      return (
         <div className="iron-sign-up-page-wrap">
            <div className="inner-container section-pad bg-base">
               <div className="container">
                  <Grid container spacing={0}>
                     <Grid item xs={12} sm={12} md={10} lg={9} className="mx-auto">
                        <Grid container spacing={0} className="d-flex justify-content-center align-items-center">
                           <Grid item xs={12} sm={12} md={6} lg={6}>
                              <div className="register-image">
                              </div>
                           </Grid>
                           <Grid item xs={12} sm={12} md={6} lg={6}>
                              <div className="iron-sign-up-form form-margin iron-shadow bg-base p-sm-25 py-20 px-15 rounded">
                                 <h4>Enter your details</h4>
                                 <InputLabel htmlFor="select-type">Type of account</InputLabel>
                                 <Select
                                    value={accountType}
                                    onChange={this.handleChangeText}
                                    className="iron-form-input-wrap"
                                    input={<Input name="accountType" id="select-type" />}
                                 >
                                    <MenuItem value="client">Client</MenuItem>
                                    <MenuItem value="provider">Provider</MenuItem>
                                 </Select>
                                 <form onSubmit={this.handleSubmit}>
                                    <TextField
                                       required
                                       id="first-name"
                                       name="firstName"
                                       label="first Name"
                                       className="iron-form-input-wrap"
                                       type="name"
                                       value={firstName}
                                       autoComplete="current-name"
                                       onChange={this.handleChangeText}
                                    />
                                    <TextField
                                       required
                                       id="last-name"
                                       label="last Name"
                                       name="lastName"
                                       value={lastName}
                                       className="iron-form-input-wrap"
                                       type="name"
                                       autoComplete="current-name"
                                       onChange={this.handleChangeText}
                                    />
                                    <InputLabel htmlFor="select-type">Country</InputLabel>
                                    <Select
                                       required
                                       value={country}
                                       onChange={this.handleChangeText}
                                       className="iron-form-input-wrap"
                                       input={<Input name="country" id="select-country" />}
                                    >
                                       {
                                          countries.map(elem=> (
                                             <MenuItem key={elem.id} value={elem.id}>{`${elem.name} - ${elem.code}`}</MenuItem>
                                          ))
                                       }
                                    </Select>
                                    <TextField
                                       required
                                       id="standard-email"
                                       name="email"
                                       value={email}
                                       label="email"
                                       className="iron-form-input-wrap"
                                       type="email"
                                       autoComplete="current-email"
                                       onChange={this.handleChangeText}
                                    />
                                    {
                                       isClient ? (
                                          <Fragment>
                                             <InputLabel htmlFor="select-type">Choose your plan</InputLabel>
                                             <Select
                                                value={plan}
                                                onChange={this.handleChangeText}
                                                className="iron-form-input-wrap"
                                                input={<Input name="plan" id="select-plan" />}
                                             >
                                                {
                                                   plans.map(item=> (
                                                      <MenuItem key={item.id} value={item.id}>{`${item.name} - ${item.description} - $${item.price}`}</MenuItem>
                                                   ))
                                                }
                                             </Select>
                                             
                                          {
                                             isFree ? 
                                                <Fragment/>
                                             : (
                                                <Fragment>
                                                   <InputLabel htmlFor="select-type">Card credentials</InputLabel>
                                                   <CardElement style={{height: '32px'}}/>
                                                </Fragment>
                                             )
                                          }
                                          </Fragment>
                                       ) : (
                                          <Fragment>
                                             <TextField
                                                required
                                                id="standard-compant-input"
                                                label="Company name"
                                                value={companyName}
                                                name="companyName"
                                                className="iron-form-input-wrap"
                                                type="name"
                                                onChange={this.handleChangeText}
                                             />
                                             <TextField
                                                required
                                                id="standard-account-input"
                                                label="Account Number"
                                                value={accountNumber}
                                                name="accountNumber"
                                                className="iron-form-input-wrap"
                                                type="number"
                                                onChange={this.handleChangeText}
                                             />
                                          </Fragment>
                                       )
                                    }
                                    <TextField
                                       required
                                       id="standard-password-input"
                                       label="Password"
                                       value={password}
                                       name="password"
                                       className="iron-form-input-wrap"
                                       type="password"
                                       onChange={this.handleChangeText}
                                    />
                                    <Button type="submit" variant="contained" className="button btn-active btn-lg mb-10">
                                       sign up
                                    </Button>
                                 </form>
                                 <span className="text-14 text-capitalize pt-10 d-inline-block">already have an account ? then <Link to="/sign-in">sign in</Link></span>
                              </div>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Grid>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(store) {
   return {
     plans: store.data.plansData,
     countries: store.data.countriesData,
   };
 }

function mapDispatchToProps(dispatch) {
   return {
     getPlans: () => (
       dispatch(generalActions.getPlans())
     ),
     getCountries: () => (
      dispatch(generalActions.getCountries())
    ),
   };
}

const enhance = compose(
   injectStripe,
   connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(SignUp);
