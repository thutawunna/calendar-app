import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <>
            <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
                <div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between px-0">

                    <div className="text-dark order-2 order-md-1">
                    </div>

                    <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
                        <li className="menu-item">
                            <a href="/about" className="menu-link px-0">About This Project</a>
                        </li>
                    </ul>
                </div>
            </div>
            </>
        )
    }
}