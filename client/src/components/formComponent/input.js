import React from 'react';

const input = (props) => {
    return (
        <div>
            <input className="form-control form-control-user bg-white"
                name={props.name}
                defaultValue={props.value}
                placeholder={props.placeholder}
                type={props.type}
                onChange={props.handleChange}
                disabled={props.disabled ? true : false}
                required
            />
        </div>
    );
}
export default input;