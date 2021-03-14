import React, { Fragment } from "react";
import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   buttonMain: {
      width: (props) => props.fullWidth ? '100%' : 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '.75rem',
      paddingBottom: '.75rem',
      background: (props) => {
         if (props.variant === 'outlined') return 'transparent';
         if (props.color) return theme.colors[props.color];
         return theme.colors.primary;
      },
      borderRadius: '.25rem',
      border: (props) => {
         if (props.variant === 'outlined') return '1px solid #d5d6d7';
         return 'none';
      },
      color: (props) => {
         if (props.variant === 'outlined') return '#4c4f52';
         return '#fff'
      },
      fontFamily: 'inherit',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.15s',
      '&:hover': {
         filter: 'brightness(90%)'
      },
      '&:active': {
         filter: 'brightness(95%)'
      },
      '&:focus': {
         boxShadow: (props) => {
            if (props.variant === 'outlined') return '0 0 0 3px rgb(213 214 215 / 45%)';
            if (props.color) return `0 0 0 3px ${theme.colors[props.color] + '42'}`;
            return `0 0 0 3px ${theme.colors.primary + '42'}`;
         },
         borderColor: (props) => props.variant === 'outlined' ? '#707275' : theme.colors.primary
      }
   },
   iconLeft: {
      marginRight: '.5rem',
      display: 'flex',
      alignItems: 'center'
   }
}));

export const Button = (props) => {
   const theme = useTheme();
   const classes = useStyles({...props, theme})
   return <button
      className={classes.buttonMain}
      onClick={props.onClick}
      type={props.type}
      style={{...props.style}}
   >
      {props.iconLeft ? <span className={classes.iconLeft}>{props.iconLeft}</span> : ''}
      {props.children}
   </button>
}
export default Button;