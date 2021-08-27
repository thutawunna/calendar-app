import React from 'react';
import { Modal, Button, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
            newEvent: {
                title: '',
                start: '',
                end: '',
            },
            timezoneOffset: new Date().getTimezoneOffset() / 60
        };
    }

    componentDidMount = async () => {

        const events = await this.fetchEvents();

        this.setState({ events: events });
        
        this.fetchEvents = this.fetchEvents.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.showEventModal = this.showEventModal.bind(this);
        this.hideEventModal = this.hideEventModal.bind(this);
        this.showConfirmModal = this.showConfirmModal.bind(this);
        this.hideConfirmModal = this.hideConfirmModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);

        this.processAdd = this.processAdd.bind(this);
        this.processCancel = this.processCancel.bind(this);

    }

    fetchEvents = async () => {
        const response = await fetch('/api/events/get?username=userone');
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

    processAdd = async () => {

        if (this.state.newEvent.title !== '') {
            await fetch('/api/events/add/', {
                method: 'post',
                body: JSON.stringify({
                    username: 'userone',
                    newEvent: this.state.newEvent
                }),
                headers: {
                    'Content-Type': 'application/json',
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
            body: JSON.stringify({
                username: 'userone',
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

    render() {
        return (
            <>
            <div style={ { height: "80vh" } }>
                <FullCalendar 
                    plugins={ [dayGridPlugin, bootstrapPlugin] } 
                    events={ this.state.events } 
                    height= "100%"
                    eventClick = { this.handleEventClick }
                    ref = { this.calendarRef }
                    dayMaxEvents= {4}
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
                            }
                        }
                    }
                    headerToolbar= {
                        {
                            right: 'prev,next today addEventButton'
                        }
                    }
                />
            </div>

            <Modal show={this.state.showEventModal} onHide={this.hideEventModal}>
                <ModalHeader>
                    <ModalTitle>{this.state.selectedEvent.title}</ModalTitle>
                    <Button variant="close" onClick={this.hideEventModal}></Button>
                </ModalHeader>

                <ModalBody>
                    <div className="row">
                        <div className="col-md-4">
                            Start:
                        </div>
                        <div className="col-md-8">
                            {new Date(this.state.selectedEvent.start).toLocaleString()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            End:
                        </div>
                        <div className="col-md-8">
                            {new Date(this.state.selectedEvent.end).toLocaleString()}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button variant="danger" onClick={this.showConfirmModal}>
                        Cancel Event
                    </Button>
                </ModalFooter>

            </Modal>

            <Modal show={this.state.showConfirmModal} onHide={this.hideConfirmModal}>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Are you sure you want to cancel this event?</h4>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button variant="danger" onClick={this.processCancel}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={this.hideConfirmModal}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal show={this.state.showAddModal} onHide={this.hideAddModal}>
                <ModalBody>
                    <form className="form">

                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="title">Title: </label>
                                <input type="text" className="form form-control" name="title" 
                                    onChange={(event) => this.setState({ 
                                        newEvent: {
                                            title: event.target.value,
                                            start: this.state.newEvent.start,
                                            end: this.state.newEvent.end
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="startDate">Start: </label>
                                {/* <input type="text" className="form form-control" name="startDate"/> */}
                                <ReactDatePicker 
                                    className= "form form-control" 
                                    selected= {this.state.newEvent.start}
                                    showTimeSelect
                                    dateFormat= "Pp"
                                    timeIntervals= {15}
                                    onChange={(date) => (
                                        this.setState({
                                            newEvent: {
                                                title: this.state.newEvent.title,
                                                start: date,
                                                end: this.state.newEvent.end
                                            }
                                        })
                                    )}
                                />
                            </div>
                        </div>
                        
                        <div className="row mt-2">
                        <div className="col-md-12">
                                <label className="form-label" htmlFor="startDate">End: </label>
                                {/* <input type="text" className="form form-control" name="startDate"/> */}
                                <ReactDatePicker 
                                    className= "form form-control" 
                                    selected = {this.state.newEvent.end}
                                    showTimeSelect
                                    dateFormat= "Pp"
                                    timeIntervals= {15}
                                    onChange={(date) => (
                                        this.setState({
                                            newEvent: {
                                                title: this.state.newEvent.title,
                                                start: this.state.newEvent.start,
                                                end: date
                                            }
                                        })
                                    )}
                                />
                            </div>
                        </div>

                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button variant="success" onClick={this.processAdd}>
                        Add Event
                    </Button>
                    <Button variant="secondary" onClick={this.hideAddModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>



            </>
        );
    }

    // getEvents = () => {
    //     let calendarApi = this.calendarRef.current.getApi();
    //     console.log(calendarApi.addEvent({
    //         title: "Added Event",
    //         start: "2021-08-24T08:00:00",
    //         end: "2021-08-24T08:45:00"
    //     }));
    // }
}