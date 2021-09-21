import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import Footer from './Footer';
import { LoginModal, EventModal, ConfirmModal, AddModal } from './Modals';

export default class Calendar extends React.Component {
    
    calendarRef = React.createRef()
    
    constructor() {
        super();
        this.state = {
            events: [],
            showEventModal: false,
            selectedEvent: {},
            selectedEvent_fullCalendarObject: {},
            showConfirmModal: false,
            showAddModal: false,
            showLoginModal: false,
            newEvent: {
                title: '',
                start: '',
                end: '',
            },
            isAuthenticated: Cookies.get('cali-app-authenticated') || false,
            rightToolbarButtonSetup: '',
            timezoneOffset: new Date().getTimezoneOffset() / 60,
            username: '',
            password: '',
        };
        
        
    }
    
    componentDidMount = async () => {
        
        let events;
        
        if (this.state.isAuthenticated) {
            this.setState({
                rightToolbarButtonSetup: 'prev,next today addEventButton logoutButton'
            });
        } else {
            if (Cookies.get('cali-app-refresh-exists')) {
                
                await fetch('/token', {
                    method: 'post',
                    credentials: 'include',
                });
                
                let isAuthenticated = Cookies.get('cali-app-authenticated');
                if (isAuthenticated) {
                    this.setState({
                        isAuthenticated: isAuthenticated,
                        rightToolbarButtonSetup: 'prev,next today addEventButton logoutButton'
                    });
                } else {
                    this.setState({
                        rightToolbarButtonSetup: 'prev,next today addEventButton loginButton'
                    });
                }
            } else {
                this.setState({
                    rightToolbarButtonSetup: 'prev,next today addEventButton loginButton'
                });
            }
        }
        
        if (this.state.isAuthenticated) {
            events = await this.fetchEvents();
        } else {
            events = [];
        }
        
        this.setState({ events: events });
        
        // this.fetchEvents = this.fetchEvents.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.showEventModal = this.showEventModal.bind(this);
        this.hideEventModal = this.hideEventModal.bind(this);
        this.showConfirmModal = this.showConfirmModal.bind(this);
        this.hideConfirmModal = this.hideConfirmModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
        
        this.processAdd = this.processAdd.bind(this);
        this.processCancel = this.processCancel.bind(this);
        
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        this.showLoginModal = this.showLoginModal.bind(this);
        this.hideLoginModal = this.hideLoginModal.bind(this);
    }
    
    fetchEvents = async () => {
        const response = await fetch('/api/events/get', {
            method: 'get',
            credentials: 'include'
        });
        const events = await response.json();
        return events.events;
    };
    
    showEventModal = () => {
        this.setState({ showEventModal: true });
    }
    
    hideEventModal = () => {
        this.setState({ showEventModal: false });
    }
    
    showConfirmModal = () => {
        this.hideEventModal();
        this.setState({ showConfirmModal: true });
    }
    
    hideConfirmModal = () => {
        this.setState({ showConfirmModal: false});
        this.showEventModal();
    }
    
    showAddModal = () => {
        this.setState({ 
            newEvent: {
                title: '',
                start: '',
                end: '',
            },
            showAddModal: true 
        });
    }
    
    hideAddModal = () => {
        this.setState({ showAddModal: false});
    }
    
    showLoginModal = () => {
        this.setState({ showLoginModal: true });
    }
    
    hideLoginModal = () => {
        this.setState({ showLoginModal: false });
    }
    
    handleEventClick = (arg) => {
        this.showEventModal();
        
        this.setState({ 
            selectedEvent: {
                title: arg.event.title,
                start: arg.event.start,
                end: arg.event.end
            },
        });
        
    }
    
    addEvent = () => {
        this.showAddModal();
    }
    
