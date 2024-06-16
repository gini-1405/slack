/*
import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [messageState, setMessageState] = useState("");
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: messageState,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (messageState || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("sent");
          setMessageState(""); // Clear the input field after sending
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onMessageChange = (event) => {
    const target = event.target;
    setMessageState(target.value);
  };

  const createActionButtons = () => {
    return (
      <>
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("problem");
          }}
        />
      </>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.log("Error uploading file:", err);
      });
  };

  return (
    <Segment>
      <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label={createActionButtons()}
        labelPosition="right"
      />
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/

/*
import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <>
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment>
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {createActionButtons()}
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/
/*
import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
import "./MessageInput.css";

const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: contentHTML,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </div>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment className="message-input">
      <div className="input-container">
        <div className="editor-wrapper">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            className="rich-text-editor"
          />
        </div>
        {createActionButtons()}
      </div>
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/
/*
import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
import "./MessageInput.css";

const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: contentHTML,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </div>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment className="message-input">
      <div className="input-container">
        <div className="editor-wrapper">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            className="rich-text-editor"
          />
        </div>
        {createActionButtons()}
      </div>
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/
/*
import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
import "./MessageInput.css";

const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: contentHTML,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </div>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment className="message-input">
      <div className="input-container">
        <div className="editor-wrapper">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            className="rich-text-editor"
          />
        </div>
        {createActionButtons()}
      </div>
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/

/*
import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
import "./MessageInput.css";

const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: contentHTML,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </div>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment className="message-input">
      <div className="input-container">
        <div className="editor-wrapper">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            className="rich-text-editor"
          />
        </div>
        {createActionButtons()}
      </div>
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
*/

import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "./RichTextEditor.component";
import "./MessageInput.css";

const MessageInput = (props) => {
  const messageref = firebase.database().ref("messages");
  const storageref = firebase.storage().ref();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileDialogueState, setfileDialogueState] = useState(false);

  const createMessageinfo = (downloadURL) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: contentHTML,
      image: downloadURL || "",
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const onSubmit = (downloadURL) => {
    if (!props.channel || !props.channel.id) {
      console.error("Channel ID is invalid");
      return;
    }

    if (editorState.getCurrentContent().hasText() || downloadURL) {
      messageref
        .child(props.channel.id)
        .push()
        .set(createMessageinfo(downloadURL))
        .then(() => {
          console.log("Message sent");
          setEditorState(EditorState.createEmpty()); // Clear the input field after sending
        })
        .catch((err) => {
          console.error("Error sending message: ", err);
        });
    }
  };

  const createActionButtons = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="send"
          onClick={() => {
            onSubmit();
          }}
        />
        <Button
          icon="upload"
          onClick={() => {
            setfileDialogueState(true);
            console.log("Opening file dialog");
          }}
        />
      </div>
    );
  };

  const uploadImage = (file, contentType) => {
    const filepath = `chat/images/${uuidv4()}.jpg`;
    storageref
      .child(filepath)
      .put(file, { contentType: contentType })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSubmit(downloadURL);
        });
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <Segment className="message-input">
      <div className="input-container">
        <div className="editor-wrapper">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            className="rich-text-editor"
          />
        </div>
        {createActionButtons()}
      </div>
      <ImageUpload
        open={fileDialogueState}
        uploadImage={uploadImage}
        onClose={() => setfileDialogueState(false)}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);
