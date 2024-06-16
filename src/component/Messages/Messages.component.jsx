/*
import React, { useEffect, useState } from "react";

import MessageHeader from "./MessageHeader/MessageHeader.component";

import MessageInput from "./MessageInput/MessageInput.component";

import MessageContent from "./MessageContent/MessageContent.component";

import firebase from "firebase/compat/app";

import { connect } from "react-redux";

import {
  setFavouriteChannel,
  removeFavouriteChannel,
} from "../../store/slices/setfavouriteChannelSlice";

import { Segment, Comment } from "semantic-ui-react";

import "./Messages.css";

const Messages = (props) => {
  const messageRef = firebase.database().ref("messages");
  const [messageState, setMessageState] = useState([]);
  const [searchTermState, setSearchTermState] = useState("");
  const usersRef = firebase.database().ref("users");
  useEffect(() => {
    if (props.channel && props.channel.id) {
      setMessageState([]);
      console.log(`Listening to messages for channel: ${props.channel.id}`);
      messageRef.child(props.channel.id).on("child_added", (snap) => {
        setMessageState((currentState) => {
          let updatedState = [...currentState];
          updatedState.push(snap.val());
          return updatedState;
        });
      });
      return () => {
        messageRef.child(props.channel.id).off();
      };
    } else {
      console.error("Invalid channel or channel ID");
    }
  }, [props.channel]);

  useEffect(() => {
    if (props.user) {
      usersRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_added", (snap) => {});

      usersRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_removed", (snap) => {});

      return () => {
        usersRef.child(props.user.id).child("favourite").off();
      };
    }
  }, [props.user]);

  const displayMessages = () => {
    let messagesToDisplay = searchTermState
      ? filterMessageBySearchTerm()
      : messageState;
    if (messagesToDisplay.length > 0) {
      return messagesToDisplay.map((message) => {
        const isOwnMessage = props.user && message.user.id === props.user.uid;
        return (
          <MessageContent
            ownMessage={isOwnMessage}
            key={message.timestamp}
            message={message}
          />
        );
      });
    }
  };

  const uniqueUsersCount = () => {
    const uniqueUsers = messageState.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    return uniqueUsers.length;
  };

  const searchTermChange = (event) => {
    const target = event.target;
    setSearchTermState(target.value);
  };

  const filterMessageBySearchTerm = () => {
    const regex = new RegExp(searchTermState, "gi");
    const messages = messageState.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    return messages;
  };

  const starChange = () => {};

  const isStarred = () => {};

  return (
    <div className="messages">
      <MessageHeader
        isPrivateChat={props.channel?.isPrivateChat}
        channelName={props.channel?.name}
        uniqueUsers={uniqueUsersCount()}
        searchTermChange={searchTermChange}
        starChange={starChange}
        starred={false}
      />
      <Segment className="messagecontent">
        <Comment.Group>{displayMessages()}</Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    user: state.user.currentUser,
    favouriteChannels: state.favouriteChannel.favouriteChannel,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFavouriteChannel: (channel) => {
      dispatch(setFavouriteChannel(channel));
    },
    removeFavouriteChannel: (channel) => {
      dispatch(removeFavouriteChannel(channel));
    },
  };
};
export default connect(mapStateToProps, mapStateToProps)(Messages);

*/

import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageInput from "./MessageInput/MessageInput.component";
import MessageContent from "./MessageContent/MessageContent.component";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import {
  setFavouriteChannel,
  removeFavouriteChannel,
} from "../../store/slices/setfavouriteChannelSlice"; // Corrected import statement
import { Segment, Comment } from "semantic-ui-react";
import "./Messages.css";
import { useRef } from "react";

const Messages = (props) => {
  const messageRef = firebase.database().ref("messages");
  const [messageState, setMessageState] = useState([]);
  const [searchTermState, setSearchTermState] = useState("");
  const usersRef = firebase.database().ref("users");
  let divRef = useRef();
  useEffect(() => {
    if (props.channel && props.channel.id) {
      setMessageState([]);
      console.log(`Listening to messages for channel: ${props.channel.id}`);
      const channelMessagesRef = messageRef.child(props.channel.id);
      channelMessagesRef.on("child_added", (snap) => {
        setMessageState((currentState) => {
          let updatedState = [...currentState];
          updatedState.push(snap.val());
          return updatedState;
        });
      });
      return () => {
        channelMessagesRef.off();
      };
    } else {
      console.error("Invalid channel or channel ID");
    }
  }, [props.channel]);

  useEffect(() => {
    divRef.scrollIntoView({ behavior: "smooth" });
  }, [messageState]);
  useEffect(() => {
    if (props.user && props.user.uid) {
      const userFavouritesRef = usersRef
        .child(props.user.uid)
        .child("favourite");
      userFavouritesRef.on("child_added", (snap) => {
        props.setFavouriteChannel({ favouriteChannel: snap.val() });
      });
      userFavouritesRef.on("child_removed", (snap) => {
        props.removeFavouriteChannel({ favouriteChannel: snap.val() });
      });

      return () => {
        userFavouritesRef.off();
      };
    }
  }, [props.user]);

  const displayMessages = () => {
    let messagesToDisplay = searchTermState
      ? filterMessageBySearchTerm()
      : messageState;
    if (messagesToDisplay.length > 0) {
      return messagesToDisplay.map((message) => {
        const isOwnMessage = props.user && message.user.id === props.user.uid;
        return (
          <MessageContent
            imageLoaded={imageLoaded}
            ownMessage={isOwnMessage}
            key={message.timestamp}
            message={message}
          />
        );
      });
    }
  };
  const imageLoaded = () => {
    divRef.scrollIntoView({ behavior: "smooth" });
  };
  const uniqueUsersCount = () => {
    const uniqueUsers = messageState.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    return uniqueUsers.length;
  };

  const searchTermChange = (event) => {
    const target = event.target;
    setSearchTermState(target.value);
  };

  const filterMessageBySearchTerm = () => {
    const regex = new RegExp(searchTermState, "gi");
    const messages = messageState.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    return messages;
  };

  const starChange = () => {
    if (!props.user || !props.channel) return;

    const favouriteRef = usersRef
      .child(props.user.uid)
      .child("favourite")
      .child(props.channel.id);
    if (isStarred()) {
      favouriteRef.remove();
    } else {
      favouriteRef.set({
        channelId: props.channel.id,
        channelName: props.channel.name,
      });
    }
  };

  const isStarred = () => {
    return (
      props.channel &&
      Object.keys(props.favouriteChannels).includes(props.channel.id)
    );
  };

  return (
    <div className="messages">
      <MessageHeader
        isPrivateChat={props.channel?.isPrivateChat}
        channelName={props.channel?.name}
        uniqueUsers={uniqueUsersCount()}
        searchTermChange={searchTermChange}
        starChange={starChange}
        starred={isStarred()}
      />
      <Segment className="messagecontent">
        <Comment.Group>
          {displayMessages()}
          <div ref={(currentEl) => (divRef = currentEl)}></div>
        </Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel?.currentChannel || {},
    user: state.user?.currentUser || {},
    favouriteChannels: state.favouriteChannel?.favouriteChannel || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFavouriteChannel: (channel) => {
      dispatch(setFavouriteChannel(channel));
    },
    removeFavouriteChannel: (channel) => {
      dispatch(removeFavouriteChannel(channel));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
