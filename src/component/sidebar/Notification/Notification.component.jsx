/*
import React, { useState, useEffect, useSyncExternalStore } from "react";
import firebase from "firebase/compat/app";
import { Label } from "semantic-ui-react";
export const Notification = (props) => {
  const messagesRef = firebase.database().ref("messages");
  const usersRef = firebase.database().ref("users");
  const [channelsVisitedState, setchannelsVisitedState] = useState({});
  const [messagestimestampstate, setmessagestimestampstate] = useState({});
  useEffect(() => {
    if (props.user) {
      usersRef
        .child(props.user.uid)
        .child("lastVisited")
        .on("value", (snap) => {
          setchannelsVisitedState(snap.val());
        });
      messagesRef.on("value", (snap) => {
        let messages = snap.val();
        let messagesTimeStamp = {};
        let channelsId = Object.keys(messages);
        channelsId.forEach((channelId) => {
          let channelMessagesKeys = Object.keys(messages[channelId]);
          channelMessagesKeys.reduce((agg, item) => {
            messagesTimeStamp[channelId] = [
              ...(messagesTimeStamp[channelId] || []),
            ];
            messagesTimeStamp[channelId].push(
              messages[channelId][item].timestamp
            );
          });
        });
        setmessagestimestampstate(messagesTimeStamp);
      });
    }
  }, [props.user]);
  const calculateNotificationCount = (channelId) => {
    if (
      channelsVisitedState &&
      messagestimestampstate &&
      props.channel &&
      props.channel.id !== channelId
    ) {
      let lastVisited = channelsVisitedState[channelId];
      let channelMessagesTimeStamp = messagestimestampstate[channelId];
      if (channelMessagesTimeStamp) {
        let noticount = channelMessagesTimeStamp.filter((timestamp) => {
          !lastVisited || lastVisited < timestamp;
        }).length;
        return noticount === 0 ? null : <Label color="red">{noticount}</Label>;
      }
    }
    return null;
  };
  return;
  {
    calculateNotificationCount(props.notificationChannelId);
  }
};
*/
// import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import { Label } from "semantic-ui-react";

// const Notification = ({ user, channel }) => {
//   const messagesRef = firebase.database().ref("messages");
//   const usersRef = firebase.database().ref("users");

//   const [channelsVisitedState, setChannelsVisitedState] = useState({});
//   const [messagesTimestampState, setMessagesTimestampState] = useState({});

//   useEffect(() => {
//     if (user) {
//       usersRef
//         .child(user.uid)
//         .child("lastVisited")
//         .on("value", (snap) => {
//           setChannelsVisitedState(snap.val() || {});
//         });

//       messagesRef.on("value", (snap) => {
//         const messages = snap.val() || {};
//         const messagesTimeStamp = {};

//         Object.keys(messages).forEach((channelId) => {
//           const channelMessages = messages[channelId];
//           const timestamps = Object.keys(channelMessages).map(
//             (msgKey) => channelMessages[msgKey].timestamp
//           );
//           messagesTimeStamp[channelId] = timestamps;
//         });

//         setMessagesTimestampState(messagesTimeStamp);
//       });
//     }

//     return () => {
//       usersRef.child(user?.uid).child("lastVisited").off();
//       messagesRef.off();
//     };
//   }, [user]);

//   const calculateNotificationCount = (channelId) => {
//     if (
//       channelsVisitedState &&
//       messagesTimestampState &&
//       channel &&
//       channel.id !== channelId
//     ) {
//       const lastVisited = channelsVisitedState[channelId];
//       const channelMessagesTimestamp = messagesTimestampState[channelId];

//       if (channelMessagesTimestamp) {
//         const notificationCount = channelMessagesTimestamp.filter(
//           (timestamp) => !lastVisited || lastVisited < timestamp
//         ).length;

//         return notificationCount === 0 ? null : (
//           <Label color="red">{notificationCount}</Label>
//         );
//       }
//     }
//     return null;
//   };

//   return <>{calculateNotificationCount(channel?.id)}</>;
// };

// export default Notification;
import React, { useState, useEffect } from "react";
import { Label } from "semantic-ui-react";

import firebase from "firebase/compat/app";

export const Notification = (props) => {
  const messagesRef = firebase.database().ref("messages");

  const usersRef = firebase.database().ref("users");

  const [channelsVisitedState, setChannelsVisitedState] = useState({});

  const [messagesTimeStampState, setMessagesTimeStampState] = useState({});

  useEffect(() => {
    if (props.user) {
      usersRef
        .child(props.user.uid)
        .child("lastVisited")
        .on("value", (snap) => {
          setChannelsVisitedState(snap.val());
        });

      messagesRef.on("value", (snap) => {
        let messages = snap.val();

        let channelsId = Object.keys(messages);
        let messagesTimeStamp = {};
        channelsId.forEach((channelId) => {
          let channelMessageKeys = Object.keys(messages[channelId]);
          channelMessageKeys.reduce((agg, item) => {
            messagesTimeStamp[channelId] = [
              ...(messagesTimeStamp[channelId] || []),
            ];
            messagesTimeStamp[channelId].push(
              messages[channelId][item].timestamp
            );
          });
        });
        setMessagesTimeStampState(messagesTimeStamp);
      });
    }
  }, [props.user]);

  const calculateNotificationCount = (channelId) => {
    if (
      channelsVisitedState &&
      messagesTimeStampState &&
      props.channel &&
      props.channel.id !== channelId
    ) {
      let lastVisited = channelsVisitedState[channelId];

      let channelMessagesTimeStamp = messagesTimeStampState[channelId];

      if (channelMessagesTimeStamp) {
        let notificationCount = channelMessagesTimeStamp.filter(
          (timestamp) => !lastVisited || lastVisited < timestamp
        ).length;
        return notificationCount === 0 ? null : (
          <Label color="red">{notificationCount}</Label>
        );
      }
    }

    return null;
  };

  return (
    <>
      {" "}
      {props.displayName}
      {calculateNotificationCount(props.notificationChannelId)}{" "}
    </>
  );
};
