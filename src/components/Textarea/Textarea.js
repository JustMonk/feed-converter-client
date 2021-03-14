import React, { Fragment } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   textareaMain: {
      color: '#4a5568',
      fontSize: '.875rem',
      padding: '.5rem .75rem',
      lineHeight: '1.5',
      display: 'block',
      borderWidth: '1px',
      borderRadius: '.25rem',
      outline: 'none',
      borderColor: '#e2e8f0',
      backgroundColor: '#fff',
      border: '0 solid #e2e8f0',
      width: '100%',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      marginTop: '.5rem',
      resize: 'vertical',
      width: '100%',
      '&:focus': {
         boxShadow: `0 0 0 3px ${theme.colors.primary + '42'}`,
         outlineColor: 'rgba(0,0,0,0)',
         outlineOffset: '2px',
         outlineStyle: 'solid',
         borderColor: theme.colors.primary
      }
   },
   textareaWrapper: {
      display: 'flex'
   }
}));

export const Textarea = (props) => {
   const classes = useStyles();
   return <div className={classes.textareaWrapper}>
      <textarea
         className={classes.textareaMain}
         placeholder={props.placeholder}
         onChange={props.onChange}
         value={props.value}
         style={{...props.style}}
         rows="3"
      >
      </textarea>
   </div>
}
export default Textarea;