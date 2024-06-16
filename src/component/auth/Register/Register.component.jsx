// import React, { useState } from "react";
// import {
//   Grid,
//   Form,
//   Segment,
//   Header,
//   Icon,
//   Checkbox,
//   Button,
//   Message,
// } from "semantic-ui-react";
// const Register = () => {
//   let user = {
//     userName: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   };
//   let errors = [];
//   const [userState, setuserState] = useState(user);
//   const [errorState, seterrorState] = useState(errors);
//   const handleInput = (event) => {
//     let target = event.target;
//     setuserState((currentState) => {
//       let currentUser = { ...currentState };
//       currentUser[target.name] = target.value;
//       return currentUser;
//     });
//   };
//   const checkForm = () => {
//     if (isFormEmpty()) {
//       seterrorState((error) => {
//         error.concat({ message: "please fill in all fields" });
//       });
//       return false;
//     } else if (!checkpassword()) {
//       seterrorState((error) => {
//         error.concat({ message: "Given password is not valid" });
//       });
//       return false;
//     }
//     return true;
//   };
//   const checkpassword = () => {
//     if (userState.password.length < 8) {
//       return false;
//     } else if (userState.password !== userState.confirmpassword) {
//       return false;
//     }
//     return true;
//   };
//   const isFormEmpty = () => {
//     return (
//       !userState.userName.length ||
//       !userState.password.length ||
//       !userState.confirmpassword.length ||
//       !userState.email.length
//     );
//   };
//   const formaterrors = () => {
//     return errorState.map((error, index) => (
//       <p key={index}> {error.message} </p>
//     ));
//   };
//   const onSubmit = (event) => {
//     seterrorState(() => []);
//     if (checkForm()) {
//     }
//   };
//   return (
//     <Grid verticalAlign="middle" textAlign="center">
//       <Grid.Column style={{ maxWidth: "500px" }}>
//         <Header icon as="h2">
//           <Icon name="slack" />
//           Register
//         </Header>
//         <Form onSubmit={onSubmit}>
//           <Segment stacked>
//             <Form.Input
//               name="user name"
//               value={userState.userName}
//               icon="user"
//               iconPosition="left"
//               onChange={handleInput}
//               type="text"
//               placeholder="User Name"
//             />

//             <Form.Input
//               name="email"
//               value={userState.email}
//               icon="mail"
//               iconPosition="left"
//               onChange={handleInput}
//               type="email"
//               placeholder="User Email"
//             />

//             <Form.Input
//               name="password"
//               value={userState.password}
//               icon="lock"
//               iconPosition="left"
//               onChange={handleInput}
//               type="password"
//               placeholder="User password"
//             />

//             <Form.Input
//               name="confirmpassword"
//               value={userState.confirmpassword}
//               icon="lock"
//               iconPosition="left"
//               onChange={handleInput}
//               type="password"
//               placeholder="Confirm user password"
//             />
//           </Segment>
//           <Button>Submit</Button>
//         </Form>
//         {errorState.length > 0 && (
//           <Message error>
//             <h3>Errors</h3>
//             {formaterrors()}
//           </Message>
//         )}
//       </Grid.Column>
//     </Grid>
//   );
// };
// export default Register;
/*
import React, { useState } from "react";
import "./Register.css";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";
import { auth, db, analytics } from "../../../server/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState([]);

  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((prevErrors) => [
        ...prevErrors,
        { message: "Please fill in all fields" },
      ]);
      return false;
    } else if (!checkPassword()) {
      // setErrorState((prevErrors) => [
      //   ...prevErrors,
      //   { message: "Given password is not valid" },
      // ]);
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      setErrorState((prevErrors) =>
        prevErrors.concat({
          message: "password should be atleast 8 length long !!",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      // setErrorState((prevErrors) =>{ 
      return [
      //   ...prevErrors,
      //   { message: "password does not match !" },
      // ]});
      // multiple ways to do the same things ...
      setErrorState((prevErrors) =>
        prevErrors.concat({ message: "password does not match !" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorState([]);
    if (checkForm()) {
      // Add your form submission logic here
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />

            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User password"
            />

            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm user password"
            />
          </Segment>
          <Button>Submit</Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>
              Errors
              {formatErrors()}
            </h3>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};
export default Register;
*/
/*
import React, { useState } from "react";
import "../Auth.css";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";

const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  let userCollectionRef = firebase.database().ref("users");
  const [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((prevErrors) => [
        ...prevErrors,
        { message: "Please fill in all fields" },
      ]);
      return false;
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      setErrorState((prevErrors) =>
        prevErrors.concat({
          message: "Password should be at least 8 characters long",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      setErrorState((prevErrors) =>
        prevErrors.concat({ message: "Passwords do not match!" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (event) => {
    setIsSuccess(false);
    event.preventDefault();
    setErrorState([]);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          setIsLoading(false);
          updateUserDetails(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((error) => {
            return [...error, serverError];
          });
        });
    }
  };

  const updateUserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      createdUser.user
        .updateProfile({
          // giving an object ->
          displayName: userState.userName,
          photoURL: `https://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createdUser);
        })
        .catch((servererror) => {
          setIsLoading(false);
          setErrorState((error) => {
            return [...error, servererror];
          });
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((servererror) => {
        setIsLoading(false);
        setErrorState((error) => {
          return [...error, servererror];
        });
      });
  };
  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm User Password"
            />
          </Segment>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
        {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already User ? <Link to="/login"> Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
*/
import React, { useState } from "react";
import "../Auth.css";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";
import { auth, db } from "../../../server/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((prevErrors) => [
        ...prevErrors,
        { message: "Please fill in all fields" },
      ]);
      return false;
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      setErrorState((prevErrors) =>
        prevErrors.concat({
          message: "Password should be at least 8 characters long",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      setErrorState((prevErrors) =>
        prevErrors.concat({ message: "Passwords do not match!" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (event) => {
    setIsSuccess(false);
    event.preventDefault();
    setErrorState([]);
    if (checkForm()) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, userState.email, userState.password)
        .then((createdUser) => {
          setIsLoading(false);
          updateUserDetails(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((error) => {
            return [...error, serverError];
          });
        });
    }
  };

  const updateUserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      updateProfile(createdUser.user, {
        displayName: userState.userName,
        photoURL: `https://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
      })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          setErrorState((error) => {
            return [...error, serverError];
          });
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    setDoc(doc(db, "users", createdUser.user.uid), {
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL,
    })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((serverError) => {
        setIsLoading(false);
        setErrorState((error) => {
          return [...error, serverError];
        });
      });
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm User Password"
            />
          </Segment>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
        {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already User? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
