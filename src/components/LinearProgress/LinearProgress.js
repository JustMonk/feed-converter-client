import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   '@keyframes linearLoading': {
      from: {
         left: '-20%'
      },
      to: {
         left: '120%'
      }
   },
   linearProgress: {
      width: '100%',
      height: '10px',
      background: '#e6fffa',
      overflow: 'hidden',
      position: 'relative'
   },
   bar: {
      background: '#bde8e0',
      width: '20%',
      height: '100%',
      position: 'absolute',
      animationName: '$linearLoading',
      animationDuration: '1.4s',
      animationIterationCount: 'infinite',
   }
}));

export function LinearProgress(props) {
   const classes = useStyles();

   return <div className={classes.linearProgress}>
      <div className={classes.bar}></div>
   </div>
}
export default LinearProgress;