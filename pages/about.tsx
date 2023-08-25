import React from 'react'
import Meta from '../components/Meta'
import Nav from '../components/Nav'

function About() {
    return (
        <div className='content'>
            <Meta title="About this site" />
            <Nav />
            <h1>About this site</h1>
            This a social media website where likes aren't used.
            Users are forced to choose between two photos and choose the better one.
            The order is also random so you can get set against any post on the site!
        </div>
    )
}

export default About