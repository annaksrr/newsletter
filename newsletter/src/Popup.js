import React from 'react';
import Popout from 'react-popout';
import ReactDOM from "react-dom";

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default Popup;

//ReactDOM.render(<Data />, document.getElementById('root'));
