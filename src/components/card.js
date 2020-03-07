import React from 'react'

export default (props) => (
    <div className="card">
        <div className="card-header">
            <p>{props.header}</p>
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
)