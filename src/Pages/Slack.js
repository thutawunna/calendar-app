import React from 'react';

export default class Slack extends React.Component {
    render() {
        return (
            <div className="row">

                <div className="col-md-9 pe-20">

                    <div className="row">
                        <div className="card card-flush shadow-sm mb-15">
                            <div className="card-header">
                                <h2 className="card-title">Slack Integration</h2>
                            </div>
                            <div className="card-body py-5 fs-6">
                                The Cali Slack bot is able to recognize natural language and interpret the user intentions to support actions such as creating and deleting events
                                and also checking the user's schedule.<br/><br/>To connect your Slack Account to the Cali Web Account, please follow these steps:<br/><br/>
                                <ul>
                                    <li>Access the Cali Bot added into the workspace.</li>
                                    <li>Tell Cali that you would like to connect your account.</li>
                                    <li>Cali will respond with a message telling you to verify on the web app if the connection was successful.</li>
                                </ul>
                            </div>
                            <div className="card-footer fs-6">
                                The video demonstrates the connection process and features of the Cali Slack bot.
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="col-md-3 h-100">

                <div className="row mb-15">
                        {/* <a className="d-block bgi-no-repeat bgi-size-cover bgi-position-center rounded position-relative min-h-175px"
                        style={{ backgroundImage: 'url(http://localhost:3000/assets/media/stock/2000x800/1.jpg)' }}
                        data-fslightbox="lightbox-youtube"
                        href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        >
                        <img src="http://localhost:3000/assets/media/svg/misc/video-play.svg"  className="position-absolute top-50 start-50 translate-middle" alt=""/>
                        </a> */}
                    </div>
                    
                </div>
            
            </div>
        )
    }
}