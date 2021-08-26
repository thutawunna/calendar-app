import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class Calendar extends React.Component {

    calendarRef = React.createRef()

    constructor() {
        super();
        this.state = {
            events: []
        };
    }

    componentDidMount = async () => {

        const fetchEvents = async () => {
            const response = await fetch('/api/events/get?username=userone');
            const events = await response.json();
            return events.events;
        };

        const events = await fetchEvents();

        this.setState({ events: events });
        
        this.handleEventClick = this.handleEventClick.bind(this);

    }

    render() {
        return (
            <>
            <div style={{height: "100vh", padding: "2rem"}}>
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
                />
            </div>
            </>
        );
    }

    handleEventClick = (arg) => {
        window.alert(arg.event.start + " " + arg.event.end);
    }

    getEvents = () => {
        let calendarApi = this.calendarRef.current.getApi();
        console.log(calendarApi.addEvent({
            title: "Added Event",
            start: "2021-08-24T08:00:00",
            end: "2021-08-24T08:45:00"
        }));
    }
}