    handleLogin = async () => {
        await fetch('/account/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });
        
        this.setState({
            password: ''
        });
        
        if (Cookies.get('cali-app-authenticated')) {
            const updatedEvents = await this.fetchEvents();
            
            this.setState({
                events: updatedEvents,
                isAuthenticated: Cookies.get('cali-app-authenticated'),
                showLoginModal: false,
                rightToolbarButtonSetup: 'prev,next today addEventButton logoutButton',
            });
            
        } else {
            alert('Failed to log in');
        }
    }
    
    handleLogout = async () => {
        await fetch('/account/logout', {
            method: 'post',
            credentials: 'include',
        });
        
        this.setState({
            events: [],
            isAuthenticated: false,
            rightToolbarButtonSetup: 'prev,next today addEventButton loginButton'
        });
        
        
    }
    
    processAdd = async () => {
        
        if (this.state.newEvent.title !== '') {
            
            await fetch('/api/events/add/', {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify({
                    username: this.state.username,
                    newEvent: this.state.newEvent
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const updatedEvents = await this.fetchEvents();
            
            this.setState({ 
                events: updatedEvents,
                showAddModal: false,
            });
        } else {
            window.alert("Event must have a title");
        }
        
    }
    
    processCancel = async () => {
        await fetch('/api/events/cancel/', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({
                username: this.state.username,
                eventToDelete: this.state.selectedEvent
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const updatedEvents = await this.fetchEvents();
        
        this.setState({ 
            events: updatedEvents,
            showConfirmModal: false,
        });
    }

    setUsername = (inputValue) => {
        this.setState({
            username: inputValue
        });
    }

    setPassword = (inputValue) => {
        this.setState({
            password: inputValue
        });
    }
    
    setNewEvent = (event) => {
        this.setState({
            newEvent: event
        });
    }
    
    render() {
        return (
            <>
            <div className="card card-page">
                <div className="card-body ">
                    <div className="card card-xxl-stretch">
                        <div id="kt_docs_fullcalendar_populated">
                            <FullCalendar 
                                aspectRatio={1.8}
                                eventClassNames=""
                                plugins={ [dayGridPlugin, bootstrapPlugin] } 
                                events={ this.state.events } 
                                contentHeight="auto"
                                eventClick = { this.handleEventClick }
                                ref = { this.calendarRef }
                                dayMaxEvents= {3}
                                fixedWeekCount= {false}
                                eventTimeFormat= {
                                    {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        meridiem: 'short',
                                        omitZeroMinute: false,
                                    }
                                }
                                customButtons= {
                                    {
                                        addEventButton: {
                                            text: 'Add Event',
                                            click: this.addEvent
                                        },
                                        logoutButton: {
                                            text: 'Log out',
                                            click: this.handleLogout
                                        },
                                        loginButton: {
                                            text: 'Log in',
                                            click: this.showLoginModal
                                        }
                                    }
                                }
                                headerToolbar= {
                                    {
                                        right: `${this.state.rightToolbarButtonSetup}`
                                    }
                                }
                            />
                        </div>
                    </div>

                    <EventModal 
                        showEventModal={this.state.showEventModal} 
                        hideEventModal={this.hideEventModal} 
                        selectedEvent={this.state.selectedEvent} 
                        showConfirmModal={this.showConfirmModal}
                    />

                    <ConfirmModal
                        showConfirmModal={this.state.showConfirmModal}
                        hideConfirmModal={this.hideConfirmModal}
                        processCancel={this.processCancel}
                    />

                    <LoginModal
                        showLoginModal={this.state.showLoginModal}
                        hideLoginModal={this.hideLoginModal}
                        username={this.state.username}
                        setUsername={this.setUsername}
                        password={this.state.password}
                        setPassword={this.setPassword}
                        handleLogin={this.handleLogin}
                    />

                    <AddModal
                        showAddModal={this.state.showAddModal}
                        hideAddModal={this.hideAddModal}
                        setNewEvent={this.setNewEvent}
                        newEvent={this.state.newEvent}
                        processAdd={this.processAdd}
                        hideAddModal={this.hideAddModal}
                    />
                </div>
            </div>

            <Footer/>
            </>
        );
    }
}