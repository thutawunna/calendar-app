import React from 'react';

export default class TechnologyStack extends React.Component {

    constructor() {
        super();
        this.state = {
            icon: ""
        }
    }

    componentDidMount() {
        if (this.props.svgIcon) {
            this.setState({
                icon: <img src={`https://shielded-beach-58320.herokuapp.com/static/${this.props.svgIcon}`} className="w-50 align-self-center"></img>
            });
        } else if (this.props.icon) {
            this.setState({
                icon: <i className={`${this.props.icon} fs-4 text-${this.props.color}`}></i>
            });
        }
    }

    render() {
        return (
            <>
            <div className="card-body pb-0 pt-1">
                <div className="d-flex flex-stack item-border-hover px-3 py-2 ms-n4 mb-3">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-40px symbol-circle me-4">
                            <span className={`symbol-label bg-light-${this.props.color}`}>
                                {this.state.icon}
                            </span>
                        </div>
                        <div className="ps-1 mb-1">
                            <div className="fs-4 text-gray-800 fw-bolder">{this.props.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}