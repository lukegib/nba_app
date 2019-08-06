import React, { Component } from 'react';
import {firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos} from '../../../../firebase';

import styles from '../../articles.module.css';
import Header from './header';
import RelatedVideos from '../../../widgets/VideoList/RelatedVideos/relatedVideos';

class VideoArticle extends Component {
    
    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    async componentDidMount() {
        let snapshot = await firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value');
        let article = snapshot.val();

        snapshot = await firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value');
        const team = firebaseLooper(snapshot);

        this.setState({
            article,
            team
        })

        this.getRelated();
    }

    getRelated = async () => {

        let snapshot = await firebaseTeams.once('value');
        const teams = firebaseLooper(snapshot);

        snapshot = await firebaseVideos.orderByChild('team').equalTo(this.state.article.team).limitToFirst(3).once('value');
        const related = firebaseLooper(snapshot);

        this.setState({
            teams,
            related
        })

        /*let res = await axios.get(`${URL}/teams`);

        let teams = res.data;
        res = await axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`);
        this.setState({
            teams,
            related: res.data  
        });*/
    }

    render() { 

        const article = this.state.article;
        const team = this.state.team;

        return ( 
            <div>
                <Header teamData={team[0]}/>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    {/*use widget for video*/}
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height= "300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >

                    </iframe>
                </div>
                <RelatedVideos
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
            
        );
    }
}

export default VideoArticle;