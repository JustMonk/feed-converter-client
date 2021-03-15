import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   cardWrapper: {
      border: '1px solid #e2e2e2',
      borderRadius: '5px',
      padding: '15px',
      minWidth: '265px',
      maxWidth: '265px',
      display: 'inline-block',
      marginBottom: '15px'
   },
}));

export function FeedCard(props) {
   const classes = useStyles();

   return <div className={classes.cardWrapper}>
      {props.children}
   </div>
}

export default FeedCard;