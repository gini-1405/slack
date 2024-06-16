/*
import React, { useState, useEffect } from "react";
import "./Channels.css";
import { connect } from "react-redux";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Button,
  Segment,
  CommentAvatar,
} from "semantic-ui-react";
import firebase from "firebase/compat/app";

import { setChannel } from "../../../store/actioncreater";

const Channels = (props) => {
  /************************************************************************** */
/*
  const [modalOpenState, setmodalOpenState] = useState(false);
  const [channelAddState, setchannelAddState] = useState({
    name: "",
    description: "",
  });
  const [IsLoading, setLoadingState] = useState(false);
  const [channelsState, setchannelsState] = useState([]);
  /************************************************************************** */
/*
  const channelsRef = firebase
    .database()
    .ref(
      "channels"
    ); /* this gives reference to firebase database collection know as channels */
/*
  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      setchannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
        if (updatedState.length === 1){
            props.selectChannel(updatedState[0])
        }
        return updatedState;
      });
    });
  }, []);
  /**************************************************************************** */
/*
  const openModal = () => {
    setmodalOpenState(true);
  };

  const closeModal = () => {
    setmodalOpenState(false);
  };
  /******************************************************************************* */
/*
  const checkIfFormValid = () => {
    return (
      channelAddState && channelAddState.name && channelAddState.description
    );
  };
  /********************************************************************************* */
/*
  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => {
        return (
          <Menu.Item
            key={channel.id}
            name={channel.name}
            onClick={() => {
              props.selectChannel(channel);
            }}
            active={channel.id === props.channel.id}
          ></Menu.Item>
        );
      });
    }
  };

  /*********************************************************************************** */
/*
  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }
    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: props.user.displayName,
        avatar: props.user.photoURL,
      },
    };
    setLoadingState(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setchannelAddState({
          name: "",
          description: "",
        });
        setLoadingState(true);
        closeModal();
      })
      .catch((err) => {
        setLoadingState(true);
        console.log(err);
      });
  };
  /************************************************************************** */
/*
  const handleInput = (event) => {
    let target = event.target;
    setchannelAddState((currentState) => {
      let updatedState = { ...currentState };
      updatedState[target.name] = target.value;
      return updatedState;
    });
  };
  /************************************************** */
/*
  return (
    <>
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          ({channelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item className="clickable">
          <span onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header></Modal.Header>
        Create Channel
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAddState.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={channelAddState.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={IsLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Channels);
*/
/*
import React, { useState, useEffect } from "react";
import "./Channels.css";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Segment } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { setChannel } from "../../../store/store2"; // Update the path according to your structure

const Channels = () => {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setLoadingState] = useState(false);
  const [channelsState, setChannelsState] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser); // Ensure user is properly selected
  const currentChannel = useSelector((state) => state.channel?.currentChannel); // Ensure channel is properly selected

  const channelsRef = firebase.database().ref("channels");

  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      setChannelsState((currentState) => {
        const updatedState = [...currentState, snap.val()];
        if (updatedState.length === 1) {
          dispatch(setChannel(updatedState[0]));
        }
        return updatedState;
      });
    });

    return () => channelsRef.off(); // Clean up the listener on component unmount
  }, []);

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const checkIfFormValid = () => {
    return channelAddState.name && channelAddState.description;
  };

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => (
        <Menu.Item
          key={channel.id}
          name={channel.name}
          onClick={() => dispatch(setChannel(channel))}
          active={channel.id === currentChannel?.id}
        >
          {channel.name}
        </Menu.Item>
      ));
    }
  };
  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }
    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    setLoadingState(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({
          name: "",
          description: "",
        });
        setLoadingState(false);
        closeModal();
      })
      .catch((err) => {
        setLoadingState(false);
        console.error(err);
      });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setChannelAddState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          ({channelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item className="clickable">
          <span onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAddState.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={channelAddState.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
*/
/*
import React, { useState, useEffect } from "react";
import "./Channels.css";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Segment } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { setChannel } from "../../../store/slices/channelSlice"; // Update the path according to your structure
import { Notification } from "../Notification/Notification.component";
import { disableNetwork } from "firebase/firestore";

const Channels = () => {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setLoadingState] = useState(false);
  const [channelsState, setChannelsState] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser); // Ensure user is properly selected
  const currentChannel = useSelector((state) => state.channel?.currentChannel);
  // Ensure channel is properly selected
  const channelsRef = firebase.database().ref("channels");
  const usersRef = firebase.database().ref("users");
  useEffect(() => {
    const handleChildAdded = (snap) => {
      setChannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
        return updatedState;
      });
    };

    channelsRef.on("child_added", handleChildAdded);

    return () => channelsRef.off(); // Clean up the listener on component unmount
  }, []);

  useEffect(() => {
    if (channelsState.length > 0 && !currentChannel) {
      dispatch(setChannel(channelsState[0]));
      console.log("Dispatching setChannel:", channelsState[0]);
    }
  }, [channelsState, currentChannel, dispatch]);

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const checkIfFormValid = () => {
    return channelAddState.name && channelAddState.description;
  };

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => (
        <Menu.Item
          key={channel.id}
          name={channel.name}
          // onClick={() => {
          //   dispatch(setChannel(channel));
          // }}
          onClick={() => {
            selectChannel(channel);
          }}
          active={
            currentChannel &&
            currentChannel.id === channel.id &&
            !currentChannel.isFavourite
          }
        >
          <Notification
            user={currentUser}
            channel={currentChannel}
            notificationChannelId={channel.id}
            displayName={"#" + channel.name}
          />
        </Menu.Item>
      ));
    }
  };
  const selectChannel = (channel) => {
    setLastVisited(currentUser, currentChannel);
    setLastVisited(currentUser, channel);
    dispatch(setChannel(channel));
  };
  const setLastVisited = (user, channel) => {
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
  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }
    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    setLoadingState(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({
          name: "",
          description: "",
        });
        setLoadingState(false);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInput = (e) => {
    let target = e.target;
    setChannelAddState((currentState) => {
      let updatedState = { ...currentState };
      updatedState[target.name] = target.value;
      return updatedState;
    });
  };

  return (
    <>
      <Menu.Menu style={{ marginTop: "35px" }}>
        <Menu.Item style={{ fontSize: "17px" }}>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          ({channelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item className="clickable">
          <span onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAddState.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={channelAddState.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
*/

