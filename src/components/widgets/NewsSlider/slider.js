import React, { Component } from 'react';
//import axios from 'axios';
import SliderTemplates from './slider_templates';

//import {URL} from '../../../config';

import {firebase, firebaseArticles, firebaseLooper} from '../../../firebase';

class NewsSlider extends Component {
    
    state = { 
        news: []
    }

    async componentDidMount() {

        let snapshot = await firebaseArticles.limitToFirst(3).once('value');
        const news = firebaseLooper(snapshot)
        
        /*news.forEach((item, i) => {
            firebase.storage().ref('images').child(item.image).getDownloadURL()
                .then( url => {
                    news[i].image = url;
                    this.setState({
                        news
                    })
                })
        });*/

        const asyncFunction = (item, i, callback) => {
            firebase.storage().ref('images').child(item.image).getDownloadURL()
            .then( url => {
                news[i].image = url;
                callback();
            })
        }

        //let req= []
        let requests = news.map((item, i) => {
            return new Promise((resolve) => {
                asyncFunction(item, i, resolve)
            })
        })

        Promise.all(requests).then(()=> {
            this.setState({
                news
            })
        })



        /*const news = await axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`) //starts at article 0 and ends at 3

        this.setState({
            news: news.data
        });*/
    }
    
    render() { 
        return ( 
            <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        );
    }
}
 
export default NewsSlider;
