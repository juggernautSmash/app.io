import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import timeSheet from '../../assets/images/timeSheet.png'
import panCake from '../../assets/images/panCake.png'
import userIcon from '../../assets/images/userIcon.png'
import './LandingPage.css'

const LandingPage = _ => {
    return (
        <Carousel showThumbs={false}>
            <div id="slide">
                <img id="picture" src={timeSheet} alt='placeholder'/>
                <h1 id="title">Schedule</h1>
                <h3 id="para">Your schedule tab will act as your personal digital planner. You can organize specific job tasks, recive notifications on events and meetings between your clients and business partners. Your schedule will also provide daily updates on potential business ventures with not only your company but other related businesses as well and give you updates on company memos, new projects, and existing deadlines that need to be met.</h3>
            </div>
            <div id="slide">
                <img id="picture" src={panCake} alt='placeholder'/>
                <h1 id="title">Time Management</h1>
                <h3 id="para">Managing ones time is important for any good business so this tab will help supply you with the tools for success. This app will present you with helpful guides on how to best prioritize the current items within your schedule, automatically updating with each new input. You will also have access to a variety of fully customizable tools such as timers, alarms, and calendars.</h3>
            </div>
            <div id="slide">
                <img id="picture" src={userIcon} alt='placeholder'/>
                <h1 id="title">Client Management</h1>
                <h3 id="para">Managing your clientel is another important faccet of any good business practice, so this social tab will help you build your own social network. It can store and organize the profiles on all your buisness partners and personal clients, providing notifications and instant messaging between you, your partners, and your clients seamlessly. You can use this tool to promote yourself aswell to new potential business parters and be provided notifications for potential new clients who are associated with your current ones. Communication is a valuable part of any business so enjoy staying up to date with this efficent and valuable networking tool.</h3>
            </div>
        </Carousel>
    )
}


export default LandingPage