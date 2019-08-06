import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/newsList';

const news = () => {
    
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
                type="card_with_pic"
                loadMore = {true}
                start={3}
                amount={8}
            />

        </div>
    );

}
 
export default news;