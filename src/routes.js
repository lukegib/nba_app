import React from 'react';
import {Switch} from 'react-router-dom';

import Home from './components/Home/home';
import NewsArticle from './components/Articles/News/Posts/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import News from './components/News/news';
import Videos from './components/Videos/videos';
import Layout from './hoc/Layout/layout';
import SignIn from './components/signIn/signin';
import Dashboard from './components/Dashboard/dashboard'
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoute from './components/AuthRoutes/publicRoutes';

const Routes = (props) => {
        return(
            <Layout user={props.user}>
                <Switch>
                    <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
                    <PublicRoute {...props} restricted={false} path="/articles/:id" exact component={NewsArticle}/>
                    <PublicRoute {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
                    <PublicRoute {...props} restricted={false} path="/news" exact component={News}/>
                    <PublicRoute {...props} restricted={false} path="/videos" exact component={Videos}/>
                    <PublicRoute {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                    <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>

        )
}

export default Routes;