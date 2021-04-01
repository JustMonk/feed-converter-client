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
      background: theme.progress.linear,
      overflow: 'hidden',
      position: 'relative'
   },
   bar: {
      background: theme.progress.linearBar,
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