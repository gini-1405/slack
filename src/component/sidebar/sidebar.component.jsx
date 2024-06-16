import React from "react";
import { Menu } from "semantic-ui-react";
// function based component
import "./SideBar.css";
import UserInfo from "./UserInfo/UserInfo.componenet";
import Channels from "./Channels/Channels.component";
import PrivateChat from "./PrivateChat/PrivateChat.component";
import FavouriteChannels from "./FavouriteChannels/FavouriteChannels.component";
export const SideBar = () => {
  return (
    <Menu vertical fixed="left" borderless size="large" className="side-bar">
      <UserInfo />
      <FavouriteChannels />
      <Channels />
      <PrivateChat />
    </Menu>
  );
};
