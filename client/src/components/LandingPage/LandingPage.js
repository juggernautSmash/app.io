import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import timeSheet from '../../assets/images/timeSheet.png'
import panCake from '../../assets/images/panCake.png'
import userIcon from '../../assets/images/userIcon.png'
import './LandingPage.css'

const LandingPage = _ => {
    return (
        <Carousel>
            <div id="slide">
                <img id="picture" src={timeSheet} />
                <h1 id="title">Schedule</h1>
                <h3 id="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan. Enim facilisis gravida neque convallis a. Nunc scelerisque viverra mauris in. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Iaculis urna id volutpat lacus laoreet non curabitur. Diam vulputate ut pharetra sit amet aliquam id. Commodo sed egestas egestas fringilla phasellus faucibus. Vivamus arcu felis bibendum ut tristique et. Lectus proin nibh nisl condimentum id venenatis. Enim sed faucibus turpis in. Odio facilisis mauris sit amet</h3>
            </div>
            <div id="slide">
                <img id="picture" src={panCake} />
                <h1 id="title">Time Management</h1>
                <h3 id="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan. Enim facilisis gravida neque convallis a. Nunc scelerisque viverra mauris in. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Iaculis urna id volutpat lacus laoreet non curabitur. Diam vulputate ut pharetra sit amet aliquam id. Commodo sed egestas egestas fringilla phasellus faucibus. Vivamus arcu felis bibendum ut tristique et. Lectus proin nibh nisl condimentum id venenatis. Enim sed faucibus turpis in. Odio facilisis mauris sit amet</h3>
            </div>
            <div id="slide">
                <img id="picture" src={userIcon} />
                <h1 id="title">Client Management</h1>
                <h3 id="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan. Enim facilisis gravida neque convallis a. Nunc scelerisque viverra mauris in. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Iaculis urna id volutpat lacus laoreet non curabitur. Diam vulputate ut pharetra sit amet aliquam id. Commodo sed egestas egestas fringilla phasellus faucibus. Vivamus arcu felis bibendum ut tristique et. Lectus proin nibh nisl condimentum id venenatis. Enim sed faucibus turpis in. Odio facilisis mauris sit amet</h3>
            </div>
        </Carousel>
    )
}


export default LandingPage