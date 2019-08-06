import React from 'react';
import styles from '../videoList.module.css'
import VideoListTemplate from '../videoListTemplate';

const relatedVideos = (props) => {
    return (
        <div className={styles.relatedWrapper}>
            <VideoListTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
}
 
export default relatedVideos;