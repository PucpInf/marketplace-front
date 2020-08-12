/**
 * Sign in form
 */
import React from 'react';

// Material ui
import Button from '@material-ui/core/Button';
import { generalActions } from "@actions/action";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { router } from 'sw-toolbox';
import qs from 'query-string-object';
import publicServices from '@services/publicServices';
import FacebookLogin from 'react-facebook-login';


class SignIn extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        email: '',
        password: '',
        loggedStatus: false,
        userID : '',
        emailFB : '',
        name : '',
        nameFB:'',
        picture:'',
        isLoggedIn: false,
      }

    }



    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.login);
        this.props.login({
            email: this.state.email,
            password: this.state.password,
        }, () => {
            const auth = this.props.userLogged.auth;
            if (auth) {
                localStorage.setItem('user', JSON.stringify(this.props.userLogged));
                localStorage.setItem('mk-token', JSON.stringify(this.props.userLogged.token));
                
                window.location.href = `${window.location.origin}/`;
            } else {
                alert('Contrasena incorrecta!');
            }
        }, () => {
            alert('No existe una cuenta asociada al email');
        });
    }
   

    componentDidMount(){

    }    


     responseFacebook = response => {
      console.log(response);

      this.setState({
        isLoggedIn : true,
        userID: response.userID,
        nameFB : response.name,
        emailFB: response.email,
        //picture: response.picture.data.url
      });

      console.log(this.state.nameFB);

    }


    render() {

      const{isLoggedIn} = this.state;

      if(isLoggedIn){
        let urlparams;
        urlparams = qs.stringify({
          email: this.state.emailFB,
        });

        publicServices.verifyEmail(this.state.emailFB)
        .then((res)=> {
          const msg = res.data.message;
          if(msg === "Repeated email"){

            this.props.login({
              email: this.state.emailFB,
              password: this.state.userID,
            }, () => {
              const auth = this.props.userLogged.auth;
              if (auth) {
                  localStorage.setItem('user', JSON.stringify(this.props.userLogged));
                  localStorage.setItem('mk-token', JSON.stringify(this.props.userLogged.token));
                  
                  window.location.href = `${window.location.origin}/`;
              } else {
                  alert('Contrasena incorrecta!');
              }
            }, () => {
              alert('No existe una cuenta asociada al email');
            });

          }else if(msg === "new email"){

            return <Redirect to={{
              pathname : "/sign-up-fb",
              state: {email : this.state.emailFB,
                      name : this.state.nameFB,
                      password: this.state.userID  }
              }} />;            

          } 
        })
        .catch(err => {
          alert('No se ha podido verificar el email');
        });

      }

        return (
            <div>
                <h4>user sign in</h4>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            required
                            id="standard-email"
                            label="email"
                            name="email"
                            value={this.state.email}
                            className="iron-form-input-wrap"
                            type="email"
                            autoComplete="current-email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mb-15">
                        <TextField
                            required
                            id="standard-password-input"
                            label="Password"
                            name="password"
                            value={this.state.password}
                            className="iron-form-input-wrap"
                            type="password"
                            onChange={this.handleChange}
                        //autoComplete="current-password"
                        />
                    </div>
                    {/* <div className="d-sm-flex justify-content-between align-items-center mb-sm-10 mb-20">
                        <FormGroup >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Remember Me"
                            />
                        </FormGroup>
                        <span className="d-inline-block"><Link to="/forget-password">Forgot Password?</Link></span>
                    </div> */}
                    <Button type="submit" className="button btn-active btn-lg mb-25">
                        sign in
                    </Button>
                    
                    <div></div>
                        
                    <FacebookLogin
                        appId = "404908563694870"
                        //autoLoad = {true}
                        fields = "name,email,picture"
                        callback={this.responseFacebook}
                     />  

                  

                    <p className="mb-0">Don't have an account? <Link to="/sign-up">Click here to create one</Link></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
      userLogged: store.data.userLoggedData,
      emailVerified: store.data.emailData,
    };
  }
 
 function mapDispatchToProps(dispatch) {
    return {
      login: (data, success, failure) => (
        dispatch(generalActions.login(data, success, failure))
      ),
      verifyEmail: (data, success, failure) => (
        dispatch(generalActions.verifyEmail(data, success, failure))
     ),   
    };
 }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);