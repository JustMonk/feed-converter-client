import React from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';
import { RiCloseLine } from "react-icons/ri";

const useStyles = createUseStyles(theme => ({
   overlay: {
      position: 'fixed',
      background: 'rgba(0,0,0,0.5)',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   dialog: {
      width: '500px',
      background: '#fff',
      borderRadius: '0.25rem',
      overflow: 'hidden'
   },
   dialogControls: {
      background: '#f3f3f3',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'flex-end'
   },
   dialogContent: {
      padding: '20px',
   },
   dialogClose: {
      paddingTop: '10px',
      paddingRight: '10px',
      display: 'flex',
      justifyContent: 'flex-end'
   },
   closeButton: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem'
   }
}));

const appRoot = document.getElementById('root');

export function Dialog(props) {
   const classes = useStyles();

   if (!props.open) return '';
   return ReactDOM.createPortal(
      <div className={classes.overlay}>
         <div className={classes.dialog}>

            <div className={classes.dialogClose}>
               <button className={classes.closeButton} onClick={props.onClose}>
                  <RiCloseLine />
               </button>
            </div>

            <div className={classes.dialogContent}>
               {props.content}
            </div>

            <div className={classes.dialogControls}>
               {props.controls}
            </div>

         </div>
      </div>,
      appRoot,
   );
}