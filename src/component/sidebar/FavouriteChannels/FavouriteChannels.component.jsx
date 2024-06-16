import React from "react";
import { connect } from "react-redux";
import { setChannel } from "../../../store/slices/channelSlice";
import { Menu, Icon } from "semantic-ui-react";

const FavouriteChannels = (props) => {
  const displayChannels = () => {
    const favouriteChannels = props.favouriteChannels || {};

    if (Object.keys(favouriteChannels).length > 0) {
      return Object.keys(favouriteChannels).map((channelId) => {
        const channelName = favouriteChannels[channelId];

        if (!channelId || !channelName) {
          console.error("Invalid channel ID or name");
          return null;
        }

        return (
          <Menu.Item
            key={channelId}
            name={channelName}
            onClick={() =>
              props.selectChannel({
                id: channelId,
                name: channelName,
                isFavourite: true,
              })
            }
            active={
              props.channel &&
              channelId === props.channel.id &&
              props.channel.isFavourite
            }
          >
            {"# " + channelName}
          </Menu.Item>
        );
      });
    }
  };

  return (
    <Menu.Menu>
      <Menu.Item style={{ fontSize: "17px" }}>
        <span>
          <Icon name="star" /> Starred
        </span>
        ({Object.keys(props.favouriteChannels || {}).length})
      </Menu.Item>
      {displayChannels()}
    </Menu.Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    favouriteChannels: state.favouriteChannel.favouriteChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteChannels);
