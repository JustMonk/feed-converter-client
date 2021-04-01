import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   cardWrapper: {
      border: `1px solid ${theme.border.primary}`,
      borderRadius: '5px',
      padding: '15px',
      minWidth: '265px',
      maxWidth: '265px',
      display: 'inline-block',
      marginBottom: '15px',
      height: '100%'
   },
}));

export function FeedCard(props) {
   const classes = useStyles();

   return <div className={classes.cardWrapper}>
      {props.children}
   </div>
}

export default FeedCard;