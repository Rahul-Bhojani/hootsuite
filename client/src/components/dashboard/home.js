import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Admin from './adminDashboard';
import Hr from './hrDashboard';
import Staff from './staffDashboard';

import { loadUser } from '../../actions/auth';

const Home = ({ auth: { user }, loadUser }) => {

    useEffect(() => {
        loadUser()
    }, [loadUser])
    return (
        <div>
            { user && user.role === 1 && <Admin />}
            {user && user.role === 2 && <Hr />}
            { user && user.role === 3 && <Staff />}
        </div>
    );
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { loadUser })(withRouter(Home))


