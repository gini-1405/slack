import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export const ImageUpload = (props) => {
  const [fileState, setFileState] = useState(null);
  const acceptedTypes = ["image/png", "image/jpeg"];
  const getMimeType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "png":
        return "image/png";
      case "jpeg":
      case "jpg":
        return "image/jpeg";
      default:
        return "";
    }
  };

  const onFileAdded = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileState(file);
    }
  };

  const onSubmit = () => {
    const mimeType = getMimeType(fileState.name);
    if (fileState && acceptedTypes.includes(mimeType)) {
      props.uploadImage(fileState, mimeType);
      props.onClose();
      setFileState(null);
    } else {
      alert("Unsupported file type. Please select a PNG or JPEG image.");
    }
  };

  return (
    <Modal basic open={props.open} onClose={props.onClose}>
      <Modal.Header>Select Image</Modal.Header>
      <Modal.Content>
        <Input
          type="file"
          name="file"
          onChange={onFileAdded}
          fluid
          label="File type (png, jpeg)"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={onSubmit}>
          <Icon name="checkmark" /> Add
        </Button>
        <Button color="red" onClick={props.onClose}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ImageUpload;
