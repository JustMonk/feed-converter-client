import React, { Fragment, useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   '@keyframes slideRight': {
      from: {
         opacity: 0,
         transform: 'translateX(-10px) scale(0.98)'
      },
      to: {
         opacity: 1,
         transform: 'translateX(0px) scale(1)'
      }
   },
   alert: {
      animation: '$slideRight ease-in 0.3s',
      padding: '20px',
      background: (props) => {
         //default
         if(!props.type) return '#FFF0F3';
         if (props.type === 'success') return 'rgba(243,250,247)';
      },
      borderLeft: (props) => {
         if (!props.type) return '5px solid #FFB3C0';
         if (props.type === 'success') return '5px solid #A7F3D0';
      },
      borderRadius: '4px',
      fontSize: '.875rem',
      margin: '10px 0px'
      //display: 'flex',
      //justifyContent: 'space-between'
   },
   success: {
      background: '#fafffa',
      borderLeft: '5px solid #d4ffb3'
   },
   title: {
      fontWeight: 700
   },
   link: {
      cursor: 'pointer'
   }
}));

export function Alert(props) {
   const theme = useTheme();
   const classes = useStyles({...props, theme});
   const [isVisible, setVisibility] = useState(true);
   return <>
      <div className={classes.alert}>
         <summary className={classes.title}>{props.title}</summary>
         {props.children}
      </div>
   </>
}
export default Alert;