import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { createUseStyles } from 'react-jss';
import { FaChessBishop } from "react-icons/fa";
import { SideMenu } from './SideMenu';
import { Button } from '../components/Button';
import { PlaceholderBox } from "../components/PlaceholderBox";
import { useThemeContext } from '../contexts/ThemeContext';
import { ToggleThemeButton } from '../components/ToggleThemeButton';

const useStyles = createUseStyles(theme => ({
   layout: {
      background: theme.background.default,
      minWidth: '100vw',
      minHeight: '100vh',
      overflow: 'auto'
   },
   mainWrapper: {
      marginTop: '25px',
   },
   mainContent: {
      display: 'flex',
      alignItems: 'start',
      width: '100%'
   },
   headerPanel: {
      background: theme.background.paper,
      color: theme.text.primary,
      height: '60px',
      boxShadow: '0px 2px 5px 0px rgb(0 0 0 / 20%)',
   },
   contentWrapper: {
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: theme.background.paper,
      color: theme.text.primary,
      padding: '30px',
      flexGrow: 2,
   },
   container: {
      minWidth: theme.sizes.container,
      maxWidth: theme.sizes.container,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '0 auto',
      height: '100%',
      width: '100%'
   },
   [`@media (max-width: ${theme.sizes.container})`]: {
      headerPanel: {
         width: theme.sizes.container,
         maxWidth: theme.sizes.container
      }
   }
}));

export function Layout(props) {
   const classes = useStyles();
   const auth = useAuth();

   return <div className={classes.layout}>

      {/*top menu*/}
      <div className={classes.headerPanel}>
         <div className={classes.container}>
            <div className="headerLeftBar">
               <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100 }}>
                  <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
                  <span>Bishop converter</span>
               </div>
            </div>


            <div className="headerRightBar" style={{ display: 'flex', alignItems: 'center' }}>
               <span style={{ fontWeight: 500 }}>{auth.userInfo ? auth.userInfo.email.split('@')[0] : <PlaceholderBox />}</span>
               <ToggleThemeButton />
               <Button variant="outlined" style={{ marginLeft: '15px' }} onClick={() => auth.logout()}>Выйти</Button>
            </div>
         </div>
      </div>

      {/*main row*/}
      <div className={classes.mainWrapper}>
         <div className={classes.container}>
            <div className={classes.mainContent}>

               {/*menu*/}
               <SideMenu />

               {/*content*/}
               <div className={classes.contentWrapper}>
                  {props.children}
               </div>

            </div>
         </div>
      </div>



   </div>
}

export default Layout;