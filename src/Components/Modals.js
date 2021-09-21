import React from 'react';
import { Modal, Button, ModalTitle, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ReactDatePicker from 'react-datepicker';

export class ConfirmModal extends React.Component {
    render() {
        return (
            <>
            <Modal show={this.props.showConfirmModal} onHide={this.props.hideConfirmModal}>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Are you sure you want to cancel this event?</h4>
                        </div>
                    </div>
                </ModalBody>
            
                <ModalFooter>
                    <Button variant="light-danger" onClick={this.props.processCancel}>
                        Yes
                    </Button>
                    <Button variant="light-dark" onClick={this.props.hideConfirmModal}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}


export class LoginModal extends React.Component {
    render() {
        return (
            <>
            <Modal show={this.props.showLoginModal} onHide={this.props.hideLoginModal}>
                <ModalBody>
                    <Form className="mx-auto my-auto">
                    
                        <Form.Group className="mb-3 text-center">
                            <h1>Log in</h1>
                        </Form.Group>
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control value={this.props.username} type="text" placeholder="Enter Username" onChange={(event) => this.props.setUsername(event.target.value)}/>
                        </Form.Group>
                    
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control value={this.props.password} type="password" placeholder="Enter Password" onChange={(event) => this.props.setPassword(event.target.value)}/>
                        </Form.Group>
                    
                        <div className="text-start m-0">
                            <p className="m-0">
                                <a className="link-info" href="./account/register">
                                    Create an Account
                                </a>
                            </p>
                        </div>

                    </Form>
                
                </ModalBody>
            
                <ModalFooter>
                    <Button variant="light-success" onClick={this.props.handleLogin}>
                        Log In
                    </Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}


export class EventModal extends React.Component {
    render() {
        return (
            <>
            <Modal show={this.props.showEventModal} onHide={this.props.hideEventModal}>
                <ModalHeader>
                    <ModalTitle>{this.props.selectedEvent.title}</ModalTitle>
                    <Button variant="close" onClick={this.props.hideEventModal}></Button>
                </ModalHeader>

                <ModalBody>
                    <div className="row">
                        <div className="col-md-4">
                            Start:
                        </div>
                        <div className="col-md-8">
                            {new Date(this.props.selectedEvent.start).toLocaleString()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            End:
                        </div>
                        <div className="col-md-8">
                            {new Date(this.props.selectedEvent.end).toLocaleString()}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button variant="light-danger" onClick={this.props.showConfirmModal}>
                        Cancel Event
                    </Button>
                </ModalFooter>

            </Modal>
            </>
        )
    }
}


export class AddModal extends React.Component {
    render() {
        return (
            <>
            <Modal show={this.props.showAddModal} onHide={this.props.hideAddModal}>
                <ModalHeader>
                    <ModalTitle className="mx-auto">Add a New Event</ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <form className="form">
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="title">Title: </label>
                                <input type="text" className="form form-control" name="title" 
                                    onChange={(event) => 
                                        this.props.setNewEvent({ 
                                            title: event.target.value,
                                            start: this.props.newEvent.start,
                                            end: this.props.newEvent.end
                                        })
                                    }
                                />
                            </div>
                        </div>
                
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="startDate">Start: </label>
                                <ReactDatePicker 
                                    className= "form form-control" 
                                    selected= {this.props.newEvent.start}
                                    showTimeSelect
                                    dateFormat= "Pp"
                                    timeIntervals= {15}
                                    onChange={(date) => (
                                        this.props.setNewEvent({
                                            title: this.props.newEvent.title,
                                            start: date,
                                            end: this.props.newEvent.end
                                        })
                                    )}
                                />
                            </div>
                        </div>
                    
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="endDate">End: </label>
                                <ReactDatePicker 
                                    className= "form form-control" 
                                    selected = {this.props.newEvent.end}
                                    showTimeSelect
                                    dateFormat= "Pp"
                                    timeIntervals= {15}
                                    onChange={(date) => (
                                        this.props.setNewEvent({
                                            title: this.props.newEvent.title,
                                            start: this.props.newEvent.start,
                                            end: date
                                        })
                                    )}
                                />
                            </div>
                        </div>
                        
                        </form>
                    </ModalBody>
                
                    <ModalFooter>
                        <Button variant="light-success" onClick={this.props.processAdd}>
                            Add Event
                        </Button>
                        <Button variant="light-danger" onClick={this.props.hideAddModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}