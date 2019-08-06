import React, { Component } from 'react';
//import axios from 'axios';
//import {URL} from '../../../../config';
import {firebase, firebaseDB, firebaseLooper, firebaseTeams} from '../../../../firebase';
import styles from '../../articles.module.css';

import Header from './header';

class NewsArticles extends Component {
    
    state = { 
        article: [],
        team: [],
        imageURL: ''
    }

    async componentDidMount() {

        let snapshot = await firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value');
        let article = snapshot.val();

        snapshot = await firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value');
        const team = firebaseLooper(snapshot);

        this.setState({
            article,
            team
        })

        this.getImageURL(article.image);

    }

    getImageURL = (filename) => {
        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then(url => {
                this.setState({
                    imageURL: url
                })
            })
    }
    
    render() {
        
        const article = this.state.article;
        const team = this.state.team;

        
        return (
            <div className="articleWrapper">
                <Header
                    teamData = {team[0]}
                    date = {article.date}
                    author = {article.author}

                />
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style = {{
                            background: `url('${this.state.imageURL}')`
                        }}
                    >    
                    </div>
                    <div className={styles.articleText}
                        dangerouslySetInnerHTML={{
                            __html: article.body
                        }}
                    >
                           
                    </div>    

                </div>
            </div>
        );
    }
}
 
export default NewsArticles;