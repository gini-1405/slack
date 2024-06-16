/*
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./component/auth/Register/Register.component";
import Login from "./component/auth/Login/Login.component";
import "semantic-ui-css/semantic.min.css";
import firebase from "firebase/compat/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store"; // Import store
import { setUser } from "./store/slices/userSlice"; // Import setUser action
import { setChannel, setLoading } from "./store/slices/channelSlice";
import { AppLoader } from "./component/AppLoader/AppLoader.component";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loda = useSelector((state) => state.channel.loading);
  useEffect(() => {
    dispatch(setLoading(true)); // Start loading
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated
        dispatch(setUser(user)); // Dispatch setUser action to update currentUser

        navigate("/");
      } else {
        // User is not authenticated
        dispatch(setUser(null)); // Dispatch setUser action to clear currentUser

        navigate("/login");
      }
      dispatch(setLoading(false)); // Stop loading
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <AppLoader loading={loda} />
      {!loda && (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />} />
        </Routes>
      )}
    </>
    // <>
    //   <AppLoader loading={loading} />
    //   {!loading && (
    //     <Routes>
    //       <Route path="/register" element={<Register />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/" element={<App />} />
    //     </Routes>
    //   )}
    // </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Index />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
*/

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./component/auth/Register/Register.component";
import Login from "./component/auth/Login/Login.component";
import "semantic-ui-css/semantic.min.css";
import firebase from "firebase/compat/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store"; // Import store
import { AppLoader } from "./component/AppLoader/AppLoader.component";
import { setUser } from "./store/slices/userSlice"; // Import setUser action
import { setChannel, setLoading } from "./store/slices/channelSlice"; // Import setChannel and setLoading actions

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.channel.loading);

  useEffect(() => {
    dispatch(setLoading(true)); // Set loading to true initially

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated
        dispatch(setUser(user)); // Dispatch setUser action to update currentUser
        fetchChannelData();
        navigate("/");
      } else {
        // User is not authenticated
        dispatch(setUser(null)); // Dispatch setUser action to clear currentUser
        dispatch(setChannel([])); // Clear currentChannel and set loading to false
        navigate("/login");
      }
    });
    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const fetchChannelData = async () => {
    // Simulate an async operation to fetch channel data
    const channelData = await new Promise((resolve) =>
      setTimeout(() => resolve([{ id: "1", name: "General" }]), 1000)
    );
    dispatch(setChannel(channelData)); // Dispatch setChannel with fetched data, setting loading to false
  };

  return (
    <>
      <AppLoader loading={loading} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Index />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
