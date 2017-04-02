import React from "react";
import {Route, Link, NavLink, Redirect, Switch} from "react-router-dom";
import HomeAutomation from "../homeAutomation/HomeAutomation";
import HeaderContainer from "../header/HeaderContainer";
import HomeSection from "../homeSection/HomeSection";
import PanelItem from "../panelItem/PanelItem.js";
import PanelNav from "../panelNav/PanelNav.js";
import PanelDetails from "../panelDetails/PanelDetails.js";
import PanelControls from "../panelControls/PanelControls.js";
import PanelBlock from "../panelBlock/PanelBlock.js";
import RoomDetails from "../roomDetails/RoomDetails.js";
import NewRoom from "../newRoom/NewRoom.js";
import Loading from "../loading/Loading.js";
import httpHelper from "../../utils/httpHelper.js";

const propTypes =  {
};
const defaultProps = {
};

class HomeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rooms: {}
    };
  }
  componentDidMount () {
    let homeId = this.props.match.params.homeId;
    httpHelper.getRooms(homeId)
      .then(rooms => {
        // console.log("rooms", JSON.stringify(rooms,null,2));
        this.setState({
          isLoading: false,
          rooms: rooms
        });
      })
      .catch(error => {
        console.warn("Error with getHomes", error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <HomeAutomation>
          <HeaderContainer />
          <Loading />
        </HomeAutomation>
      );
    }

    return (
      <HomeAutomation>
        <HeaderContainer />
        <HomeSection>
          <PanelNav>
            <PanelControls header="Rooms" match={this.props.match}  />
            <PanelItem items={this.state.rooms} loc={this.props.location} match={this.props.match} />;
          </PanelNav>
          <PanelDetails>
            <Switch>
              <Route path="/homes/:homeId/rooms" component={() => {
                return (
                  <PanelBlock msg="Select a Room" />
                );
              }}/>
              {/* <Route exact path="/homes/:homeId/rooms/new" component={NewRoom} /> */}
            </Switch>

            {/* <Route exact path="/homes/:homeId/rooms/:roomId" component={(props) => {
              let roomId = props.match.params.roomId;
              let room = this.state.rooms.filter(room => room._id === roomId)[0];
              return (
                <RoomDetails room={room} match={this.props.match} />
              );
            }}/> */}
          </PanelDetails>
        </HomeSection>
      </HomeAutomation>
    );
  }
}
HomeDetails.propTypes = propTypes;
HomeDetails.defaultProps = defaultProps;

export default HomeDetails;
