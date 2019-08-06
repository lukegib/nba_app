import React, { Component } from 'react';
import styles from './videoList.module.css';
//import axios from 'axios';

//import {URL} from '../../../config';
import {firebaseLooper, firebaseVideos, firebaseTeams} from '../../../firebase';
import Button from '../Buttons/buttons';
import VideoListTemplate from './videoListTemplate';

class VideoList extends Component {
    
    state = { 
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    renderTitle = () => {
        return this.props.title ?
        <h3><strong>NBA</strong> Videos</h3> 
        : null
    }

    componentDidMount() {
        this.request(this.state.start, this.state.end);
    }

    request = async (start, end) => {
        if(this.state.teams.length < 1){

            const snapshot = await firebaseTeams.once('value');

            const teams = firebaseLooper(snapshot);

            this.setState({
                teams
            })
            /*const res = await axios.get(`${URL}/teams`);
            this.setState({
                teams: res.data
            })*/
        }

        const snapshot = await firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value');
        const videos = firebaseLooper(snapshot);

        this.setState({
            videos:[...this.state.videos, ...videos],
            start,
            end
        })

        /*const res = await axios.get(`${URL}/videos?_start=${start}&_end=${end}`);

        this.setState({
            videos:[...this.state.videos, ...res.data],
            start,
            end
        })*/

    }

    renderVideos = () => {
        let template = null;

        switch(this.props.type){

            case('card'):
                template = <VideoListTemplate data={this.state.videos} teams={this.state.teams}/>;
                break;
            
            default:
                template = null;
                break;
        }

        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }

    renderButton = () => {
        return this.props.loadMore ? 
        <Button
            type="loadMore"
            //loadMore={loadMore()}
            cta="Load More Videos"
        />
        :
        <Button
            type = 'linkTo'
            cta = "More Videos"
            linkTo = "/videos"
        />

    }

    render() { 
        return ( 
            <div className = {styles.videoListWrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>

        );
    }
}
 
export default VideoList;