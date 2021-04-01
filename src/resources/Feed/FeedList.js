import React, { Fragment, useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Button } from '../../components/Button';
import { createUseStyles } from 'react-jss';
import { config } from '../../config';
import { useAuth } from '../../providers/AuthProvider';
import { FaStream } from 'react-icons/fa';
import { LinearProgress } from '../../components/LinearProgress';
import { useHistory } from "react-router";
import { FeedCard } from '../../components/FeedCard';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { useToastContext, ADD } from "../../contexts/ToastContext";

const useStyles = createUseStyles(theme => ({
   emptyCard: {
      color: '#cbd5e0',
      textAlign: 'center'
   },
   '@keyframes slideTop': {
      from: {
         opacity: 0,
         transform: 'translateY(-7px) scale(1)'
      },
      to: {
         opacity: 1,
         transform: 'translateY(0px) scale(1)'
      }
   },
   feedWrapper: {
      animation: '$slideTop ease-in 0.3s',
   },
   linkSubtitle: {
      color: 'grey',
      fontSize: '0.7em',
      marginBottom: '10px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
   },
   feedTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      height: '1.2em',
      whiteSpace: 'nowrap'
   },
   feedControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   '@keyframes rotateCircular': {
      from: {
         transformOrigin: '50% 50%'
      },
      to: {
         transform: 'rotate(360deg)'
      }
   },
   circularProgress: {
      fontSize: '16px',
      animation: '$rotateCircular linear 1.4s infinite',
   }
}));

export function FeedList(props) {
   const auth = useAuth();
   const [feedList, setFeedList] = useState(null);
   const classes = useStyles();
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const { toastDispatch } = useToastContext();

   const getFeedList = async () => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'feed', {
         method: 'GET',
         headers: { 'x-access-token': `${token}` }
      });
      if (!response.ok) return;

      const json = await response.json();
      setFeedList(json);
   };

   useEffect(() => {
      getFeedList();
   }, []);

   const editFeed = (id) => {
      history.push(`/feed/${id}`)
   }

   const deleteFeed = async (id) => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + `feed/${id}`, {
         method: 'DELETE',
         headers: { 'x-access-token': `${token}` }
      });
      if (!response.ok) return;
      getFeedList();
   }

   const download_csv = (url) => {
      let linkElement = document.createElement('a');
      linkElement.target = '_blank';
      linkElement.download = `ConvertedFile_${Date.now()}.csv`;
      linkElement.href = url;
      linkElement.click();
   }

   const convertFeed = async (id) => {
      setLoading(true);
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + `feed/${id}/convert`, {
         method: 'POST',
         headers: { 'authorization': `bearer ${token}` }
      });
      if (!response.ok) return;

      toastDispatch({ type: ADD, payload: { content: { type: "info", message: 'Загрузка файла началась' } } });

      setLoading(false);

      const blob = await response.blob();
      let file = new Blob([blob], { type: 'text/csv' });
      const objectURL = URL.createObjectURL(file);
      download_csv(objectURL);
   }

   return <Fragment>
      <h2>Список фидов</h2>

      {feedList && feedList.length ? <div><Button color="green" onClick={() => history.push('/feed/create')} style={{ margin: '20px 0px' }}>Создать новый</Button></div> : ''}

      {feedList ? <div className={classes.feedWrapper}>

         {!feedList.length ? <div className={classes.emptyCard}>
            <div>
               <FaStream style={{ fontSize: '5em' }} />
            </div>

            <div style={{ fontSize: '1.5em', color: 'grey' }}>Список фидов пуст</div>
            <Button color="green" onClick={() => history.push('/feed/create')} style={{ margin: '20px auto' }}>Создать новый</Button>
         </div> : ''}

         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {feedList.map(val => <FeedCard key={val.id}>
               <div className={classes.feedTitle}>{val.name}</div>
               <div className={classes.linkSubtitle}>{val.url}</div>
               <div className={classes.feedControls}>
                  <Button onClick={() => isLoading ? null : convertFeed(val.id)}>{isLoading ? <BiLoaderAlt className={classes.circularProgress} /> : 'Конвертация'}</Button>
                  <div style={{ display: 'flex' }}>
                     <Button onClick={() => editFeed(val.id)} variant="outlined" style={{ padding: '12px' }}><FaRegEdit /></Button>
                     <Button onClick={() => deleteFeed(val.id)} variant="outlined" style={{ padding: '12px', marginLeft: '10px' }}><FaTrashAlt /></Button>
                  </div>
               </div>
            </FeedCard>)}
         </div>

      </div> : <LinearProgress />}

   </Fragment>
}
export default FeedList;