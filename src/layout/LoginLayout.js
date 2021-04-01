import React from "react";
import { createUseStyles } from 'react-jss';
import { ToggleThemeButton } from '../components/ToggleThemeButton';

const useStyles = createUseStyles(theme => ({
   loginLayout: {
      //background: '#f7fafc', //#f7fafc
      maxWidth: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //original fill: #7F7BFB
      background: `${theme.background.default} url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 200" xml:space="preserve" height="800px" width="800px"><g><path fill="%23${theme.blob}" d="M41.3,-52.9C54.4,-47.3,66.6,-36.4,73.8,-22.1C81,-7.8,83.2,10,75.4,21.7C67.7,33.4,50.1,39.1,35.9,47.5C21.7,56,10.8,67.3,0,67.3C-10.8,67.3,-21.6,55.9,-35.7,47.4C-49.9,38.9,-67.3,33.2,-70,23.2C-72.7,13.1,-60.6,-1.3,-53.8,-15.9C-46.9,-30.5,-45.3,-45.3,-37.2,-52.5C-29.1,-59.7,-14.6,-59.4,-0.2,-59.1C14.1,-58.7,28.2,-58.5,41.3,-52.9Z" transform="translate(100 100) scale(1.21)" fill-rule="nonzero"/></g></svg>') 50% no-repeat`,
   },
   rightAngleAction: {
      position: 'absolute',
      top: '10px',
      right: '20px'
   }
}));

export function LoginLayout(props) {
   const classes = useStyles();

   return <div className={classes.loginLayout}>
      <div className={classes.rightAngleAction}>
         <ToggleThemeButton size={'2.2em'} transparent />
      </div>
      {props.children}
   </div>
}

export default LoginLayout;