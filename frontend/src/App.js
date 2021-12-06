import "./common/stylesheets/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/components/header";
import Homepage from "./pages/Homepage";
import React from "react";
import PermanentDrawerLeft from "./common/components/drawerLeft";
import DetailsPage from "./pages/Details";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import SignupPage from "./pages/Signup";

const drawerWidth = 250;

const Body = ({ drawerWidth }) => {
  return (
    <div
      className="body"
      style={{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      }}
    >
      <Header></Header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/details" exact element={<DetailsPage />}></Route>
          <Route path="/login" exact element={<LoginPage />}></Route>
          <Route path="/register" exact element={<SignupPage />}></Route>
          <Route path="/profile" exact element={<ProfilePage />}></Route>
          <Route path="/search" exact element={<SearchPage />}></Route>
          <Route path="/*" element={<Homepage />}></Route>
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <PermanentDrawerLeft drawerWidth={drawerWidth} />
      <Body drawerWidth={drawerWidth} />
    </Router>
  );
}

export default App;
