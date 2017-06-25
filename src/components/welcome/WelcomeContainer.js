import React, { Component, PropTypes }  from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import Welcome from './Welcome';
import httpHelper from '../../utils/httpHelper.js';

const propTypes =  {
  msg: PropTypes.string.isRequired
};
const defaultProps = {
  msg: 'Premium Comfort'
};

class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Welcome
        msg={this.props.msg}
      />
    );
  }
}
WelcomeContainer.propTypes = propTypes;
WelcomeContainer.defaultProps = defaultProps;

export default WelcomeContainer;
