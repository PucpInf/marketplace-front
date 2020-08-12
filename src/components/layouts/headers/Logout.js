/**
 * logout header widget
*/
/* eslint-disable */
import React, { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';


class Logout extends React.Component {
   state = {
      anchorEl: null,
      user: {
         url: require('../../../assets/avatars/user-4.jpg'),
         alt: 'user'
      },
      menus: [
         {
            id: 1,
            title: 'Profile',
            icon: 'account_circle',
            path: '/account/profile'
         },
         {
            id: 2,
            title: 'Account',
            icon: 'settings',
            path: '/account/profile'
         },
         {
            id: 3,
            title: 'Message',
            icon: 'email',
            path: '/account/profile'
         },
         {
            id: 4,
            title: 'Logout',
            icon: 'power_settings_new',
            path: '/sign-in'
         }
      ]
   };

   //define function for open dropdown
   handleMenu = event => {
      console.log(event.currentTarget);
      this.setState({ anchorEl: event.currentTarget });
   };

   //define function for close dropdown
   handleClose = (e) => {
      const name = e.target.name;
      const dataName = e.target.dataset.name;
      if(name === 'Logout' || dataName === 'Logout') {
         localStorage.removeItem('user');
         window.location.href = `${window.location.origin}/sign-in`;
      }
      this.setState({ anchorEl: null });
   };

   render() {
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
      const user = this.state.user;
      const userString = localStorage.getItem('user');
      let userLogged = null;
      if(userString) {
         userLogged = JSON.parse(userString);
      }
      // console.log('user', userLogged);
      return (
         <div className='iron-logout-wrap' style={{display: 'flex', alignItems: 'center'}}>
            {
               userLogged ?  (
                  <Fragment>
                     {`${userLogged.user.firstName} ${userLogged.user.lastName}`}
                     <Avatar
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        className="icon-btn avatarCustom"
                        alt={user.alt} src={user.url}
                     >
                     </Avatar>
                  </Fragment>
               )
               : <Fragment>
                  <a style={{color:'white', marginRight: '15px'}} href={`${window.location.origin}/sign-in`}>Login </a> 
                  <a style={{color:'white'}} href={`${window.location.origin}/sign-up`}> Register</a>
               </Fragment>
            }
            <Menu
               anchorEl={anchorEl}
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               open={open}
               onClose={this.handleClose}
               className="iron-dropdown"
            >
               {this.state.menus.map((menu, index) => (
                  <MenuItem
                     key={index}
                     name={menu.title}
                     onClick={this.handleClose}
                     to={menu.path}
                     component={Link}
                  >
                     <i className="material-icons" name={menu.title} data-name={menu.title} >{menu.icon}</i>
                     <span className="mb-0" data-name={menu.title}>{menu.title}</span>
                  </MenuItem>
               ))}
            </Menu>
         </div>
      );
   }
}

export default Logout;