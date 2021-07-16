import React from 'react';

const TextArea = (props) => {
    return (
        <div>
            <textarea className="form-control form-control-user bg-white"
                name={props.name}
                placeholder={props.placeholder}
                defaultValue={props.value && props.value}
                onChange={props.handleChange}
                disabled={props.disabled ? true : false}
                required
            />
        </div>
    );
}

export default TextArea;