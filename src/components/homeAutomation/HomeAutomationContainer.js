import React from 'react';
import {Route, Link, NavLink, Redirect} from 'react-router-dom';

import HeaderContainer from '../header/HeaderContainer';
import HomeAutomation from './HomeAutomation';
import HomeSection from '../homeSection/HomeSection';
import homeStoreWithSubscription from '../../withSubscriptions/homeStoreWithSubscription.jsx';
import Loading from '../loading/Loading.js';
import PanelBlock from '../panelBlock/PanelBlock.js';
import PanelControls from '../panelControls/PanelControls.js';
import PanelDetails from '../panelDetails/PanelDetails.js';
import PanelItem from '../panelItem/PanelItem.js';
import PanelNav from '../panelNav/PanelNav.js';


import httpHelper from '../../utils/httpHelper';
import serverActions from '../../actions/serverActions';

const propTypes =  {
};
const defaultProps = {
};

const HomeAutomationContainer = ({homeStoreState, match}) => {
  const { isLoading, homes } = homeStoreState;

  if (isLoading) {
    return (
      <HomeAutomation>
        <HeaderContainer />
        <HomeSection>
          <Loading />
        </HomeSection>
      </HomeAutomation>
    );
  }
  return (
    <HomeAutomation>
      <HeaderContainer />
      <HomeSection>
        <PanelNav>
          <PanelControls header="Homes" match={match}  />
          <PanelItem items={homes} match={match} />
        </PanelNav>
        <PanelDetails>
          <Route exact path="/homes" component={() => {
            return (
              <PanelBlock msg="Select a Home" />
            );
          }}/>
        </PanelDetails>
      </HomeSection>
    </HomeAutomation>
  );
};

HomeAutomationContainer.propTypes = propTypes;
HomeAutomationContainer.defaultProps = defaultProps;

export default homeStoreWithSubscription(HomeAutomationContainer);
