/**
 * Reactify Sidebar
 */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import { List } from '@material-ui/core';

// redux actions
import { collapsedSidebarAction } from '@actions/action';

// components
import NavMenuItem from './NavMenuItem';
import Navlinks from './Navlinks';

class AdminSidebar extends Component {

   state = {
      typeUser: '', 
   };

   componentWillMount() {
      this.updateDimensions();
      const userInfo = localStorage.getItem('user');
      if(userInfo) {
         const user = JSON.parse(userInfo);
         let typeuSER = Object.keys(user.admin).length ? 'admin' : '';
         typeuSER = Object.keys(user.client).length ? 'client' : typeuSER;
         typeuSER = Object.keys(user.provider).length ? 'provider' : typeuSER;

         this.setState({typeUser: typeuSER});
      } else {
         window.location.href = `${window.location.origin}/sign-in`;
      }
   }

   componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);

   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
   }

   componentWillReceiveProps(nextProps) {
      const { windowWidth } = this.state;
      if (nextProps.location !== this.props.location) {
         if (windowWidth <= 1199) {
            this.props.collapsedSidebarAction(false);
         }
      }
   }

   updateDimensions = () => {
      this.setState({ windowWidth: $(window).width(), windowHeight: $(window).height() });
   }

   render() {
      const {typeUser} = this.state;
      return (
         <Fragment>
            <div className="admin-sidebar-wrap">
               <div className="sidebar-content">
                  <div className="site-logo-wrap text-center">
                     <Link to="/" className="py-30 px-20 d-inline-block">
                        <img src={require('../../../assets/images/header-logo2.png')} alt="site-logo" width="200" height="35" />
                     </Link>
                  </div>
                  <div className="rct-sidebar-wrap">

                     <Scrollbars
                        className="rct-scroll"
                        autoHide
                        autoHideDuration={100}
                        style={{ height: 'calc(100vh - 60px)' }}
                     >
                        <div className="vertical-menu pt-50">
                           <List component="nav" className="iron-sidebar-menu">
                              {Navlinks.map((NavLink, index) => {
                                 if (NavLink.users.includes(typeUser)){
                                    return(
                                       <NavMenuItem
                                          typeUser={typeUser}
                                          menu={NavLink}
                                          key={index}
                                       />
                                    );
                                 }
                                 return <Fragment key={index}/>
                              })}
                           </List>
                        </div>
                     </Scrollbars>
                  </div>
               </div>
            </div>
         </Fragment>
      );
   }
}

// map state to props
const mapStateToProps = ({ appSettings }) => {
   const { collapsedSidebar } = appSettings;
   return { collapsedSidebar };
};

export default withRouter(connect(mapStateToProps, {
   collapsedSidebarAction,
})(AdminSidebar));
