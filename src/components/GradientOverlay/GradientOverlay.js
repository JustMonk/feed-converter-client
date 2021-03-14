import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   gradientOverlay: {
      background: 'linear-gradient(46deg, #c7d2fe, transparent)',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0
   }
}));

export function GradientOverlay(props) {
   const classes = useStyles();
   return <div className={classes.gradientOverlay}>
      {props.children}
   </div>
}
export default GradientOverlay;