import React, { useState, useEffect } from "react";
import "./Channels.css";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Segment } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { setChannel } from "../../../store/slices/channelSlice"; // Update the path according to your structure
import { Notification } from "../Notification/Notification.component";

const Channels = () => {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setLoadingState] = useState(false);
  const [channelsState, setChannelsState] = useState([]);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.currentUser); // Ensure user is properly selected
  const currentChannel = useSelector((state) => state.channel?.currentChannel); // Ensure channel is properly selected
  const channelsRef = firebase.database().ref("channels");
  const usersRef = firebase.database().ref("users");

  useEffect(() => {
    const handleChildAdded = (snap) => {
      setChannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
        return updatedState;
      });
    };

    channelsRef.on("child_added", handleChildAdded);

    return () => channelsRef.off(); // Clean up the listener on component unmount
  }, []);

  useEffect(() => {
    if (channelsState.length > 0 && !currentChannel) {
      dispatch(setChannel(channelsState[0]));
      console.log("Dispatching setChannel:", channelsState[0]);
    }
  }, [channelsState, currentChannel, dispatch]);

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const checkIfFormValid = () => {
    return channelAddState.name && channelAddState.description;
  };

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => (
        <Menu.Item
          key={channel.id}
          name={channel.name}
          onClick={() => {
            selectChannel(channel);
          }}
          active={
            currentChannel &&
            currentChannel.id === channel.id &&
            !currentChannel.isFavourite
          }
        >
          <Notification
            user={currentUser}
            channel={currentChannel}
            notificationChannelId={channel.id}
            displayName={"#" + channel.name}
          />
        </Menu.Item>
      ));
    }
  };

  const selectChannel = (channel) => {
    setLastVisited(currentUser, currentChannel);
    setLastVisited(currentUser, channel);
    dispatch(setChannel(channel));
  };

  const setLastVisited = (user, channel) => {
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

  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }
    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
    setLoadingState(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({
          name: "",
          description: "",
        });
        setLoadingState(false);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInput = (e) => {
    let target = e.target;
    setChannelAddState((currentState) => {
      let updatedState = { ...currentState };
      updatedState[target.name] = target.value;
      return updatedState;
    });
  };

  return (
    <>
      <Menu.Menu style={{ marginTop: "35px" }}>
        <Menu.Item style={{ fontSize: "17px" }}>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          ({channelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item className="clickable">
          <span onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>
      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAddState.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={channelAddState.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
