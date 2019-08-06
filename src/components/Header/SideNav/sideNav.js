import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItems from './navItems';

const SideNavigation = (props) => {
    return(
        <div>
            <SideNav
                showNav = {props.showNav}
                onHideNav = {props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '60%',
                
                }}
            >
                <NavItems {...props}/>

            </SideNav>
        </div>
    )
}

export default SideNavigation;