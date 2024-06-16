import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { setChannel } from "../../../store/slices/channelSlice";
import { Notification } from "../Notification/Notification.component";
// Update the path according to your structure

const PrivateChat = () => {
  const [usersState, setUsersState] = useState([]);
  const [connectedUserstate, setconnectedUserstate] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.currentUser);
  // Ensure user is properly selected
  const currentChannel = useSelector((state) => state.channel?.currentChannel);
  // Ensure channel is properly selected
  const usersRef = firebase.database().ref("users");
  const connectedRef = firebase.database().ref(".info/connected");
  const statusRef = firebase.database().ref("status");

  useEffect(() => {
    const handleChildAdded = (snap) => {
      setUsersState((currentState) => {
        let updatedState = [...currentState];

        let user = snap.val();
        user.name = user.displayName;
        user.id = snap.key;
        user.isPrivateChat = true;

        updatedState.push(user);

        return updatedState;
      });
    };

    usersRef.on("child_added", handleChildAdded);

    connectedRef.on("value", (snap) => {
      if (currentUser && snap.val()) {
        const userStatusRef = statusRef.child(currentUser.uid);
        userStatusRef.set(true);
        userStatusRef.onDisconnect().remove();
      }
    });

    return () => {
      usersRef.off();
      connectedRef.off();
    };
    // Clean up the listener on component unmount
  }, [currentUser]);

  useEffect(() => {
    statusRef.on("child_added", (snap) => {
      setconnectedUserstate((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.key);
        return updatedState;
      });
    });
    statusRef.on("child_removed", (snap) => {
      setconnectedUserstate((currentState) => {
        let updatedState = [...currentState];
        let index = updatedState.indexOf(snap.key);
        updatedState.splice(index, 1);
        return updatedState;
      });
    });
    return () => {
      statusRef.off();
    };
  }, usersState);

  const displayUsers = () => {
    if (usersState.length > 0 && currentUser) {
      return (
        usersState
          .filter((user) => user.id !== currentUser.uid)
          // Corrected filter function
          .map((user) => (
            <Menu.Item
              key={user.id}
              name={user.name}
              onClick={() => {
                selectuser(user);
              }}
              active={
                currentChannel &&
                currentChannel.id === generatedChannelId(user.id)
              }
            >
              <Icon
                name="circle"
                color={`${
                  connectedUserstate.indexOf(user.id) !== -1 ? "green" : "red"
                }`}
              />
              <Notification
                user={currentUser}
                channel={currentChannel}
                notificationChannelId={generatedChannelId(user.id)}
                displayName={"@" + user.name}
              />
            </Menu.Item>
          ))
      );
    }
  };
  const selectuser = (user) => {
    // let usertemp = { ...user };
    // usertemp.id = generatedChannelId(user.id);
    // setLastVisited(currentUser, currentChannel);
    // setLastVisited(currentUser, usertemp);
    // dispatch(setChannel(usertemp));
    let userTemp = { ...user };
    userTemp.id = generatedChannelId(user.id);
    if (currentUser && currentChannel) {
      setLastVisited(currentUser, currentChannel);
    }
    setLastVisited(currentUser, userTemp);
    dispatch(setChannel(userTemp));
  };
  const setLastVisited = (user, channel) => {
    // const lastVisited = usersRef
    //   .child(user.uid)
    //   .child("lastVisited")
    //   .child(channel.id);
    // lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    // lastVisited.onDisconnect(firebase.database.ServerValue.TIMESTAMP);
    if (!channel || !channel.id) {
      console.error("Invalid channel or channel ID");
      return;
    }
    const lastVisited = usersRef
      .child(user.uid)
      .child("lastVisited")
      .child(channel.id);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  };
  const generatedChannelId = (userId) => {
    if (currentUser.uid < userId) {
      return currentUser.uid + userId;
    } else {
      return userId + currentUser.uid;
    }
  };
  return (
    <Menu.Menu style={{ marginTop: "35px" }}>
      <Menu.Item style={{ fontSize: "17px" }}>
        <span>
          <Icon name="mail" /> Chat
        </span>
        ({usersState.length - 1})
      </Menu.Item>
      {displayUsers()}
    </Menu.Menu>
  );
};
export default PrivateChat;
