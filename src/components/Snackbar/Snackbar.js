import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { REMOVE } from "../../contexts/ToastContext";

const useStyles = createUseStyles(theme => ({
   '@keyframes slideInTop': {
      from: {
         top: '-20px',
         opacity: 0,
         transform: 'translateY(-7px) scale(1)'
      },
      to: {
         top: '20px',
         opacity: 1,
         transform: 'translateY(0px) scale(1)'
      }
   },
   snackbar: {
      animation: '$slideInTop ease-in 0.3s',
      //position: 'fixed',
      //top: '20px',
      //left: 'calc(50% - 145px)',
      color: '#fff',
      background: theme.snackbar.background,
      color: theme.snackbar.text,
      padding: '15px 20px',
      borderRadius: '3px',
      margin: '0 auto',
      minWidth: '250px',
      maxWidth: '250px',
      fontSize: '0.95em',
      zIndex: '99',
      marginTop: '10px'
   },
}));

export function Snackbar(props) {
   const classes = useStyles();
   const duration = props.duration || 3000;

   useEffect(() => {
      setTimeout(() => {
         props.toastDispatch({ type: REMOVE, payload: { id: props.id } })
      }, duration);
   });

   return <div key={props.id} onClick={props.onClick} className={classes.snackbar}>
      {props.message}
   </div>
}

export default Snackbar;