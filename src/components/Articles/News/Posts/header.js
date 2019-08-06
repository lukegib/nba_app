import React from 'react';

import TeamInfo from '../../Elements/teamInfo'
import PostInfo from '../../Elements/postInfo'

const Header = (props) => {
    
    const teamInfo = (team) => {
        return team ? (
            <TeamInfo team = {team}/>
        ):
        null
    }

    const postInfo = (date, author) => {
        return <PostInfo data={{date, author}}/>
    }

    return ( 
        <div>
            {teamInfo(props.teamData)}
            {postInfo(props.date, props.author)}
        </div>
    );
}
 
export default Header;