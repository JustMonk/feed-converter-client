import React from 'react';
import { createUseStyles } from 'react-jss'
import { FaSyncAlt } from "react-icons/fa";

const useStyles = createUseStyles(theme => ({
   '@keyframes rotateCircular': {
      from: {
         transformOrigin: '50% 50%'
         //transform: 'rotate(0deg)'
      },
      to: {
         transform: 'rotate(360deg)'
      }
   },
   circularProgress: {
      animation: '$rotateCircular linear 1.4s infinite',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2em',
      color: '#4e4e4e'
   },
}));

export function CircularProgress(props) {
   const classes = useStyles();
   return <div className={classes.circularProgress}>
      <FaSyncAlt/>
   </div>
}
export default CircularProgress;