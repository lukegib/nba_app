import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider.js';
import NewsList from '../widgets/NewsList/newsList.js';
import VideoList from '../widgets/VideoList/videoList';

const Home = () => {
    return ( 
        <div>
               <NewsSlider
                    type="featured"
                    start="0"
                    amount="3"
                    settings={{
                         dots: false
                    }}
               />  
               <NewsList
                    type="card"
                    loadMore = {true}
                    start={3}
                    amount={3}
               />
               <VideoList
                    type="card"
                    title={true}
                    loadMore={false}
                    start={0}
                    amount={3}
               />
        </div>
     );
}

///NEED TO DO TAGS 
 
export default Home;