import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   label: {
      fontSize: '.875rem',
      display: 'block',
      marginBottom: '1rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      '& input': {
         marginTop: '.25rem', //.5rem
      },
   },
}));

export function Label(props) {
   const classes = useStyles();
   return(
      <label className={classes.label}>
         {props.children}
      </label>
   );
}

export default Label;