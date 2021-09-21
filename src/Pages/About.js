import React from 'react';
import TechnologyStack from '../Components/TechnologyStack';

export default class About extends React.Component {
    render() {
        return (
            <>
            <div className="row">

                <div className="col-md-9 pe-20">
                    <div className="row">
                        <div className="card card-flush shadow-sm mb-15">
                            <div className="card-header">
                                <h2 className="card-title">About This Project</h2>
                            </div>
                            <div className="card-body py-5 fs-6">
                                This is a web application developed to keep track of users' schedules. This application integrates with Slack through its own
                                Slack bot. Users are able to access the website and also utilize the Slack Bot to create and delete events and also view their schedules.
                            </div>
                            <div className="card-footer">
                                
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card card-flush shadow-sm mb-15">
                            <div className="card-header">
                                <h2 className="card-title">Slack Integration</h2>
                            </div>
                            
                            <div className="card-body py-5 fs-6">
                            {/* <a className="d-block bgi-no-repeat bgi-size-cover bgi-position-center rounded position-relative min-h-175px mb-15"
                                style={{ backgroundImage: 'url(http://localhost:3000/assets/media/stock/2000x800/1.jpg)' }}
                                data-fslightbox="lightbox-youtube"
                                href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                >
                                <img src="http://localhost:3000/assets/media/svg/misc/video-play.svg"  className="position-absolute top-50 start-50 translate-middle" alt=""/>
                            </a> */}
                                The Slack bot is able to recognize natural language and interpret the user intentions to support actions such as creating and deleting events
                                and also checking the user's schedule.<br/><br/>To connect your Slack Account to the Web Account, please follow these steps:<br/><br/>
                                <ul>
                                    <li>Access the Bot added into the workspace.</li>
                                    <li>Tell that you would like to connect your account.</li>
                                    <li>The Bot will respond with a message telling you to verify on the web app if the connection was successful.</li>
                                </ul>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>

                    <div className="row mb-15">
                        
                    </div>
                </div>

                <div className="col-md-3 h-100">
                    <div className="row align-items-end">
                        <div className="card card-flush shadow-sm">
                            <div className="card-header">
                                <h3 className="card-title">Technology Stack</h3>
                            </div>
                            <div className="card-body pt-0 px-0">
                                <TechnologyStack icon={"fa fa-database"} name={"MongoDB"} color={"primary"}/>
                                <TechnologyStack svgIcon={"assets/media/svg/expressjs-icon.svg"} name={"Express"} color={"danger"}/>
                                <TechnologyStack icon={"fab fa-react"} name={"React"} color={"info"}/>
                                <TechnologyStack icon={"fab fa-node-js"} name={"NodeJS"} color={"success"}/>
                            </div>
                            <div className="card-footer">
                                Hosting Platform: Heroku<br/>
                                Natural Language Processing: wit.ai
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            
            </div>

            
            
            </>
        )
    }
}