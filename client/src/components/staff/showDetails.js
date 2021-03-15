import React from 'react'

const showDetails = props => {

    return (
        <div>
            <label className="form-label text-primary">{props.name} : <span className="text-secondary">{props.value} </span></label>
        </div>
    )
}

export default showDetails