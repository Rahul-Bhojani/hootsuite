import React from 'react';

const input = (props) => {

    return (
        <div>
            <input className="form-control form-control-user"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                type={props.type}
                onChange={props.handleChange}
                required
            />
        </div>
    );
}

export default input;