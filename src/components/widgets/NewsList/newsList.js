import React, { Component } from 'react';
import {Link} from 'react-router-dom';


import styles from './newsList.module.css';

import Button from '../Buttons/buttons';
import CardInfo from '../../widgets/CardInfo/cardInfo';
import {firebaseTeams, firebaseArticles, firebaseLooper} from '../../../firebase';

class NewsList extends Component {
    
    state = { 
        teams: [],
        items: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        imageUrl: '',
        mounted: false
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentDidMount() {
        this.setState({
            mounted: true
        })

        this.request(this.state.start, this.state.end);
    }

    request = async (start, end) => {
        if(this.state.teams.length < 1){

            const snapshot = await firebaseTeams.once('value');

            const teams = firebaseLooper(snapshot);

            this.setState({
                teams
            })

        }

        const snapshot = await firebaseArticles.orderByChild("id").startAt(start).endAt(end).once('value');
        const articles = firebaseLooper(snapshot);

        this.setState({
            items:[...this.state.items, ...articles],
            start,
            end
        })

        /*const res = await axios.get(`${URL}/articles?_start=${start}&_end=${end}`);
        this.setState({
            items:[...this.state.items, ...res.data],
            start,
            end

        })*/
    }

    loadMore = () => {
        this.request(this.state.end + 1, this.state.end + this.state.amount);
    }


    renderNews = (type) => {
        let template = <h1>HI</h1>;

        switch(type){
            case('card'):
                template = this.state.items.map( (item, i) => (
                        <div key={i}>
                            <div className={styles.newsListItem}>
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo
                                        teams={this.state.teams}
                                        team = {item.team}
                                        date = {item.date}
                                    />
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>    
                ))
                break;
            
            case('card_with_pic'):
                template = this.state.items.map((item, i) => (
                        <div>
                            <div className={styles.newsListItem.pic}>
                                <Link to={`/articles/${item.id}`}>
                                    <div className={styles.flexWrap}>
                                        <div className={styles.left}
                                            style={{
                                                background: `url(/images/articles/${item.image})`
                                            }}
                                        >
                                            <div
                                            ></div>
                                        </div>
                                        <div className={styles.right}>
                                            <CardInfo
                                                teams={this.state.teams}
                                                team = {item.team}
                                                date = {item.date}
                                            />
                                            <h2>{item.title}</h2>
                                        </div>
                                    </div>    
                                </Link>
                            </div>
                        </div>    
                ));
                break;
            
            default:
                template='';
                break;    
        }

        return template;
    }
    
    render() { 
        return ( 
            <div>
                {this.renderNews(this.props.type)}
            
                <Button
                    type='loadMore'
                    loadMore={this.loadMore}
                    cta="Load More News" //call to action
                />
            </div>
        );
    }
}
 
export default NewsList;
