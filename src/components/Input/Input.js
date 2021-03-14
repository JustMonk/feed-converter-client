import React, { Fragment } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   inputMain: {
      color: '#4a5568',
      //fontSize: '16px',
      fontSize: '.875rem',
      //paddingLeft: '1rem',
      //paddingRight: '1rem',
      //paddingTop: '.5rem',
      //paddingBottom: '.5rem',
      padding: '.5rem .75rem',
      lineHeight: '1.5',
      display: 'block',
      borderWidth: '1px',
      //borderRadius: '.5rem',
      borderRadius: '.25rem',
      outline: 'none',
      borderColor: '#e2e8f0',
      backgroundColor: '#fff',
      border: '0 solid #e2e8f0',
      width: '100%',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      marginTop: '.5rem', //.5rem
      '&:focus': {
         boxShadow: `0 0 0 3px ${theme.colors.primary + '42'}`,
         outlineColor: 'rgba(0,0,0,0)',
         outlineOffset: '2px',
         outlineStyle: 'solid',
         borderColor: theme.colors.primary
      }
   },
   inputWrapper: {
      display: 'flex'
   },
   checkbox: {
      width: 'auto',
      marginRight: '.5rem',
      appearance: 'none',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '17px',
      width: '17px',
      padding: 0,
      '&:focus': {
         boxShadow: `0 0 0 3px ${theme.colors.primary + '42'}`,
         outlineColor: 'rgba(0,0,0,0)',
         outlineOffset: '2px',
         outlineStyle: 'solid',
         borderColor: theme.colors.primary
      },
      '&:checked': {
         backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E")`,
         backgroundColor: theme.colors.primary,
         borderColor: 'transparent',
         backgroundSize: '100% 100%',
         backgroundPosition: '50%',
         backgroundRepeat: 'no-repeat',
      }
   },
   inlineWrapper: {
      display: 'inline-block'
   }
}));

export const Input = (props) => {
   const classes = useStyles();
   return <div className={classes.inputWrapper + (props.type === 'checkbox' ? ' ' + classes.inlineWrapper : '')}>
      <input
         className={classes.inputMain + (props.type === 'checkbox' ? ' ' + classes.checkbox : '')}
         placeholder={props.placeholder}
         onChange={props.onChange}
         value={props.value}
         type={props.type}
         style={{ ...props.style }}
      >
      </input>
   </div>
}
export default Input;