// import React from "react";
// import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
// import "draft-js/dist/Draft.css";
// import { Button, Segment } from "semantic-ui-react";
// import "./RichTextEditor.css";

// const RichTextEditor = ({ editorState, setEditorState }) => {
//   const handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const mapKeyToEditorCommand = (e) => {
//     if (e.keyCode === 9 /* TAB */) {
//       const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
//       if (newEditorState !== editorState) {
//         setEditorState(newEditorState);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   };

//   const toggleInlineStyle = (inlineStyle) => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
//   };

//   const toggleBlockType = (blockType) => {
//     setEditorState(RichUtils.toggleBlockType(editorState, blockType));
//   };

//   return (
//     <Segment>
//       <div className="toolbar">
//         <Button icon="bold" onClick={() => toggleInlineStyle("BOLD")} />
//         <Button icon="italic" onClick={() => toggleInlineStyle("ITALIC")} />
//         <Button
//           icon="linkify"
//           onClick={() => {
//             const url = prompt("Enter the URL");
//             if (!url) return;
//             const contentState = editorState.getCurrentContent();
//             const contentStateWithEntity = contentState.createEntity(
//               "LINK",
//               "MUTABLE",
//               { url }
//             );
//             const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//             const newEditorState = EditorState.set(editorState, {
//               currentContent: contentStateWithEntity,
//             });
//             setEditorState(
//               RichUtils.toggleLink(
//                 newEditorState,
//                 newEditorState.getSelection(),
//                 entityKey
//               )
//             );
//           }}
//         />
//         <Button
//           icon="list ol"
//           onClick={() => toggleBlockType("ordered-list-item")}
//         />
//         <Button
//           icon="list ul"
//           onClick={() => toggleBlockType("unordered-list-item")}
//         />
//       </div>
//       <Editor
//         editorState={editorState}
//         handleKeyCommand={handleKeyCommand}
//         keyBindingFn={mapKeyToEditorCommand}
//         onChange={setEditorState}
//         placeholder="Type your message..."
//       />
//     </Segment>
//   );
// };

// export default RichTextEditor;
/*
import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Segment } from "semantic-ui-react";
import "./RichTextEditor.css";

const RichTextEditor = ({ editorState, setEditorState }) => {
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <Segment>
      <div className="toolbar">
        <Button icon="bold" onClick={() => toggleInlineStyle("BOLD")} />
        <Button icon="italic" onClick={() => toggleInlineStyle("ITALIC")} />
        <Button
          icon="linkify"
          onClick={() => {
            const url = prompt("Enter the URL");
            if (!url) return;
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
              "LINK",
              "MUTABLE",
              { url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
              currentContent: contentStateWithEntity,
            });
            setEditorState(
              RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
              )
            );
          }}
        />
        <Button
          icon="list ol"
          onClick={() => toggleBlockType("ordered-list-item")}
        />
        <Button
          icon="list ul"
          onClick={() => toggleBlockType("unordered-list-item")}
        />
        <Button
          icon="quote left"
          onClick={() => toggleBlockType("blockquote")}
        />
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={setEditorState}
        placeholder="Type your message..."
      />
    </Segment>
  );
};

export default RichTextEditor;
*/
/*
import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Segment } from "semantic-ui-react";
import "./RichTextEditor.css";
const RichTextEditor = ({ editorState, setEditorState }) => {
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB ) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const promptForLink = () => {
    const url = prompt("Enter the URL");
    const text = prompt("Enter the text to display");

    if (!url || !text) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    newEditorState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );

    newEditorState = EditorState.createWithContent(
      newEditorState.getCurrentContent().mergeEntityData(entityKey, {
        url,
        text,
      })
    );

    setEditorState(newEditorState);
  };

  return (
    <Segment>
      <div className="toolbar">
        <Button icon="bold" onClick={() => toggleInlineStyle("BOLD")} />
        <Button icon="italic" onClick={() => toggleInlineStyle("ITALIC")} />
        <Button icon="linkify" onClick={promptForLink} />
        <Button
          icon="list ol"
          onClick={() => toggleBlockType("ordered-list-item")}
        />
        <Button
          icon="list ul"
          onClick={() => toggleBlockType("unordered-list-item")}
        />
        <Button
          icon="quote right"
          onClick={() => toggleBlockType("blockquote")}
        />
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={setEditorState}
        placeholder="Type your message..."
      />
    </Segment>
  );
};

export default RichTextEditor;
*/

import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Segment } from "semantic-ui-react";
import "./RichTextEditor.css";

const RichTextEditor = ({ editorState, setEditorState }) => {
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const promptForLink = () => {
    const url = prompt("Enter the URL");
    const text = prompt("Enter the text to display");

    if (!url || !text) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    newEditorState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );

    newEditorState = EditorState.createWithContent(
      newEditorState.getCurrentContent().mergeEntityData(entityKey, {
        url,
        text,
      })
    );

    setEditorState(newEditorState);
  };

  return (
    <Segment>
      <div className="toolbar">
        <Button icon="bold" onClick={() => toggleInlineStyle("BOLD")} />
        <Button icon="italic" onClick={() => toggleInlineStyle("ITALIC")} />
        <Button icon="linkify" onClick={promptForLink} />
        <Button
          icon="list ol"
          onClick={() => toggleBlockType("ordered-list-item")}
        />
        <Button
          icon="list ul"
          onClick={() => toggleBlockType("unordered-list-item")}
        />
        <Button
          icon="quote right"
          onClick={() => toggleBlockType("blockquote")}
        />
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={setEditorState}
        placeholder="Type your message..."
      />
    </Segment>
  );
};

export default RichTextEditor;
