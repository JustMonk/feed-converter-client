import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   sideMenuWrapper: {
      margin: '0px 10px',
      width: '160px',
      minWidth: '160px',
      '& ul': {
         listStyle: 'none',
         margin: 0,
         padding: 0
      }
   },
}));

const useLinkStyles = createUseStyles(theme => ({
   link: {
      padding: '8px 15px',
      display: 'block',
      textDecoration: 'none',
      //borderRadius: '3px',
      borderLeft: `3px solid transparent`,
      color: theme.text.link,
      '&:hover': {
         background: theme.background.linkHover
      }
   },
   activeLink: {
      color: theme.text.activeLink,
      fontWeight: 'bold',
      //background: '#e3e9ef',
      borderLeft: `3px solid ${theme.colors.primary}`
   }
}));

function SideMenuLink({ label, to, activeOnlyWhenExact }) {
   const classes = useLinkStyles();

   let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
   });

   return (
      <div>
         <Link to={to} className={classes.link + (match ? " " + classes.activeLink : "")}>{label}</Link>
      </div>
   );
}

export function SideMenu(props) {
   const classes = useStyles();

   return <div className={classes.sideMenuWrapper}>
      <nav>
         <ul>
            <li>
               <SideMenuLink to="/" activeOnlyWhenExact={true} label="Конвертер" />
            </li>
            <li>
               <SideMenuLink to="/settings" label="Настройки" />
            </li>
         </ul>
      </nav>
   </div>
}
export default SideMenu;