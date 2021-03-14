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


const useStyles = createUseStyles(theme => ({
   emptyCard: {
      color: '#cbd5e0',
      textAlign: 'center'
   },
}));

export function FeedList(props) {
   const auth = useAuth();
   const [feedList, setFeedList] = useState(null);
   const classes = useStyles();
   const history = useHistory();

   const getFeedList = async () => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'feed', {
         method: 'GET',
         headers: { 'x-access-token': `${token}` }
      });
      if (!response.ok) return;

      const json = await response.json();
      console.log('feed json: %o', json);
      setFeedList(json);
   };

   useEffect(() => {
      getFeedList();
   }, []);

   return <Layout>
      <h2>Список фидов</h2>

      {feedList && feedList.length ? <div><Button color="green" onClick={() => history.push('/feed/create')} style={{ margin: '20px 0px' }}>Создать новый</Button></div> : ''}

      {feedList ? <Fragment>

         {!feedList.length ? <div className={classes.emptyCard}>
            <div>
               <FaStream style={{ fontSize: '5em' }} />
            </div>

            <div style={{ fontSize: '1.5em', color: 'grey' }}>Список фидов пуст</div>
            <Button color="green" onClick={() => history.push('/feed/create')} style={{ margin: '20px auto' }}>Создать новый</Button>
         </div> : ''}

         <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {feedList.map(val => <FeedCard>
               <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{val.name}</div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button color="green">Конвертация</Button>
                  <Button style={{ padding: '15px' }}><FaRegEdit /></Button>
                  <Button style={{ padding: '15px' }}><FaTrashAlt /></Button>
               </div>
            </FeedCard>)}
         </div>

      </Fragment> : <LinearProgress />}

   </Layout>
}
export default FeedList;