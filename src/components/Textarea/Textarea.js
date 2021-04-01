import React, { Fragment } from "react";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   textareaMain: {
      color: theme.text.input,
      fontSize: '.875rem',
      padding: '.5rem .75rem',
      lineHeight: '1.5',
      display: 'block',
      borderRadius: '.25rem',
      outline: 'none',
      backgroundColor: theme.background.input,
      border: `1px solid ${theme.border.input}`,
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