import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./Layout/Header";
import HootSuite from "./HootsuiteSummary/HootsuiteSummary";
import Footer from "./footer/Footer";

import { loadUser } from "../../actions/auth";

const Home = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <div>
      <Header />
      <HootSuite />
      <Footer />
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(withRouter(Home));
