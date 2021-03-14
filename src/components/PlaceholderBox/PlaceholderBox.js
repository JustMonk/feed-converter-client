import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   placeholderBox: {
      width: '100%',
      height: '10px',
      //background: '#e6fffa',
      background: '#cbd5e0',
      overflow: 'hidden',
      position: 'relative'
   },
}));

export function PlaceholderBox(props) {
   const classes = useStyles();
   return <div
      className={classes.placeholderBox}
      style={{ width: props.width || '100px', height: props.height || '10px', borderRadius: props.rounded ? '5px' : '' }}>
   </div>
}
export default PlaceholderBox;