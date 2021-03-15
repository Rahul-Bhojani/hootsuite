import React from 'react';

const TextArea = (props) => {

    return (
        <div>
            <textarea className="form-control form-control-user"
                name={props.name}

                placeholder={props.placeholder}
                value={props.value ? props.value : ''}
                onChange={props.handleChange}
                required
            />
        </div>
    );
}

export default TextArea;